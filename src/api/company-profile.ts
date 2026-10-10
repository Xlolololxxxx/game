import { UpdateCompanyProfileAPI } from "@src/lib/types/company-profile";
import axiosClient from "@src/utils/axios-client";

/**
 * ==============================================
 * Company Profile API
 * ==============================================
 */
export const getCompanyProfileAPI = async (params?: any) => {
    try {
        const result = await axiosClient.get("/company-profile", { params });
        return result.data || {};
    } catch (error: any) {
        throw error.response.data.error;
    }
};

export const updateCompanyProfileAPI = async (params: UpdateCompanyProfileAPI) => {
    try {
        const result = await axiosClient.post("/company-profile/update", params);
        return result.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}