import {
  GameUploadImageAPIParams,
  GamesAPIParams,
  MostPopularGamesAPIParams,
  UpdateGameAPIPArams,
} from "@src/lib/types/games";
import axiosClient from "@src/utils/axios-client";

export const gamesListAPI = async (params?: GamesAPIParams) => {
  try {
    const games = await axiosClient.post(`/game/paged?partnerId=` + params?.partnerId, {
      ...params,
    });

    return games?.data?.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const allGamesAPI = async (params?: GamesAPIParams) => {
  try {
    const games = await axiosClient.post(
      `/game/list?partnerId=${params?.partnerId}`,
      params
    );

    return games;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const gameDetailsAPI = async (gameId: number, parnertId: any) => {
  try {
    const game = await axiosClient.get(
      `/game/${gameId}?partnerId=${parnertId}` // todo - confirm with Hoang or Tuan the correct endpoint
    );

    return game?.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const getTotalGamesCount = async (params: any) => {
  try {
    const games = await axiosClient.post(`/game/count?partnerId=${params.partnerId}`, params);

    return games?.data?.data?.count || 0;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const getMostPopularGames = async (
  params: MostPopularGamesAPIParams
) => {
  try {
    const games = await axiosClient.post(`/game/most-popular?partnerId=${params.partnerId}`, {
      ...params,
    });

    return games?.data?.data?.items?.[0]?.gameName || "";
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const uploadGameThumbnailAPI = async (params: GameUploadImageAPIParams) => {
  try {
    const result = await axiosClient.post('/files/upload', params, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return result.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

export const updateGameAPI = async (params?: Partial<UpdateGameAPIPArams>) => {
  try {
    const games = await axiosClient.post(`/game/update`, { ...params });
    return games?.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};