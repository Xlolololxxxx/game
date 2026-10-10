import { useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

type Props = {
  MOBILE?: any;
  TABLET?: any;
  LARGE?: any;
  XLARGE?: any;
  DEFAULT?: any;
  CUSTOM?: any;
};

const useScreenSizeHelper = (config: Props) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Small screens
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Tablets
  const isLargeSize = useMediaQuery(theme.breakpoints.between("lg", "xl")); // Large screens
  const isXLargeSize = useMediaQuery(theme.breakpoints.up("xl")); // Extra large screens

  return useMemo(() => {
    const defaultValue = config.DEFAULT || {};

    if (config.CUSTOM) {
      return config.CUSTOM;
    } else if (isMobile) {
      return config.MOBILE || defaultValue;
    } else if (isTablet) {
      return config.TABLET || defaultValue;
    } else if (isLargeSize) {
      return config.LARGE || defaultValue;
    } else if (isXLargeSize) {
      return config.XLARGE || defaultValue;
    } else {
      return defaultValue;
    }
  }, [config, isMobile, isTablet, isLargeSize, isXLargeSize]);
};

export const useMobileChecker = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Small screens
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Tablets

  return isMobile || isTablet;
};

export default useScreenSizeHelper;