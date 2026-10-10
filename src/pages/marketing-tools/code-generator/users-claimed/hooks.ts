import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";

import { downloadExcel } from "@src/utils/download-helper";

import {
  UsePurchasesServiceOperators
} from "@src/lib/types/purchases";

import { usersClaimedAPI } from "@src/api/code-generator";
import { CodeGeneratorAPIParams, UsersClaimValue } from "@src/lib/types/code-generator";
import { TABLE_HEAD_USER_CLIAM_PROMO } from "@src/utils/mockdata/table-headers";
import { useCodeGeneratorContext } from "../provider";
import { useProviderContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useUsersService = (): Readonly<UsePurchasesServiceOperators> => {
  const { state: {editDetails} } = useCodeGeneratorContext();
  const { state, handlePageChange } = useProviderContext();
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();
  
  const {
    page,
    fromdate,
    todate,
    order,
    orderBy,
    rowsPerPage,
    status,
    paymentOption,
  } = state || {};
  const newPage = (page || 0) + 1;

  const purchasesListQueryKey = [
    "users-claimed",
    {
      newPage,
      fromdate,
      todate,
      order,
      orderBy,
      rowsPerPage,
      status,
      paymentOption,
      id: editDetails?.id,
      selectedPartnerId
    },
  ];

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: purchasesListQueryKey,
    queryFn: async () => {
      const reqParams: CodeGeneratorAPIParams = {
        size: rowsPerPage,
        page: newPage,
        id: editDetails?.id,
        partnerId: selectedPartnerId
      };

      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
      if (fromdate) reqParams.fromDate = fromdate;
      if (todate) reqParams.toDate = todate;

      const res = await usersClaimedAPI(reqParams);

      return res;
    },
  });

  const onExportPurchasesList = useMutation({
    mutationKey: ["export-users-claimed-list",
      {
        newPage,
        fromdate,
        todate,
        order,
        orderBy,
        rowsPerPage,
        status,
        paymentOption,
        id: editDetails?.id,
      },
    ],
    mutationFn: async () => {
      const reqParams: CodeGeneratorAPIParams = {
        size: rowsPerPage,
        page: newPage,
        id: editDetails?.id,
        partnerId: selectedPartnerId
      };

      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
      if (fromdate) reqParams.fromDate = fromdate;
      if (todate) reqParams.toDate = todate;

      const res = await usersClaimedAPI(reqParams);

      const newJson = res.items.map((item: UsersClaimValue) => {
        const result: Record<string, any> = {};

        TABLE_HEAD_USER_CLIAM_PROMO.forEach(({ id, label = "" }) => {
          let fieldValue: any;

          if (id === 'u.id') fieldValue = item.user.id;
          if (id === 'u.emailAddress') fieldValue = item.user.emailAddress;
          if (id === 'claimedAt') fieldValue = item.claimedAt ? moment.parseZone(item.claimedAt).format("MM-DD-YYYY hh:mm A") : "-";

          result[label] = fieldValue;
        });

        return result;
      });

      downloadExcel(newJson, "export-user-claim-promo");
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
