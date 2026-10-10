import { GetMostPlayedAPIParams } from "@src/lib/types/most-played";
import axiosClient from "@src/utils/axios-client";

export const getMostPlayedAPI = async (params?: GetMostPlayedAPIParams) => {
    try {
        const result = await axiosClient.post(`/game/most-popular?partnerId=${params?.partnerId}`, params);
        return result?.data?.data || {};
    } catch (error: any) {
        throw error.response.data.error;
    }
};

export const exportMostPlayedListAPI = async (params?: GetMostPlayedAPIParams) => {
    try {
        const result = await axiosClient.post(`/game/most-popular?partnerId=${params?.partnerId}`, params);
        return result.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
};
