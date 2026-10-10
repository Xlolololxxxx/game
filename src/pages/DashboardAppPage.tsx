import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

// @mui
import { Container, Grid } from '@mui/material';

// sections
import { usePaymentsService } from '@src/store/hooks/usePaymentsService';
import {
  AppWidgetSummary,
  UserEngagementsChart,
} from '../sections/@dashboard/app';

import SvgColor from '@src/components/svg-color';
import { useAccessControlContext } from '@src/context/AccessControl';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { Access } from '@src/lib/types/access-control';
import palette from '@src/theme/palette';
import { fCurrency } from '@src/utils/formatNumber';
import { pluck } from '@src/utils/pluck';
import moment from 'moment';
import { useGamesService } from './games/hooks';
import MostPlayedGames from './most-played/mini-view';
import { useUsersService } from './users/hooks';

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const { state } = useAccessControlContext();
  const { partner } = usePartnerDropdownContext();
  const { totalPurchasesThisMonth } = usePaymentsService();
  const isPalmsPlay = partner === "palmsplay";
  const myAccess: Access['dashboard'] = pluck(state, 'access.dashboard');
  const { totalGames } = useGamesService({ getTotalGames: true, getMostPopularGame: true });
  const { totalUsers, totalUsersThisMonth } = useUsersService({ fetchTotalUsers: true, fetchTotalUsersThisMonth: true });

  const {
    allowViewTotalGames,
    allowViewTotalUsers,
    allowViewTotalNewUsersMonthly,
    allowViewTotalNumberOfPurchases,
    allowViewEngagementGraph
  } = myAccess || {};



  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid container 
          spacing={{
            xl: 3,
            lg: 3,
            md: 3,
            sm: 1.5,
            xs: 1.5
          }}>
          {allowViewTotalNumberOfPurchases && <Grid item xs={6} sm={6} md={3} >
            <AppWidgetSummary
              onClick={() => navigate('/dashboard/purchase')}
              title={isPalmsPlay ? "Total Palms Points (" + moment().format("MMMM") + ")" : "Purchases (" + moment().format("MMMM") + ")"}
              value={fCurrency(totalPurchasesThisMonth?.totalAmount)}
              color={isPalmsPlay ? palette.orangeYellow.main : palette.green.dark}
              icon={isPalmsPlay ? <SvgColor src={`/assets/icons/ic_palm_tree.svg`} sx={{ width: 24, height: 24 }} /> : "streamline:bag-dollar-solid"}
            />
          </Grid>}

          {allowViewTotalUsers && <Grid item xs={6} sm={6} md={3} >
            <AppWidgetSummary
              onClick={() => navigate('/dashboard/users')}
              title="Total Users"
              value={totalUsers}
              color={palette.DarkTurquoise.dark}
              icon={'fa-solid:users'}
            />
          </Grid>}

          {allowViewTotalNewUsersMonthly && <Grid item xs={6} sm={6} md={3} >
            <AppWidgetSummary
              onClick={() => navigate('/dashboard/users')}
              title="New Users This Month"
              value={totalUsersThisMonth}
              color={palette.peach.dark}
              icon={'mdi:users-plus'}
            />
          </Grid>}

          {allowViewTotalGames && <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              onClick={() => navigate('/dashboard/games')}
              title="Total Games"
              color={palette.blue.dark}
              value={totalGames}
              icon={'ion:game-controller'}
            />
          </Grid>}
        </Grid>
        {allowViewEngagementGraph && <UserEngagementsChart />}

        <MostPlayedGames />
      </Container>
    </>
  );
}
