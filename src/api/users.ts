import {
  GetActiveUsersAPIParams,
  GetAllUsersParams,
  UpdateUserDetailsAPIParams,
  UpdateUserPasswordAPIParams,
  UsersAPIParams,
  UsersDemographicRequestType,
} from "@src/lib/types/users";
import axiosClient from "@src/utils/axios-client";

export const allUsersAPI = async (params?: GetAllUsersParams) => {
  try {
    const requestParams = {
      size: 10,
      sort: "enrollmentDate,desc",
      ...params,
    };
    const users = await axiosClient.post("/user/getAll?partnerId=" + params?.partnerId, requestParams);
    return users.data.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const totalActiveUsersAPI = async (params: any) => {
  try {
    const users = await axiosClient.get("/user-accesses/users/count", {
      params
    });
    return users?.data?.count || 0;
  } catch (error) {
    throw error;
  }
};

export const totalActiveSessionThisMonthAPI = async (params: any) => {
  try {
    const users = await axiosClient.get("/user-accesses/sessions/count", {
      params
    });
    return users?.data?.count || 0;
  } catch (error) {
    throw error;
  }
};

export const totalUsersAPI = async (partnerId: any, params?: UsersAPIParams) => {
  try {
    const users = await axiosClient.post("/user/count?partnerId=" + partnerId, params);
    return users?.data?.data?.count || 0;
  } catch (error) {
    throw error;
  }
};

export const updateUserDetailsAPI = async (params: UpdateUserDetailsAPIParams) => {
  try {
    const res = await axiosClient.post("/user/updateUserDetails", params);
    return res;
  } catch (error) {
    throw error;
  }
};

// TODO: update params type
export const updateUserBalanceAPI = async (params: any) => {
  try {
    const res = await axiosClient.post("/user/adjustBalance", params);
    return res;
  } catch (error) {
    throw error;
  }
};

// TODO: update params type
export const updateUserTierLevelAPI = async (params: any) => {
  try {
    const res = await axiosClient.post("/user/updateTier", params);
    return res;
  } catch (error) {
    throw error;
  }
};

// TODO: update params type
export const exportUsersListAPI = async (params?: GetAllUsersParams) => {
  try {
    const requestParams = {
      sort: "enrollmentDate,desc",
      ...params,
    };

    const res = await axiosClient.post("/user/getAll/noPaging?partnerId=" + params?.partnerId, requestParams);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUsersDemographicBy = async (
  category: UsersDemographicRequestType,
  partnerId: any
) => {
  try {
    const res = await axiosClient.get(`/user/demographics/${category}`, { params: { partnerId}});
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordAPI = async (params: UpdateUserPasswordAPIParams) => {
  try {
    const res = await axiosClient.post('/user/update-password', params);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getActiveUsersAPI = async (params?: GetActiveUsersAPIParams) => {
  try {
    const res = await axiosClient.get("/user-accesses/sessions", { params });
    return res.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
}