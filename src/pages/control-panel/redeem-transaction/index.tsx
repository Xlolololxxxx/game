import { Helmet } from 'react-helmet-async';
import Header from './header';
import { Card, Container, Tab, Tabs } from '@mui/material';
import { CustomTabPanel } from '@src/pages/revenue-programs/body';
import RedeemProvider, { useRedeemTransactionsContext } from './provider';
import PendingRedemption from './pending-redemption';
import RedemptionHistory from './redemption-history';

export default function RedeemPage() {
  return (
    <RedeemProvider>
      <>
        <Helmet>
          <title> Redeem Transactions </title>
        </Helmet>
        <Header />
        <Components />
      </>
    </RedeemProvider>
  );
}

function Components() {
  const { state, onDispatch, handleClearFilters } = useRedeemTransactionsContext();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    handleClearFilters();
    onDispatch("currentTab")(newValue);
  };
  
  return (
    <Container>
      <Card sx={{borderRadius: "25px", px: {
        lg: "23px",
        xl: "23px",
      }, py: "10px", mt: 3}}>
        <Tabs
          value={state.currentTab || "pending"}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab value="pending" label="Pending Redemptions" />
          <Tab value="processing" label="Processing" />
          <Tab value="history" label="All Transactions" />
          <Tab value="exchange" label="Gold Exchange" />
        </Tabs>
        <CustomTabPanel value={state.currentTab} index={"pending"}>
          <PendingRedemption />
        </CustomTabPanel>
        <CustomTabPanel value={state.currentTab} index={"processing"}>
          <RedemptionHistory />
        </CustomTabPanel>
        <CustomTabPanel value={state.currentTab} index={"history"}>
          <RedemptionHistory />
        </CustomTabPanel>
        <CustomTabPanel value={state.currentTab} index={"exchange"}>
          <RedemptionHistory />
        </CustomTabPanel>
      </Card>
    </Container>
  );
}
