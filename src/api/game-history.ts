import { GameHistoryAPIParams } from "@src/lib/types/game-history";
import axiosClient from "@src/utils/axios-client";

export const allGameResultsAPI = async (params?: GameHistoryAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      sort: "CreatedDate,desc",
      ...params,
    };

    delete requestParams.partnerId;

    const result = await axiosClient.post(
      "/callback/report/getPlayResult?partnerId=" + params?.partnerId,
      requestParams
    );

    return result.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const exportGameHistoryAPI = async (params?: GameHistoryAPIParams) => {
  try {
    const requestParams = {
      ...params,
    };
    delete requestParams.partnerId;
    const res = await axiosClient.post(
      "/callback/report/getPlayResult/noPaging?partnerId=" + params?.partnerId,
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};
