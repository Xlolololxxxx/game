import axiosClient from "@src/utils/axios-client";

export const gameCategoriesListAPI = async (params: any) => {
    try {
        const result = await axiosClient.get("/game-categories", { params });
        return result.data.data || {};
    } catch (error: any) {
        throw error.response.data.error;
    }
};
