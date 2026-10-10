import {
  ActivateLicenseAPIParams,
  CreateLicenseFormData,
  GetLicensesListAPIParams,
} from "@src/lib/types/licenses";
import axiosClient from "@src/utils/axios-client";

/**
 * ==============================================
 * DEVELOPER ACCESS
 * ==============================================
 */

export const licensesListAPI = async (params?: GetLicensesListAPIParams) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      sort: "createdAt,desc",
      ...params,
    };

    const result = await axiosClient.get("/licenses", {
      params: requestParams,
    });
    return result.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const createLicenseAPI = async (params: CreateLicenseFormData) => {
  try {
    const result = await axiosClient.post("/licenses", params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const activateLicenseKeyAPI = async (params: ActivateLicenseAPIParams) => {
  try {
    const result = await axiosClient.post("/licenses/activate", params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

export const revokeLicenseKeyAPI = async (licenseId: number) => {
  try {
    const result = await axiosClient.post(`/licenses/${licenseId}/revoke`);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

export const validateLicenseKeyAPI = async (partnerId: number) => {
  try {
    const result = await axiosClient.get('/licenses/validity', {
      params: {
        partnerId
      }
    });
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}
/**
 * ==============================================
 * END DEVELOPER ACCESS
 * ==============================================
 */

/**
 * ==============================================
 * PARTNER (OWNER) ACCESS
 * ==============================================
 */
export const partnerLicensesAPI = async () => {
  try {
    const licenses = await axiosClient.get("/partner-licenses");
    return licenses.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const partnerActivateLicenseKeyAPI = async (params: ActivateLicenseAPIParams) => {
  try {
    const result = await axiosClient.post("/partner-licenses/activate", params);
    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

/**
 * ==============================================
 * PARTNER (OWNER) ACCESS
 * ==============================================
 */