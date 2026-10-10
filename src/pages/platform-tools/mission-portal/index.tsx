import { Helmet } from 'react-helmet-async';
import Body from './body';
import MissionProvider from './provider';

function MissionPortal() {
  return (
    <MissionProvider>
    <>
      <Helmet>
        <title> Mission Portal </title>
      </Helmet>
      <Body />
    </>
    </MissionProvider>
  );
}

export default MissionPortal;
