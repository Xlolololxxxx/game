import { Helmet } from 'react-helmet-async';
import Body from './body';
import CoinHistoryProvider from './provider';
import FilterSidebar from './filter';

export default function CoinHistory() {
  return (
    <CoinHistoryProvider>
      <>
        <Helmet>
          <title> Coin history </title>
        </Helmet>
        <Body />
        <FilterSidebar />
      </>
    </CoinHistoryProvider>
  );
}
