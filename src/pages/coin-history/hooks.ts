import { useMutation, useQuery } from "@tanstack/react-query";
import _reduce from "lodash/reduce";
import moment from "moment";
import numeral from "numeral";
import { useSearchParams } from "react-router-dom";
import { allCoinResultsAPI, exportCoinHistoryAPI } from "@src/api/coin-history";
import { downloadExcel } from "@src/utils/download-helper";
import {
  CoinHistoryAPIParams,
  UseCoinHistoryServiceOperators,
} from "@src/lib/types/coin-history";
import { useCoinHistoryContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { getObjectCoinType } from "@src/utils/mockdata/menu-options";

export const useCoinHistoryService =
  (): Readonly<UseCoinHistoryServiceOperators> => {
    const [params] = useSearchParams();
    const userId = params.get("u");

    const { state, handlePageChange } = useCoinHistoryContext();
    const { state: { selectedPartnerId }, partner } = usePartnerDropdownContext();
    const CoinType = getObjectCoinType(partner);

    const { page, order, orderBy, rowsPerPage, coinType, fromDate, toDate } = state || {};
    const newPage = (page || 0) + 1;

    const COIN_HISTORY_QUERY_KEY = [
      "coin-history",
      {
        userId,
        newPage,
        order,
        orderBy,
        rowsPerPage,
        coinType,
        fromDate, 
        toDate,
        selectedPartnerId
      },
    ];

    const { data, isLoading, isRefetching, refetch } = useQuery({
      queryKey: COIN_HISTORY_QUERY_KEY,
      queryFn: async () => {
        const reqParams: CoinHistoryAPIParams = {
          size: rowsPerPage,
          page: newPage,
          user_id: userId,
          partnerId: selectedPartnerId,
        };

        if (fromDate) reqParams.from_date = fromDate;
        if (toDate) reqParams.to_date = toDate;
        if (coinType > 0) reqParams.coin_type_id = coinType;
        if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

        const result = await allCoinResultsAPI(reqParams);

        return result;
      },
    });

    const onExportCoinHistory = useMutation({
      mutationKey: ["export-coin-history"],
      mutationFn: async () => {
        const reqParams: CoinHistoryAPIParams = {
          user_id: userId,
          partnerId: selectedPartnerId,
        };

        if (fromDate) reqParams.from_date = fromDate;
        if (toDate) reqParams.to_date = toDate;
        if (coinType > 0) reqParams.coin_type_id = coinType;
        if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

        const coinHistory = await exportCoinHistoryAPI(reqParams);

        const newJson = _reduce(
          coinHistory.data.items,
          (result: any, value: any, key) => {
            result.push({
              ID: value.id,
              "Coin Type": CoinType[value.coinTypeId],
              Transaction: value.description,
              Amount: numeral(value.amount).format("0,000.00"),
              "Balance Before": numeral(value.balanceBefore).format("0,000.00"),
              "Balance After": numeral(value.balanceAfter).format("0,000.00"),
              CreatedAt: moment.parseZone(value.enrollmentDate).format(
                "MM-DD-YYYY hh:mm A"
              ),
            });

            return result;
          },
          []
        );

        downloadExcel(newJson, "export-coin-history");
      },
    });

    const onRefreshCoinHistory = () => {
      handlePageChange(null, 0);
      refetch();
    };

    return {
      data,
      coinHistory: data?.items || [],
      isLoading,
      isRefreshing: isRefetching,
      onRefreshCoinHistory,
      onExportCoinHistory,
    };
  };
