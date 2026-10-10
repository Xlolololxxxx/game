import { Box, CircularProgress, Grid } from '@mui/material';
import _ from 'lodash';
import numeral from 'numeral';
import { useProgramsService } from './hooks';
import Items from './items';

const DataSection = () => {
  const {data, result, isLoading } = useProgramsService();

  console.log("result", data)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (_.isEmpty(result)) {
    return null;
  }

  return (
    <>
    <Box >
      <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={6} >
          <Items title="Provider Name" value={result.providerName?.trim() as string} />
        </Grid>
        <Grid item xs={6} >
          <Items title="Revenue Share Percentage" value={numeral(result.revenueSharePercentThisGame).format("0,000.00")} />
        </Grid>
        <Grid item xs={6} >
          <Items title={`${result.providerName}: Total Bet`} value={numeral(result.totalBetThisGame).format("0,000")} />
        </Grid>
        <Grid item xs={6} >
          <Items title="All Game: Total Bet" value={numeral(result.totalBetAllGame).format("0,000")} />
        </Grid>
        <Grid item xs={6} >
          <Items title="Gross Revenues" value={numeral(result.totalPurchase).format("0,000.00")} />
        </Grid>
        <Grid item xs={6} >
          <Items title="Commission Due" value={numeral(result.totalCommissionThisGame).format("0,000.00")} />
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default DataSection;
