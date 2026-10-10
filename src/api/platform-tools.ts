import { GetPartnerAPIParams } from "@src/lib/types/users";
import axiosClient from "@src/utils/axios-client";

export const mostPopularDealAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/platform/deals/most-popular", { params });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const mostPopularGoldShopItemAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/platform/gold-shop-items/most-popular", { params });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const mostPopularShopItemAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/platform/shop-items/most-popular", { params });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const totalSubscriptionsCountAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/platform/subscriptions/purchased/count", { params });
    return result?.data?.count || 0;
  } catch (error) {
    throw error;
  }
};

export const totalCompletedMissionsCountAPI = async (partnerId: any) => {
  try {
    const result = await axiosClient.get("/platform/missions/reward-claimed/count?partnerId=" + partnerId);
    return result?.data?.count || 0;
  } catch (error) {
    throw error;
  }
};

export const SubscriptionsChartAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/subscription/chart", { params });

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const PurchaseChartAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/payment/chart", { params });

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const MissionsActivityChartAPI = async (params: GetPartnerAPIParams) => {
  try {
    const result = await axiosClient.get("/platform/missions/weeks/chart", { params });

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const MissionsActivityTrackerAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get("/platform/missions", { params: requestParams });

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH USERS MISSIONS
export const MissionsActivityAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get("/platform/missions/weeks/users", { params: requestParams });

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH GOLD SHOP
export const GoldShopAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/gold-shop-items", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH GOLD SHOP TOTAL EXCHANGE
export const GoldShopTotalGoldExchangeAPI = async (params: any) => {
  try {
    const requestParams = {
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/gold-shop-items/stats", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH GOLD SHOP USER'S PURCHASE
export const GoldShopUsersPurchaseAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/gold-shop-items/users", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH SHOP DATA
export const ShopDataAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/shop-items", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH SHOP DATA STATS
export const ShopDataStatAPI = async (params: any) => {
  try {
    const requestParams = {
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/shop-items/stats", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH SHOP DATA USER'S PURCHASE
export const ShopDataUsersPurchaseAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/shop-items/users", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH PROMOTIONS DATA
export const PromotionsDataAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/deals", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH PROMOTIONS DATA STATS
export const PromotionsDataStatAPI = async (params: any) => {
  try {
    const requestParams = {
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/deals/stats", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

// FETCH PROMOTIONS DATA USER'S PURCHASE
export const PromotionsDataUsersPurchaseAPI = async (params: any) => {
  try {
    const requestParams = {
      page: 1,
      size: 10,
      ...params,
    };

    const result = await axiosClient.get(
      "/platform/deals/users", 
      { 
        params: requestParams
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const LeaderBoardRankingAPI = async (params: any) => {
  try {
    const result = await axiosClient.get("/leaderboard/users", { params });

    return result?.data;
  } catch (error) {
    throw error;
  }
};

