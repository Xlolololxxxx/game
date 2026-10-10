import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
//
import customShadows from './customShadows';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }: any) {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
