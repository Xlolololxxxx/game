/**
 * Environment variables
 */

type ConfigValues = {
  API_BASE_URL: string;
  APP_CDN_URL: string;
  AUTH_USERNAME: string;
  AUTH_PASSWORD: string;
  NODE_ENV: string;
  PARTNER_ID: string | number;
  SITE: 'palmsplay' | 'fortune8' | 'gamezone' | 'palmssport';
  isPalmsPlay: boolean;
  isFortune8: boolean;
  isGameZone: boolean;
  CODE_GENERATOR_URL: string;
  isProd: () => boolean;
  isDev: () => boolean;
  isTest: () => boolean;
  logoUrl: string;
};

const {
  REACT_APP_URL,
  REACT_APP_CDN_URL,
  REACT_APP_AUTH_USERNAME,
  REACT_APP_AUTH_PASSWORD,
  REACT_APP_NODE_ENV,
  REACT_APP_PARTNER_ID,
  REACT_APP_SITE,
  REACT_APP_CODE_GENERATOR_URL,
} = process.env;

const Config = {
  API_BASE_URL: REACT_APP_URL,
  APP_CDN_URL: REACT_APP_CDN_URL,
  AUTH_USERNAME: REACT_APP_AUTH_USERNAME,
  AUTH_PASSWORD: REACT_APP_AUTH_PASSWORD,
  NODE_ENV: REACT_APP_NODE_ENV,
  PARTNER_ID: REACT_APP_PARTNER_ID,
  SITE: REACT_APP_SITE,
  CODE_GENERATOR_URL: REACT_APP_CODE_GENERATOR_URL,
  isPalmsPlay: REACT_APP_SITE === 'palmsplay',
  isFortune8: REACT_APP_SITE === 'fortune8',
  isGameZone: REACT_APP_SITE === 'gamezone',
  logoUrl: `/assets/${REACT_APP_SITE}-logo.svg`,
  isProd() {
    return REACT_APP_NODE_ENV === 'production';
  },
  isDev() {
    return REACT_APP_NODE_ENV === 'development';
  },
  isTest() {
    return REACT_APP_NODE_ENV === 'test';
  },
} as ConfigValues;

export default Config;
