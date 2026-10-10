import { SignupFormValues, VerifyUserFormValues } from "@src/lib/types/auth";
import Config from "@src/utils/api/config";
import * as Types from "@src/utils/api/types";
import axiosClient from "@src/utils/axios-client";
import * as TokenUtils from "@src/utils/token-helper";

export const checkAuthAPI = async () => {
  try {
    const refreshToken = TokenUtils.getRefreshToken();

    if (!refreshToken) throw new Error("No refresh token found");

    const { data } = await axiosClient.post("/user/portal/refresh-token", {
      refreshToken,
    });

    TokenUtils.setAccessToken(data.accessToken);
    TokenUtils.setRefreshToken(data.refreshToken);

    const { data: userDetails } = await axiosClient.get("/user/details");

    return {
      ...data,
      ...userDetails,
    };
  } catch (error: any) {
    throw error;
  }
};

export const loginAPI = async (params: Types.LoginValue) => {
  try {
    // pre-auth
    const authReq = await axiosClient.post("/user/portal/authenticate", {
      partnerId: Config.PARTNER_ID ? Number(Config.PARTNER_ID) : null,
      ...params,
    });

    const { accessToken, refreshToken } = authReq.data ?? {};

    TokenUtils.removeAccessToken();
    TokenUtils.removeRefreshToken();

    await new Promise((resolve) => setTimeout(resolve, 500));

    TokenUtils.setAccessToken(accessToken);
    TokenUtils.setRefreshToken(refreshToken);

    const { data } = await axiosClient.post("/user/adminlogin", {
      partnerId: Config.PARTNER_ID ? Number(Config.PARTNER_ID) : null,
      ...params,
    });

    return { ...data.data, accessToken, refreshToken };
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signupAPI = async (params: SignupFormValues) => {
  try {
    const result = await axiosClient.post("/user/create-portal-user", params);
    return result;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

export const forgotPasswordAPI = async (params: Types.ForgotPasswordValue) => {
  try {
    const req = await axiosClient.post("/user/reset-password/send-email-portal", {
      partnerId: Config.PARTNER_ID ? Number(Config.PARTNER_ID) : null,
      ...params,
    });

    return req.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const resetPasswordAPI = async (params: Types.ResetPasswordValue) => {
  try {
    const req = await axiosClient.post("/user/reset-password/update", params);
    return req.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const verifyUserAPI = async (params: VerifyUserFormValues) => {
  try {
    const req = await axiosClient.post("/user/verify-portal-user", params);
    return req.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const signoutAPI = async () => {
  try {
    await axiosClient.post("/user/sign-out");
  } catch (error: any) {
    throw error.response.data.error;
  }
}