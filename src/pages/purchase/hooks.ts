import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

import { downloadExcel } from "@src/utils/download-helper";

import {
  GetAllPurchasesAPIParams,
  TransactionType,
  UsePurchasesServiceOperators
} from "@src/lib/types/purchases";

import {
  allPurchasesAPI,
  exportPurchasesListAPI,
  totalPurchasesCurrentMonth
} from "@src/api/purchases";
import { TABLE_HEAD_PURCHASE } from "@src/utils/mockdata/table-headers";
import numeral from "numeral";
import { usePurchasesContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { OptionValue, StatusChange } from "@src/utils/filter-helper";

export const usePurchasesService = (): Readonly<UsePurchasesServiceOperators> => {
  const [params] = useSearchParams();
  const userId = params.get("u");
  const year = params.get("year");
  const month = params.get("month");
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const { state, handlePageChange } = usePurchasesContext();
  const {
    page,
    fromdate,
    todate,
    order,
    orderBy,
    rowsPerPage,
    userid,
    status,
    paymentOption,
  } = state || {};
  const newPage = (page || 0) + 1;
  const filterUserID = userid || userId;

  const purchasesListQueryKey = [
    "purchases",
    {
      year,
      month,
      newPage,
      fromdate,
      todate,
      userid: filterUserID,
      order,
      orderBy,
      rowsPerPage,
      status,
      paymentOption,
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

      if (filterUserID) reqParams.user_id = Number(filterUserID);
      if (status) reqParams.status = status;
      if (paymentOption) reqParams.payment_type_id = Number(paymentOption);
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
      if (fromdate) reqParams.from_date = fromdate;
      if (todate) reqParams.to_date = todate;
      if (year) reqParams.year = year;
      if (month) reqParams.month = month;

      const res = await allPurchasesAPI(reqParams);

      return res;
    },
  });

  const onExportPurchasesList = useMutation({
    mutationKey: ["export-purchases-list", selectedPartnerId],
    mutationFn: async () => {
      const reqParams: GetAllPurchasesAPIParams = {
        partnerId: selectedPartnerId
      };

      if (filterUserID) reqParams.user_id = Number(filterUserID);

      if (status) reqParams.status = status;

      if (paymentOption) reqParams.payment_type_id = Number(paymentOption);

      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      if (fromdate) reqParams.from_date = fromdate;
      if (todate) reqParams.to_date = todate;
      if (year) reqParams.year = year;
      if (month) reqParams.month = month;

      const res = await exportPurchasesListAPI(reqParams);

      const newJson = res.data.items.map((item: TransactionType) => {
        const result: Record<string, any> = {};

        TABLE_HEAD_PURCHASE.forEach(({ id, label = "" }) => {
          let fieldValue: any;

          if (id === 'userID') fieldValue = item.user.id;
          if (id === 'u.displayName') fieldValue = item.user.displayName;
          if (id === 'purchaseItemName') fieldValue = item.purchaseItemName;
          if (id === 'paymentTypeID') fieldValue = OptionValue[item.paymentTypeID];
          if (id === 'amount') fieldValue = numeral(item.amount || 0).format("0,000.00");
          if (id === 'status') fieldValue = StatusChange(item.status);
          if (id === 'transactionDate') fieldValue = item.transactionDate ? moment.parseZone(item.transactionDate).format("MM-DD-YYYY hh:mm A") : "-";

          result[label] = fieldValue;
        });

        return result;
      });

      downloadExcel(newJson, "export-purchase");
    },
  });

  const { data: totalPurchase } = useQuery({
    queryKey: ["current-month-total-purchases",
      {
        page,
        fromdate,
        todate,
        order,
        orderBy,
        rowsPerPage,
        status,
        paymentOption,
        selectedPartnerId,
      }
    ],
    queryFn: async () => {
      const reqParams: GetAllPurchasesAPIParams = {
        partnerId: selectedPartnerId,
      };

      if (status) reqParams.status = status;
      if (paymentOption) reqParams.payment_type_id = Number(paymentOption);
      if (fromdate) reqParams.from_date = fromdate;
      if (todate) reqParams.to_date = todate;
      if (year) reqParams.year = year;
      if (month) reqParams.month = month;

      const purchaseRes = await totalPurchasesCurrentMonth(reqParams);

      return purchaseRes || {};
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
    totalPurchase,
    onRefreshPurchases,
    onExportPurchasesList,
  };
};
