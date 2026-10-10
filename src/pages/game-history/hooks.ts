import { useMutation, useQuery } from "@tanstack/react-query";
import _reduce from "lodash/reduce";
import moment from "moment";
import numeral from "numeral";
import { useLocation, useSearchParams } from "react-router-dom";

import { allGameResultsAPI, exportGameHistoryAPI } from "@src/api/game-history";

import { downloadExcel } from "@src/utils/download-helper";

import {
  GameHistoryAPIParams,
  UseGameHistoryServiceOperators,
} from "@src/lib/types/game-history";

import { useGameHistoryContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useGameHistoryService =
  (): Readonly<UseGameHistoryServiceOperators> => {
  const [params] = useSearchParams();
  const location = useLocation();

  const userId = params.get("u");
  const code = params.get("code");
  
  const { state, handlePageChange } = useGameHistoryContext();
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const { page, order, orderBy, rowsPerPage, fromDate, toDate, currency } = state || {};
  const newPage = (page || 0) + 1;

  const GAME_HISTORY_QUERY_KEY = [
    "game-history",
    {
      userId,
      newPage,
      order,
      orderBy,
      rowsPerPage,
      code,
      fromDate, 
      toDate,
      currency,
      selectedPartnerId
    },
  ];

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: GAME_HISTORY_QUERY_KEY,
    queryFn: async () => {
      const reqParams: GameHistoryAPIParams = {
        size: rowsPerPage,
        page: newPage,
        partnerId: selectedPartnerId,
      };

      if (userId) reqParams.user_id = userId;
      if (code) reqParams.game_id = Number(code);
      if (fromDate) reqParams.from_date = fromDate;
      if (toDate) reqParams.to_date = toDate;
      if (toDate) reqParams.period_type = "TIME_RANGE";
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
      if (currency && currency !== "ALL") reqParams.currency = currency;


      const result = await allGameResultsAPI(reqParams);

      return result;
    },
  });

  const onExportGameHistory = useMutation({
    mutationKey: ["export-game-history"],
    mutationFn: async () => {
      const reqParams: GameHistoryAPIParams = {
        partnerId: selectedPartnerId,
      };

      if (currency && currency !== "ALL") reqParams.currency = currency;
      if (userId) reqParams.user_id = userId;
      if (code) reqParams.game_id = Number(code);
      if (fromDate) reqParams.from_date = fromDate;
      if (toDate) reqParams.to_date = toDate;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      const gamehistory = await exportGameHistoryAPI(reqParams);

      const newJson = _reduce(
        gamehistory.data.items,
        (result: any, value: any, key) => {
          result.push({
            "Game ID": value.gameId,
            "Game Name": value.gameName,
            "User ID": value.userId,
            "Round ID": value.roundID,
            "Action Type": value.callbackActionType,
            Currency: value.currency,
            "Total Bet": numeral(value.totalBet).format("0,000.00"),
            "Total Win": numeral(value.totalWin).format("0,000.00"),
            "Date Played": value.createdDate
              ? moment.parseZone(value.createdDate).format("MM-DD-YYYY hh:mm A")
              : null,
          });

          return result;
        },
        []
      );

      downloadExcel(newJson, location.pathname === "/dashboard/users/report/game-history" ? 
        "export-game-history" : "export-game-activity");
    },
  });

  const onRefreshGameHistory = () => {
    handlePageChange(null, 0);
    refetch();
  };

  return {
    data,
    gameHistory: data?.items || [],
    isLoading,
    isRefreshing: isRefetching,
    onRefreshGameHistory,
    onExportGameHistory,
  };
};
