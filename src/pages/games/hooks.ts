import { useMutation, useQuery } from "@tanstack/react-query";
import _reduce from "lodash/reduce";
import moment from "moment";

import {
  gameDetailsAPI,
  gamesListAPI,
  getMostPopularGames,
  getTotalGamesCount,
  updateGameAPI,
  uploadGameThumbnailAPI,
} from "@src/api/games";

import { downloadExcel } from "@src/utils/download-helper";

import {
  GameUploadImageAPIParams,
  GamesAPIParams,
  UpdateGameAPIPArams,
  UseGamesServiceOperators,
  UseGamesServiceParams,
} from "@src/lib/types/games";

import { useAuthService } from "@src/store/hooks";

import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useToasterContext } from "@src/context/Toaster";
import { AlertType } from "@src/lib/types/toaster";
import { useGamesContext } from "./provider";

export const useGamesService = (
  args?: UseGamesServiceParams
): Readonly<UseGamesServiceOperators> => {
  const {
    getMostPopularSilver = false,
    getMostPopularGold = false,
    getMostPopularGame = false,
    getTotalGames,
  } = args || {};

  const { currentUser } = useAuthService();
  const { triggerOpen } = useToasterContext();
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const { state, handlePageChange, handleCloseMoreDetails, handleCloseEditDetails } = useGamesContext();
  const { page, debouncedSearch, rowsPerPage, order, orderBy, provider, selectedGame } =
    state || {};
  const newPage = (page || 0) + 1;

  const gamesListQueryKey = [
    "games",
    {
      newPage,
      order,
      orderBy,
      rowsPerPage,
      debouncedSearch,
      provider,
      selectedPartnerId
    },
  ];

  const { data, refetch, isRefetching, isLoading } = useQuery({
    queryKey: gamesListQueryKey,
    queryFn: async () => {
      const reqParams: GamesAPIParams = {
        size: rowsPerPage,
        page: newPage,
        partnerId: selectedPartnerId,
      };
      if (typeof provider === "number") reqParams.providerID = provider;
      if (debouncedSearch) reqParams.search = debouncedSearch;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      const gamesRes = await gamesListAPI(reqParams);

      return gamesRes;
    },
  });

  const { data: gameDetail, isLoading: isLoadingGameDetail } = useQuery({
    queryKey: ['game-details', selectedGame?.id, selectedGame?.lastModifiedDate, selectedPartnerId],
    queryFn: async () => {
      if (selectedGame?.id) {
        const result = await gameDetailsAPI(selectedGame.id, selectedPartnerId);
        return result;
      }
    },
    staleTime: 0,
    gcTime: 0,
    enabled: !!selectedGame?.id
  });

  const { data: totalGames } = useQuery({
    queryKey: ["total-games-count", { selectedPartnerId }],
    queryFn: async () => {
      const gamesRes = await getTotalGamesCount({ partnerId: selectedPartnerId  });
      return gamesRes;
    },
    enabled: !!currentUser?.id && getTotalGames,
  });

  const { data: mostPopularSilverGame } = useQuery({
    queryKey: ["most-popular-silver-game", selectedPartnerId],
    queryFn: async () => {
      const gamesRes = await getMostPopularGames({
        partnerId: selectedPartnerId,
        sort: "totalSilverBet,desc",
      });
      return gamesRes;
    },
    enabled: !!currentUser?.id && getMostPopularSilver,
  });

  const { data: mostPopularGoldGame } = useQuery({
    queryKey: ["most-popular-gold-game", selectedPartnerId],
    queryFn: async () => {
      const gamesRes = await getMostPopularGames({ partnerId: selectedPartnerId, sort: "totalGoldBet,desc" });
      return gamesRes;
    },
    enabled: !!currentUser?.id && getMostPopularGold,
  });

  const { data: mostPopularGame } = useQuery({
    queryKey: ["most-popular-game", selectedPartnerId],
    queryFn: async () => {
      const gamesRes = await getMostPopularGames({ partnerId: selectedPartnerId, sort: "totalPlayers,desc" });
      return gamesRes;
    },
    enabled: !!currentUser?.id && getMostPopularGame,
  });

  const onExportGamesList = useMutation({
    mutationKey: ["export-games-list"],
    mutationFn: async () => {
      const reqParams: GamesAPIParams = {
        partnerId: selectedPartnerId
      };

      if (provider) reqParams.providerID = Number(provider);
      if (debouncedSearch) reqParams.search = debouncedSearch;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      const res = await gamesListAPI(reqParams);
      // const res = await allGamesAPI(reqParams);

      console.log("resres", res)

      const newJson = _reduce(
        res.items,
        (result: any, value: any, key) => {
          result.push({
            id: value.id,
            "Game Name": value?.gameName,
            Provider: value?.gameType?.provider?.name,
            Code: value.code,
            "Tier ID": value?.tier?.id,
            Status: value.isActive === 1 ? "Active" : "Inactive",
            "Top Game": value.isTop === 1 ? "Yes" : "No",
            "Gold Game": value.isGoldAllow === 1 ? "Yes" : "No",
            // "New Game": value.isNew === 1 ? "Yes" : "No",
            // "For Features": value.isFeatured === 1 ? "Yes" : "No",
            "Created Date": moment.parseZone(value.enrollmentDate).format(
              "MM-DD-YYYY hh:mm A"
            ),
            "Last Update": moment.parseZone(value.lastModifiedDate).format(
              "MM-DD-YYYY hh:mm A"
            ),
          });

          return result;
        },
        []
      );

      downloadExcel(newJson, "export-games");
    },
  });

  const onRefreshPurchases = () => {
    handlePageChange(null, 0);
    refetch();
  };

  const onUploadGameThumbnail = useMutation({
    mutationKey: ['game-thumbnail-upload'],
    mutationFn: async (args: GameUploadImageAPIParams) => {
      const result = await uploadGameThumbnailAPI(args);
      return result.filePath;
    },
    onSuccess: () => {
      triggerOpen({
        title: "Upload Thumbnail",
        message: "Successfully uploaded a game thumbnail",
      });
    },
    onError: () => {
      triggerOpen({
        type: AlertType.error,
        title: "Upload Thumbnail",
        message: "Failed to upload a game thumbnail",
      });
    },
  });

  const onUpdateGameDetails = useMutation({
    mutationKey: ['update-game-details'],
    mutationFn: async (args?: Partial<UpdateGameAPIPArams>) => {
      const result = await updateGameAPI(args);
      return result;
    },
    onSuccess: () => {
      refetch();
      handleCloseMoreDetails();
      handleCloseEditDetails();

      triggerOpen({
        title: "Update Game Details",
        message: "Successfully updated the game details",
      });
    },
    onError: () => {
      triggerOpen({
        type: AlertType.error,
        title: "Update Game Details",
        message: "Failed to update the game details",
      });
    },
  });

  return {
    data,
    games: data?.items || [],
    gameDetail,
    totalGames,
    isLoading,
    isRefreshing: isRefetching,
    isLoadingGameDetail,
    mostPopularGoldGame,
    mostPopularSilverGame,
    mostPopularGame,
    onRefreshPurchases,
    onExportGamesList,
    onUploadGameThumbnail,
    onUpdateGameDetails,
  };
};
