import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import Config from "./api/config";
import * as TokenHelper from "./token-helper";
import toasterEventEmitter, { TOASTER_EVENT } from "./event-emitter";

const exceptedRoutes = ['/user/portal/authenticate', '/user/create-portal-user/'];

const api = axios.create({
  baseURL: `${Config.API_BASE_URL}/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    timeout: 1000 * 10,
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await TokenHelper.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & {
      _retry: boolean;
    } = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !exceptedRoutes.includes(originalRequest.url || '')
    ) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await axios.post(
            `${Config.API_BASE_URL}/api/v1/user/portal/refresh-token`,
            {
              refreshToken: TokenHelper.getRefreshToken(),
            }
          );

          TokenHelper.setAccessToken(data.accessToken);
          TokenHelper.setRefreshToken(data.refreshToken);

          api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

          isRefreshing = false;
          onRrefreshed(data.accessToken);

          return api(originalRequest);
        } catch (refreshError: any) {
          isRefreshing = false;
          toasterEventEmitter.emit(TOASTER_EVENT, {
            type: 'error',
            title: 'Session Expired',
            message: 'Please login again.',
          });

          setTimeout(() => {
            window.location.replace("/login")
          }, 1000);

          throw refreshError;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          if (originalRequest.headers) originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
