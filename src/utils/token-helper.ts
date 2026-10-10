const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const PROVIDER_ID = "";
const EMAIL = 'email';

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const setEmail = (token: string): void => {
  localStorage.setItem(EMAIL, token);
};

export const getEmail = (): string | null => {
  return localStorage.getItem(EMAIL);
};

export const setProviderID = (id: string): void => {
  localStorage.setItem(PROVIDER_ID, id);
};

export const getProviderID = (): string | null => {
  return localStorage.getItem(PROVIDER_ID);
};
