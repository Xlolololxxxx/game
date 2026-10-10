import {
  GetAllPurchasesAPIParams,
  PurchasesCountAPIParams,
} from "@src/lib/types/purchases";
import axiosClient from "@src/utils/axios-client";

export const allPurchasesAPI = async (params?: GetAllPurchasesAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      sort: "transactionDate,desc",
      ...params,
    };

    const purchases = await axiosClient.post(
      "/payment/report/getPayment?partnerId=" + params?.partnerId,
      requestParams
    );

    return purchases.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const totalPurchasesByMonths = async (params?: GetAllPurchasesAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const purchases = await axiosClient.get(
      "/payment/stats", {params: requestParams}
    );

    return purchases.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const totalPurchasesCountAPI = async (
  partnerId: any,
  params?: PurchasesCountAPIParams
) => {
  try {
    const purchases = await axiosClient.post("/payment/count?partnerId=" + partnerId, params);
    return purchases?.data?.data?.count || 0;
  } catch (error) {
    throw error;
  }
};

export const totalPurchasesCurrentMonth = async (params: any) => {
  try {
    const purchases = await axiosClient.post("/payment/stats/overview?partnerId=" + params?.partnerId, 
      {
        ...params
      });
    return purchases?.data
  } catch (error) {
    throw error;
  }
};

export const exportPurchasesListAPI = async (
  params?: GetAllPurchasesAPIParams
) => {
  try {
    const res = await axiosClient.post(
      "/payment/report/getPayment/noPaging?partnerId=" + params?.partnerId,
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};
