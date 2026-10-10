import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// @mui
import { Box, Drawer, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// hooks
import { useAccessControlContext } from '@src/context/AccessControl';
import useResponsive from '@src/hooks/useResponsive';

// components
import { Dropdown } from '@src/components/dropdown';
import Logo from '@src/components/logo';
import NavSection from '@src/components/nav-section';
import Scrollbar from '@src/components/scrollbar';
import UpdateUserDetails from '@src/components/update-user-details';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import useActivePartner from '@src/hooks/useActivePartner';
import { ControlPanelAccess, DashboardAccess, GameAccess, MarketingToolsAccess, MostPlayedAccess, PlatformToolsAccess, PurchasesAccess, RedeemTransactionsAccess, RevenueShareAccess, SettingsAccess, UsersAccess } from '@src/lib/types/access-control';
import { PartnerDropdownContextStateType } from '@src/lib/types/partner-provider';
import { useAuthService } from '@src/store/hooks';
import Config from '@src/utils/api/config';
import { FullAccess } from '@src/utils/drawer-list';
import { hasPathIncluded } from '@src/utils/filter-helper';
import { pluck } from '@src/utils/pluck';
import packageJson from '../../../../package.json';
import AccountMenu from './AccountMenu';

const { isFortune8 } = Config;

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 1.6),
  paddingRight: "5px",
  border: "1px solid",
  backgroundColor: "#1F3263",
  borderColor: "#5670B2",
  borderRadius: Number(theme.shape.borderRadius),
}));

type Route = {
  title: string;
  path: string;
  icon?: JSX.Element;
  isSpacer?: boolean;
  children?: Route[];
}

