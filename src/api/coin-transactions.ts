import axiosClient from "@src/utils/axios-client";

export const getCoinTransactionBetStatsAPI = async (params: any) => {
    try {
        const result = await axiosClient.get("/coin-transactions/bet/chart", { params });
        return result.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
};
