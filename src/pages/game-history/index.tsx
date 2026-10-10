/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import Body from './body';
import FilterSidebar from './filter';
import HistoryProvider from './provider';


export default function UserPage() {
  return (
    <HistoryProvider>
    <>
      <Helmet>
        <title> Game history </title>
      </Helmet>
      <Body />
      <FilterSidebar />
    </>
    </HistoryProvider>
  );
}
