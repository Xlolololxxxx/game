import { CreateMailContextStateType, InMailAPIParams } from "@src/lib/types/in-mail-portal";
import { GetPartnerAPIParams } from "@src/lib/types/users";
import axiosClient from "@src/utils/axios-client";

export const allMailResultsAPI = async (params?: InMailAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      "sort":"createdAt,desc",
      ...params,
    };

    const result = await axiosClient.post(
      "/mails?partnerId=" + params?.partnerId,
      requestParams
    );

    return result.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const createInMailAPI = async (params?: CreateMailContextStateType | any) => {
  try {
    const res = await axiosClient.post(
      "/mails/create?partnerId=" + params?.partnerId,
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const mailDetailsAPI = async (id?: number, params?: any) => {
  try {
    const res = await axiosClient.get(`/mails/${id}`, { params });
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const updateMailDetailsAPI = async (params?: any) => {
  try {
    const res = await axiosClient.post(`/mails/${params.id}`, params);
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const updateMailStatusAPI = async (id: number, params: any) => {
  try {
    const res = await axiosClient.post(
      `/mails/${id}/status`,
      params
    );
    return res?.data?.data ?? {};
  } catch (error) {
    throw error;
  }
};

export const uploadImageAPI = async (params?: any) => {
  try {
    delete axiosClient.defaults.headers['Content-Type'];
    const res = await axiosClient.post(
      "/files/upload",
      params
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const gamesAPI = async (params: GetPartnerAPIParams) => {
  try {
    const res = await axiosClient.post("/game/list?partnerId=" + params.partnerId, { isActive: 1});
    return res?.data ?? [];
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
