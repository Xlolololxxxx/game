import { Helmet } from 'react-helmet-async';
import Body from './body';
import HistoryProvider from './provider';

function InMailPortal() {
  return (
    <HistoryProvider>
    <>
      <Helmet>
        <title> In Mail Portal </title>
      </Helmet>
      <Body />
    </>
    </HistoryProvider>
  );
}

export default InMailPortal;
