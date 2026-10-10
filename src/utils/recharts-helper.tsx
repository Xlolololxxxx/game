import { useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

const useYAxisWidth = (data: any[]): any => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Small screens
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Tablets
  const isLargeSize = useMediaQuery(theme.breakpoints.between("lg", "xl")); // Large screens
  const isXLargeSize = useMediaQuery(theme.breakpoints.up("xl")); // Extra large screens

  return useMemo(() => {
    let yaxis_width = 11;

    if (isMobile) {
      yaxis_width = 6;
    } else if (isTablet) {
      yaxis_width = 8;
    } else if (isLargeSize) {
      yaxis_width = 9;
    } else if (isXLargeSize) {
      yaxis_width = 11;
    }

    const maxValue = Math.max(...data.map((d) => d.value)); // Find the largest value
    const digitCount = maxValue.toString().length; // Count the number of digits
    const forceCount = digitCount < 3 ? 3 : digitCount;
    
    return forceCount * yaxis_width; // Default width
  }, [data, isMobile, isTablet, isLargeSize, isXLargeSize]);
};

export const CustomMultiLineTick = ({ x, y, payload, fontSize }: any) => {
  const lines = payload.value.split(/[\s-]/); // Customize how to split your dates

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line: any, index: number) => (
        <text
          key={index}
          x={0}
          y={index * 12 + 10} // spacing between lines
          textAnchor="middle"
          fontSize={fontSize}
          fill="#666"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

export default useYAxisWidth;
