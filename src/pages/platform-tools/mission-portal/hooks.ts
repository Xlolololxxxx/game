import { gamesAPI } from "@src/api/in-mail-portal";
import { allMissionsResultsAPI, gameCategoryAPI, missionDetailsAPI, updateMissionDetailsAPI, updateMissionStatusAPI } from "@src/api/missions-portal";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useToasterContext } from "@src/context/Toaster";
import { CreateMissionContextStateType, MissionAPIParams, UseMissionServiceOperators, UseMissionServiceParams } from "@src/lib/types/missions-portal";
import { AlertType } from "@src/lib/types/toaster";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import { useMissionContext } from "./provider";

export const useMissionsService =
  (args?: UseMissionServiceParams): Readonly<UseMissionServiceOperators> => {
    const [params] = useSearchParams();
    const userId = params.get("u");
    const { state } = useMissionContext();
    const { triggerOpen } = useToasterContext();
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();
    const { name, page, order, orderBy, rowsPerPage, editDetails } = state || {};
    const newPage = (page || 0) + 1;

    const QUERY_KEY = [
      "missions-list",
      {
        name,
        userId,
        newPage,
        order,
        orderBy,
        rowsPerPage,
        selectedPartnerId
      },
    ];

    const { data, isLoading, isRefetching, refetch } = useQuery({
      queryKey: QUERY_KEY,
      queryFn: async () => {
        const reqParams: MissionAPIParams = {
          size: rowsPerPage,
          page: newPage,
          partnerId: selectedPartnerId
        };

        if (name) reqParams.name = name;

        const result = await allMissionsResultsAPI(reqParams);

        return result;
      },
    });

    const onCreateMission = useMutation({
      mutationKey: ['in-mission-creation'],
      mutationFn: async (args?: Partial<CreateMissionContextStateType>) => {
        // const result = await createMissionAPI(args);
        // return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Create Mail",
          message: "Successfully mission creation",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Create Mail",
          message: "Failed to create mission",
        });
      },
    });

    const { data: getMissionDetails, isLoading: getMissionDetailsLoading } = useQuery({
      queryKey: ["mission-details", editDetails?.name, editDetails?.lastModifiedDate],
      queryFn: async () => {
        if (!_.isEmpty(editDetails)) {
          const result = await missionDetailsAPI(editDetails?.id);
          return result;
        }
      },
      enabled: !!editDetails?.id && args?.getMissionDetails,
    });

    const updateMissionStatus = useMutation({
      mutationKey: ['update-mission-status'],
      mutationFn: async (params: any) => {
        const result = await updateMissionStatusAPI(params.id, {
          active: params.isActive
        });
        return result;
      },
      // onSuccess: () => {
      //   triggerOpen({
      //     title: "Update Mission Status",
      //     message: "Change status successfully",
      //   });
      // },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Update Mission Status",
          message: "Failed to update mission status",
        });
      },
    });

    const { data: games } = useQuery({
      queryKey: ["games", { selectedPartnerId}],
      queryFn: async () => {
        const result = await gamesAPI({ partnerId: selectedPartnerId });
        return result;
      },
    });

    const { data: gameCategories } = useQuery({
      queryKey: ["game-category", selectedPartnerId],
      queryFn: async () => {
        const result = await gameCategoryAPI({ partnerId: selectedPartnerId });
        return result;
      },
    });

    const updateMissionDetails = useMutation({
      mutationKey: ['update-mission-details'],
      mutationFn: async (params: any) => {
        const result = await updateMissionDetailsAPI(params);
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Update Mission Details",
          message: "Change details successfully",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Update Mission Details",
          message: "Failed to update mission details",
        });
      },
    });

    const onRefreshMission = () => {
      refetch();
    };

    return {
      data,
      missions: data?.items ?? [],
      isLoading,
      isRefreshing: isRefetching,
      onRefreshMission,
      onCreateMission,
      getMissionDetails,
      games,
      gameCategories,
      getMissionDetailsLoading,
      updateMissionStatus,
      updateMissionDetails,
    };
  };
