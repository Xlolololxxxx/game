import { Helmet } from 'react-helmet-async';
import Body from './body';
import MissionProvider from './provider';
import FilterSidebar from './filter';

function MissionPortal() {
  return (
    <MissionProvider>
    <>
      <Helmet>
        <title> Code Generator </title>
      </Helmet>
      <Body />
      <FilterSidebar />
    </>
    </MissionProvider>
  );
}

export default MissionPortal;
