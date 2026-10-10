import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import { useAccessControlContext } from './context/AccessControl';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import HomeLayout from './layouts/home';
import SimpleLayout from './layouts/simple/SimpleLayout';
import DashboardAppPage from './pages/DashboardAppPage';
import Page404 from './pages/Page404';
import AccountVerification from './pages/account-verification';
import ForgotPasswordPage from './pages/auth/password/forgot';
import ForgotPasswordSuccessPage from './pages/auth/password/forgot-success';
import ResetPasswordPage from './pages/auth/password/reset';
import ResetPasswordSuccessPage from './pages/auth/password/reset-success';
import LoginPage from './pages/auth/signin';
import SignupPage from './pages/auth/signup';
import SignupSuccess from './pages/auth/signup/success';
import CoinHistory from './pages/coin-history';
import ManageLicenses from './pages/control-panel/manage-licenses';
import ManagePartners from './pages/control-panel/manage-partners';
import ManageTeam from './pages/control-panel/manage-team';
import Redeem from './pages/control-panel/redeem-transaction';
import GameHistory from './pages/game-history';
import Games from './pages/games';
import CodeGenerator from './pages/marketing-tools/code-generator';
import MostPlayed from './pages/most-played';
import GoldShopData from './pages/platform-tools/gold-shop-data';
import InMailPortal from './pages/platform-tools/in-mail-portal';
import MissionData from './pages/platform-tools/mission-data';
import MissionPortal from './pages/platform-tools/mission-portal';
import MostPopularDeal from './pages/platform-tools/most-popular-deal';
import PlatformTools from './pages/platform-tools/overview';
import ShopData from './pages/platform-tools/shop-data';
import Purchase from './pages/purchase';
import Programs from './pages/revenue-programs';
import UpdatePercentageShare from './pages/revenue-programs/update-percentage-share';
import CompanyProfile from './pages/settings/company-profile';
import ContactSupport from './pages/settings/contact-support';
import PortalGuide from './pages/settings/portal-guide';
import TermsAndConditions from './pages/settings/terms-and-conditions';
import UserDetails from './pages/settings/user-details';
import UsersPage from './pages/users';
import Config from './utils/api/config';
import { getAccessToken } from './utils/token-helper';

const { isFortune8, isPalmsPlay } = Config;

type ProtectedRouteProps = {
  element: JSX.Element;
  isAllowed: boolean | undefined;
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAllowed, redirectTo = "/dashboard" }) => {
  if (typeof isAllowed === 'undefined') return element;

  return isAllowed ? element : <Navigate to={redirectTo} />;
};

export default function Router() {
  useQuery({
    queryKey: ['current-user'],
  });

  const { state } = useAccessControlContext();
  const { access } = state || {};

  const isLoggedIn = getAccessToken();

  const routing = React.useMemo(() => {
    if (isLoggedIn) {
      return [
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: 'app', element: <DashboardAppPage /> },
            { path: 'games', element: <Games /> },
            { path: 'games/history', element: <GameHistory /> },
            { path: 'in-mail-portal', element: <InMailPortal /> },
            {
              path: 'programs',
              element: <SimpleLayout />,
              children: [
                {
                  element: (
                    <ProtectedRoute
                      element={<Programs />}
                      isAllowed={access?.revenueShare?.allowView}
                    />
                  ),
                  index: true
                },
                { path: 'update', element: <UpdatePercentageShare /> },
              ]
            },
            { path: 'users', element: <UsersPage /> },
            { path: 'purchase', element: <Purchase /> },
            {
              path: 'platform-tools',
              element: <SimpleLayout />,
              children: [
                { element: <Navigate to="/dashboard/platform-tools/overview" />, index: true },
                { path: 'overview', element: <PlatformTools /> },
                { path: 'in-mail-portal', element: <InMailPortal /> },
                { path: 'missions', element: <MissionPortal /> },
                { path: 'mission-data', element: <MissionData /> },
                { path: 'gold-shop-data', element: <GoldShopData /> },
                { path: 'shop-data', element: <ShopData /> },
                { path: 'most-popular-deal', element: <MostPopularDeal /> },
              ]
            },
            {
              path: 'marketing-tools',
              element: <SimpleLayout />,
              children: [
                { element: <Navigate to="/dashboard/marketing-tools/code-generator" />, index: true },
                { path: 'code-generator', element: <CodeGenerator /> },
              ]
            },
            { path: 'mostplayed', element: <MostPlayed /> },
            {
              path: 'control-panel',
              element: <SimpleLayout />,
              children: [
                { index: true },
                {
                  path: 'redeem',
                  element: (
                    <ProtectedRoute
                      element={<Redeem />}
                      isAllowed={isPalmsPlay || access?.redeemTransactions?.allowView}
                    />
                  )
                },
                { path: 'team', element: <ManageTeam /> },
                {
                  path: 'partners',
                  element: (
                    <ProtectedRoute
                      element={<ManagePartners />}
                      isAllowed={isFortune8}
                    />
                  )
                },
                {
                  path: 'licenses',
                  element: (
                    <ProtectedRoute
                      element={<ManageLicenses />}
                      isAllowed={isFortune8}
                    />
                  )
                },
              ]
            },
            {
              path: 'settings',
              element: <SimpleLayout />,
              children: [
                { element: <Navigate to="/dashboard/settings/company-profile" />, index: true },
                { path: 'user-details', element: <UserDetails /> },
                { path: 'company-profile', element: <CompanyProfile /> },
                {
                  path: 'terms-and-conditions',
                  element: (
                    <ProtectedRoute
                      element={<TermsAndConditions />}
                      isAllowed={isFortune8}
                    />
                  )
                },
                { path: 'portal-guide', element: <PortalGuide /> },
                { path: 'contact-support', element: <ContactSupport /> },
              ]
            },
          ],
        },
        {
          path: '/dashboard/users/report',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/users/report/game-history" />, index: true },
            { path: 'game-history', element: <GameHistory /> },
            { path: 'coin-history', element: <CoinHistory /> },
          ],
        },
        {
          path: '/dashboard/game/report',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/game/report/game-activity" />, index: true },
            { path: 'game-activity', element: <GameHistory /> },
          ],
        },
        {
          element: <SimpleLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: '404', element: <Page404 /> },
            { path: '*', element: <Navigate to="/dashboard" /> },
          ],
        }
      ];
    }

    return [{
      element: <HomeLayout />,
      children: [
        { path: 'login', element: <LoginPage />, index: true },
        { path: 'signup', element: <SignupPage /> },
        { path: 'signup/success', element: <SignupSuccess /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'forgot-password-success', element: <ForgotPasswordSuccessPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> },
        { path: 'reset-password-success', element: <ResetPasswordSuccessPage /> },
        { path: 'verify-account', element: <AccountVerification /> },
        { path: '/login/*', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/login" /> },
      ],
    }];
  }, [isLoggedIn, access]);

  const routes = useRoutes(routing);

  return routes;
}
