import { useMutation, useQuery } from "@tanstack/react-query";
import _reduce from "lodash/reduce";

import { downloadExcel } from "@src/utils/download-helper";

import {
  GetAllPurchasesAPIParams,
  UsePurchasesServiceOperators,
} from "@src/lib/types/purchases";

import {
  totalPurchasesByMonths
} from "@src/api/purchases";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { usePurchasesContext } from "./provider";

export const usePurchasesService = (): Readonly<UsePurchasesServiceOperators> => {
  const { state, handlePageChange } = usePurchasesContext();
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();
  
  const {
    page,
    rowsPerPage,
    month,
    year,
  } = state || {};
  const newPage = (page || 0) + 1;

  const purchasesListQueryKey = [
    "total-purchases-by-months",
    {
      month,
      year,
      newPage,
      // order,
      // orderBy,
      rowsPerPage,
      selectedPartnerId
    },
  ];

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: purchasesListQueryKey,

    queryFn: async () => {
      const reqParams: GetAllPurchasesAPIParams = {
        size: rowsPerPage,
        page: newPage,
        partnerId: selectedPartnerId
      };

      // if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
      if (month) reqParams.month = month;
      if (year) reqParams.year = year;

      const res = await totalPurchasesByMonths(reqParams);

      return res;
    },
  });


  const onExportPurchasesList = useMutation({
    mutationKey: ["export-purchases-months", { selectedPartnerId }],
    mutationFn: async () => {
      const reqParams: GetAllPurchasesAPIParams = {
        partnerId: selectedPartnerId
      };

      reqParams.size = 10000;

      const res = await totalPurchasesByMonths(reqParams);

      const newJson = _reduce(
        res.items,
        (result: any, value: any, key) => {
          result.push({
            year: value.year,
            month: value.monthName,
            "purchase count": value.count,
            "total amount": value.totalAmount,
          });

          return result;
        },
        []
      );

      downloadExcel(newJson, "export-purchase");
    },
  });

  const onRefreshPurchases = () => {
    handlePageChange(null, 0);
    refetch();
  };

  return {
    data,
    purchases: data?.items || [],
    isLoading,
    isRefreshing: isRefetching,
    onRefreshPurchases,
    onExportPurchasesList,
  };
};
