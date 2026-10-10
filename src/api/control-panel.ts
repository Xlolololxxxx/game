import axiosClient from "@src/utils/axios-client";

export const inviteTeamMemberAPI = async (params?: any) => {
  try {
    const result = await axiosClient.post(`/user/invite-portal-user`, {
      ...params,
    });
    return result;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const deleteTeamMemberAPI = async (params?: any) => {
  try {
    const result = await axiosClient.delete(`/user/delete-portal-user`, {
      params,
      data: params,
    });
    return result;
  } catch (error: any) {
    throw error.response.data.error;
  }
};
