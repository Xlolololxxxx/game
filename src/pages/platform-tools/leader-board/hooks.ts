import { useMutation, useQuery } from "@tanstack/react-query";
import numeral from "numeral";



import {
  GetAllLeaderBoardParams,
  UseLeaderBoardServiceOperators
} from "@src/lib/types/leaderboard";


import { downloadExcel } from "@src/utils/download-helper";

import { LeaderBoardRankingAPI } from "@src/api/platform-tools";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_GOLD, TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_SILVER } from "@src/utils/mockdata/table-headers";
import _ from "lodash";
import moment from "moment";
import { useLeaderBoardContext } from "./provider";

export const useLeaderBoardService = (): Readonly<UseLeaderBoardServiceOperators> => {
  const {
    state,
    handlePageChange,
  } = useLeaderBoardContext();
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const {
    page,
    size = 10,
    fromDate,
    toDate,
    order,
    orderBy,
    coinTypeId,
    week,
    year
  } = state ?? {};
  const newPage = (page || 0) + 1;

  const usersListQueryKey = [
    'weekly-leaderboard-rank',
    {
      size,
      newPage,
      fromDate,
      toDate,
      order,
      orderBy,
      coinTypeId,
      week,
      year,
      selectedPartnerId
    },
  ];

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: usersListQueryKey,
    queryFn: async () => {
      const reqParams: GetAllLeaderBoardParams = {
        size,
        page: newPage,
        coinTypeId: coinTypeId,
        partnerId: selectedPartnerId,
        week: moment().isoWeek(),
        year: moment().isoWeekYear(),
      };

      if (week) reqParams.week = week;
      if (year) reqParams.year = year;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      const usersRes = await LeaderBoardRankingAPI(reqParams);

      return usersRes;
    },
  });

  const onRefreshUsers = () => {
    handlePageChange(null, 0);
    refetch();
  };

  const onExportUsersList = useMutation({
    mutationKey: ["export-weekly-leaderboard-list", {
      fromDate,
      toDate,
      coinTypeId
    }],
    mutationFn: async () => {
      const reqParams: GetAllLeaderBoardParams = {
        coinTypeId: coinTypeId,
        partnerId: selectedPartnerId,
        week: moment().isoWeek(),
        year: moment().isoWeekYear(),
      };

      if (week) reqParams.week = week;
      if (year) reqParams.year = year;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      return await LeaderBoardRankingAPI(reqParams);
    },
    onSuccess: (data) => {
      const promises: any = [];
      
      _.forEach(data.items, (item, index: number) => {
        const promise = new Promise((innerResolve) => {
          const result: Record<string, any> = {};
          const headers = coinTypeId === 1 ? TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_SILVER : TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_GOLD;

          headers.forEach(({ id, label = "" }) => {
            let fieldValue: any;
  
            if (id === "u.palmsId") fieldValue = item.user.palmsId;
            if (id === "u.id") fieldValue = item.user.id;
            if (id === "u.displayName") fieldValue = item.user.displayName;
            if (id === "rank") fieldValue = item.rank;
            if (id === "totalScore") fieldValue = numeral(item.totalScore).format("0,000");
            if (id === "lastModifiedDate") fieldValue = moment.parseZone(item.lastModifiedDate).format("MM-DD-YYYY hh:mm A");
  
            result[label] = fieldValue;
          })
          innerResolve(result);
        });
  
        promises.push(promise);
      });

      Promise.all(promises)
      .then((newJson) => {
        downloadExcel(newJson, "weekly leaderboard");
      })
      .catch((error) => {
        console.log("error", error)
      });
    },
  });

  return {
    data,
    users: data?.items,
    totalRecords: data?.totalRecords || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isRefreshing: isRefetching,
    onRefreshUsers,
    onExportUsersList,
  };
};
