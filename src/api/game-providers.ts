import { UpdateGameProviderAPIRequestType } from "@src/lib/types/game-providers";
import axiosClient from "@src/utils/axios-client";

export const providersListAPI = async (params?: any) => {
  try {
    const result = await axiosClient.get("/provider", { params });
    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const providersWithShareListAPI = async (params?: any) => {
  try {
    const result = await axiosClient.get("/provider/list", { params });
    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const updatePercentShareAPI = async (params?: UpdateGameProviderAPIRequestType) => {
  try {
    const games = await axiosClient.post(`/provider/update?partnerId=` + params?.partnerId, { ...params });
    return games?.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const partnerProvidersListAPI = async (params?: any) => {
  try {
    const result = await axiosClient.get("/commissions/partners/providers", { params });
    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const updatePartnerPercentShareAPI = async (params?: UpdateGameProviderAPIRequestType) => {
  try {
    const games = await axiosClient.post(`/commissions/partners/providers/update?partnerId=` + params?.partnerId, { ...params });
    return games?.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};