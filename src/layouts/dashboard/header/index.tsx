import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dropdown } from '@src/components/dropdown';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import useActivePartner from '@src/hooks/useActivePartner';
import { PartnerDropdownContextStateType } from '@src/lib/types/partner-provider';
import { AdditionalAccess } from '@src/utils/drawer-list';
import { findTitleByPath } from '@src/utils/filter-helper';
import { useMobileChecker } from '@src/utils/screensize-helper';
import PropTypes from 'prop-types';
import Config from '@src/utils/api/config';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Iconify from '../../../components/iconify';
import HeaderProvider from './provider';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 90;
const HEADER_DESKTOP = 92;
const StyledRoot = styled(AppBar)(({ theme }): any => ({
  boxShadow: 'none',
  backgroundColor: "white",
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

const { isFortune8 } = Config;

export default function Header({ onOpenNav }: any) {
  const location = useLocation();
  const isMobile = useMobileChecker();
  const { partners } = useActivePartner();
  const { state, handleSelectPartner } = usePartnerDropdownContext();
  const title = React.useMemo(() => {
    return findTitleByPath(AdditionalAccess, location.pathname);
  }, [location]);

  return (
    <HeaderProvider>
      <StyledRoot>
        <StyledToolbar >
          <Box
            sx={{
              width: "auto",
              height: 60,
              display: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: 'inline-flex',
                xs: 'inline-flex',
              },
            }}
          >
            <img
              alt=""
              src={`/assets/logo.png`} />
          </Box>
          <Stack
            width={"100%"}
            alignItems={{
              xl: "flex-start",
              lg: "flex-start",
              md: "flex-start",
              sm: "center",
              xs: "center",
            }}
            >
            <Typography variant="h4" sx={{ color: "#343C6A", textTransform: 'capitalize' }}>
              {title}
            </Typography>
             {isFortune8 && isMobile && <Box sx={{ }}>
              <Dropdown
                fullWidth={false}
                variant={"standard"}
                placeholder='Select a Partner'
                items={partners}
                defaultSelected={state.selectedPartnerId as unknown as PartnerDropdownContextStateType}
                onSelect={handleSelectPartner}
                sx={{
                  '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                    borderBottom: 'none',
                    color: "red",
                  },
                  '& .MuiSelect-select': {
                    fontFamily: "Inter",
                    color: '#1D47C9',
                    fontWeight: "700"
                  },
                  '& .MuiSelect-icon': {
                    color: '#1D47C9', // Arrow icon color
                  },
                }}
              />
            </Box>}
          </Stack>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary',
              display: { lg: 'none' },
            }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        </StyledToolbar>
      </StyledRoot>
    </HeaderProvider>
  );
}
