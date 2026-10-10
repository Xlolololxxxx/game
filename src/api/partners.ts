import {
  CreatePartnerAPIParams,
  GetPartnersListAPIParams,
  UpdatePartnerOwnerAPIParams,
  UpdatePartnerStatusAPIParams,
} from "@src/lib/types/partners";
import axiosClient from "@src/utils/axios-client";

export const partnersListAPI = async (params?: GetPartnersListAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      sort: "createdDate,desc",
      ...params,
    };

    const result = await axiosClient.get("/partners", {
      params: requestParams,
    });

    return result.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const getActivePartnersAPI = async () => {
  try {
    const result = await axiosClient.get("/partners/active");

    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const getPartnerDetailsAPI = async (partnerId: string | number) => {
  try {
    const result = await axiosClient.get(`/partners/${partnerId}`);
    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
}

export const createPartnerAPI = async (params: CreatePartnerAPIParams) => {
  try {
    const result = await axiosClient.post("/partners", params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const updatePartnerAPI = async (id: number, params: CreatePartnerAPIParams) => {
  try {
    const result = await axiosClient.post(`/partners/${id}`, params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const updatePartnerStatusAPI = async (id: number, params: UpdatePartnerStatusAPIParams) => {
  try {
    const result = await axiosClient.post(`/partners/${id}/status`, params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const updatePartnerUserOwnerUpdateAPI = async (params: UpdatePartnerOwnerAPIParams) => {
  try {
    const result = await axiosClient.post("/partner/users/owner/update", params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}