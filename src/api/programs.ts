import axiosClient from "@src/utils/axios-client";

import { GenerateProgramsAPIParams } from "@src/lib/types/programs";

export const generateProgramsAPI = async (params: GenerateProgramsAPIParams) => {
    try {
        const licenses = await axiosClient.post("/game/commissionForGameProvider?partnerId=" + params.partnerId, params);
        return licenses.data || {};
    } catch (error: any) {
        throw error.response.data.error;
    }
};

export const getPartnerCommission = async (params: GenerateProgramsAPIParams) => {
    try {
        const licenses = await axiosClient.post("/commissions/partners?partnerId=" + params.partnerId, params);
        return licenses.data || {};
    } catch (error: any) {
        throw error.response.data.error;
    }
};
