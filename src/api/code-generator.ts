import { CodeGeneratorAPIParams, CodeGeneratorItemType } from "@src/lib/types/code-generator";
import axiosClient from "@src/utils/axios-client";

export const allCodesResultsAPI = async (params?: CodeGeneratorAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/promotions", { params: requestParams},
    );

    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const createAPI = async (params?: CodeGeneratorItemType | any) => {
  try {
    const res = await axiosClient.post(
      "/promotions",
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const codeDetailsAPI = async (id?: number) => {
  try {
    const res = await axiosClient.get(`/mission/${id}`);
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const updateCodeDetailsAPI = async (params?: any) => {
  try {
    const res = await axiosClient.post(`/mission/${params.id}`, params);
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const updateCodeStatusAPI = async (id: number, params: any) => {
  try {
    const res = await axiosClient.post(
      `/promotions/${id}/status`,
      params
    );
    return res?.data ?? {};
  } catch (error) {
    throw error;
  }
};

// USER'S CLAIMED THE CODE
export const usersClaimedAPI = async (params?: CodeGeneratorAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const purchases = await axiosClient.get(
      `/promotions/${requestParams.id}/claims`,
      { params: requestParams},
    );

    return purchases.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};