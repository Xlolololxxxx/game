import { CreateMailContextStateType, InMailAPIParams } from "@src/lib/types/in-mail-portal";
import { GetPartnerAPIParams } from "@src/lib/types/users";
import axiosClient from "@src/utils/axios-client";

export const allMissionsResultsAPI = async (params?: InMailAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.post(
      "/mission/list?partnerId=" + params?.partnerId, requestParams,
    );

    return result.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const createInMailAPI = async (params?: CreateMailContextStateType | any) => {
  try {
    const res = await axiosClient.post(
      "/mails/create",
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const missionDetailsAPI = async (id?: number) => {
  try {
    const res = await axiosClient.get(`/mission/${id}`);
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const updateMissionDetailsAPI = async (params?: any) => {
  try {
    const res = await axiosClient.post(`/mission/${params.id}`, params);
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const updateMissionStatusAPI = async (id: number, params: any) => {
  try {
    const res = await axiosClient.post(
      `/mission/${id}/update-status`,
      params
    );
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const gameCategoryAPI = async (params?: GetPartnerAPIParams) => {
  try {
    const res = await axiosClient.get("/game-categories", { params });
    return res?.data?.data?.content ?? [];
  } catch (error) {
    throw error;
  }
};

export const productsAPI = async (params?: GetPartnerAPIParams) => {
  try {
    const res = await axiosClient.get("/products/get", { params });
    return res?.data ?? [];
  } catch (error) {
    throw error;
  }
};