const Nav = ({ openNav, onCloseNav }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<any>(null);
  const { pathname } =  useLocation();
  const { partners } = useActivePartner();
  const isDesktop = useResponsive('up', 'lg');
  const { currentUser, onLogout } = useAuthService();
  const { state: accessControlState } = useAccessControlContext();
  const { state, partner, handleSelectPartner } = usePartnerDropdownContext();
  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState<boolean>(false);
  const gamesAccess: GameAccess = pluck(accessControlState, 'access.games');
  const mostPlayedAccess: MostPlayedAccess = pluck(accessControlState, 'access.mostPlayed');
  const revenueShareAccess: RevenueShareAccess = pluck(accessControlState, 'access.revenueShare');

  const filteredRoutes = useMemo(() => {
    if (!accessControlState) return FullAccess;

    const dashboardAccess: DashboardAccess = pluck(accessControlState, 'access.dashboard');
    const usersAccess: UsersAccess = pluck(accessControlState, 'access.users');
    const purchasesAccess: PurchasesAccess = pluck(accessControlState, 'access.purchases');
    const platformToolsAccess: PlatformToolsAccess = pluck(accessControlState, 'access.platformTools');
    const marketingToolsAccess: MarketingToolsAccess = pluck(accessControlState, 'access.marketingTools');
    const redeemTransactionsAccess: RedeemTransactionsAccess = pluck(accessControlState, 'access.redeemTransactions');
    const controlPanelAccess: ControlPanelAccess = pluck(accessControlState, 'access.controlPanel');
    const settingsAccess: SettingsAccess = pluck(accessControlState, 'access.settings');

    const hasAccessToAllWidgets = dashboardAccess && Object.values(dashboardAccess).filter(p => p === true).length > 0;
    const hasControlPanelAccess = controlPanelAccess?.allowViewTeam || controlPanelAccess?.allowViewPartnersList || controlPanelAccess?.allowViewLicenseKeys;
    const hasSettingsAccess = settingsAccess?.allowViewDetails || settingsAccess?.allowUpdateBusinessDetails || settingsAccess?.allowViewTermsAndConditions || settingsAccess?.allowViewPortalGuide;
    const hasPlatformToolsAccess = platformToolsAccess?.allowQuickViewData || platformToolsAccess?.allowMails || platformToolsAccess?.allowMissions;

    const routesArr: Route[] = [];

    FullAccess.forEach((route) => {
      const tempRoute = { ...route };

      if (
        (route.title === 'dashboard' && hasAccessToAllWidgets) ||
        (route.title === 'games' && gamesAccess?.allowDrawer) ||
        (route.title === 'users' && usersAccess?.allowViewList) ||
        (route.title === 'most played' && mostPlayedAccess?.allowDrawer) ||
        (route.title === 'purchases' && purchasesAccess?.allowViewList) ||
        (route.title === 'revenue program' && revenueShareAccess?.allowView) ||
        (route.title === 'redeem transaction' && redeemTransactionsAccess?.allowView) ||
        (route.title === 'logout' && true)
      ) {
        routesArr.push(tempRoute);
      }

      if ((route.title === 'platform tools') && hasPlatformToolsAccess) {
        const tempRouteItem = {
          ...route,
          children: route.children?.filter((routeChild) => {
            return (routeChild.title === 'overview' && platformToolsAccess?.allowQuickViewData) ||
              (routeChild.title === 'in mail portal' && platformToolsAccess?.allowMails) ||
              (routeChild.title === 'missions' && platformToolsAccess?.allowMissions);
          }),
        };

        routesArr.push(tempRouteItem);
      }

      if (route.title === 'marketing tools' && marketingToolsAccess?.allowCodeGenerator) {
        const tempRouteItem = {
          ...route,
          children: route.children?.filter((routeChild) => {
            return (routeChild.title === 'code generator' && marketingToolsAccess?.allowCodeGenerator);
          }),
        };

        routesArr.push(tempRouteItem);
      }

      if ((route.title === 'control panel' && hasControlPanelAccess)) {
        const tempRouteItem = {
          ...route,
          children: route.children?.filter((routeChild) => {
            return (routeChild.title === 'manage team' && controlPanelAccess?.allowViewTeam) ||
              (routeChild.title === 'partners' && controlPanelAccess?.allowViewPartnersList && partner === "fortune8") ||
              (routeChild.title === 'licenses' && controlPanelAccess?.allowViewLicenseKeys && partner === "fortune8");
          }),
        };

        routesArr.push(tempRouteItem);
      }

      if (route.title === 'settings' && hasSettingsAccess) {
        const tempRouteItem = {
          ...route,
          children: route.children?.filter((routeChild) => {
            return (routeChild.title === 'update user details' && true) ||
              (routeChild.title === 'company profile' && settingsAccess?.allowViewDetails) ||
              (routeChild.title === 'terms & conditions' && settingsAccess?.allowViewTermsAndConditions && partner === "fortune8") ||
              (routeChild.title === 'portal guide' && settingsAccess?.allowViewPortalGuide) ||
              (routeChild.title === 'contact support' && settingsAccess?.allowViewPortalGuide);
          }),
        };

        routesArr.push(tempRouteItem);
      }
    });

    return routesArr;
  }, [accessControlState, mostPlayedAccess, gamesAccess, revenueShareAccess, partner]);

  const handleCloseMenu = () => setOpen(null);

  const handleToggleUserDialog = (value?: boolean | undefined) => {
    if (typeof value === 'boolean') setOpenUpdateUserDialog(value);
    if (!value) setOpenUpdateUserDialog((prev) => !prev);
  };

  const handleLogout = () => {
    setOpen(null);
    onLogout();
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }

    if(pathname && filteredRoutes.length > 2){
      if(pathname === '/dashboard/mostplayed' && mostPlayedAccess?.allowViewList){
        return;
      }else if(pathname === '/dashboard/games' && gamesAccess?.allowGameActivity){
        return;
      }else if(pathname === '/dashboard/programs/update' && revenueShareAccess?.allowUpdate){
        return;
      }else if(pathname === '/dashboard/users/report/game-history' && gamesAccess?.allowGameActivity){
        return;
      }else if(pathname === '/dashboard/users/report/coin-history'){
        return;
      }else if(pathname === '/dashboard/platform-tools/mission-data'){
        return;
      }else if(pathname === '/dashboard/platform-tools/most-popular-deal'){
        return;
      }else if(pathname === '/dashboard/platform-tools/gold-shop-data'){
        return;
      }else if(pathname === '/dashboard/platform-tools/shop-data'){
        return;
      }
      
      if(!hasPathIncluded(filteredRoutes, pathname)){
        navigate(filteredRoutes[0].path, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, filteredRoutes, mostPlayedAccess, gamesAccess]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        bgColor: "red",
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 3, pt: 4, pb: 2, display: 'flex', justifyContent: "center", alignSelf: "center" }}>
        <Logo />
      </Box>
      <Box sx={{ mx: 3 }}>
        <StyledAccount>
          <Box>
            <Typography variant="subtitle2" sx={{ color: 'white' }}>
              {currentUser?.displayName}
            </Typography>
          </Box>
        </StyledAccount>
        {isFortune8 && <Box sx={{ py: 2, width: '100%' }}>
          <Dropdown
            placeholder='Select a Partner'
            items={partners}
            defaultSelected={state.selectedPartnerId as unknown as PartnerDropdownContextStateType}
            onSelect={handleSelectPartner}
          />
        </Box>}
      </Box>
      <NavSection data={filteredRoutes} />
      <Box sx={{ flexGrow: 1, paddingBottom: "50px" }} />
      <Box display={"flex"} 
        width="100%"
        height={"40px"}
        bgcolor={"#0C193A"} 
        position={"absolute"} 
        alignSelf={"flex-end"} 
        justifyContent={"center"}
        bottom={0} 
        color="white"
        alignItems={"center"}
        fontSize={11}
        alignContent={"center"}>
          Version {packageJson.version}
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#0C193A',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          anchor='right'
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH, bgcolor: '#0C193A', },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      <AccountMenu
        open={open}
        handleClose={handleCloseMenu}
        handleOpenUserDialog={() => handleToggleUserDialog(true)}
        handleLogout={handleLogout}
      />
      <UpdateUserDetails
        open={openUpdateUserDialog}
        handleClose={() => handleToggleUserDialog()}
      />
    </Box>
  );
}

export default React.memo(Nav);
