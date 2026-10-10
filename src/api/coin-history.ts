import { CoinHistoryAPIParams } from "@src/lib/types/coin-history";
import axiosClient from "@src/utils/axios-client";

export const allCoinResultsAPI = async (params?: CoinHistoryAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      sort: "enrollmentDate,desc",
      ...params,
    };

    const result = await axiosClient.post(
      "/payment/report/getCoinTransaction?partnerId=" + params?.partnerId,
      requestParams
    );

    return result.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const exportCoinHistoryAPI = async (params?: CoinHistoryAPIParams) => {
  try {
    const res = await axiosClient.post(
      "/payment/report/getCoinTransaction/noPaging?partnerId=" + params?.partnerId,
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};
