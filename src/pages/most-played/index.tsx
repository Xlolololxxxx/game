import { Helmet } from 'react-helmet-async';
import GameDetailsDialog from '../games/game-details';
import GamesProvider from '../games/provider';
import Body from './body';
import MostPlayedFilterSidebar from './filter';
import MostPlayedProvider from './provider';

const MostPlayed = () => {

  return (
    <GamesProvider>
      <MostPlayedProvider>
        <>
          <Helmet>
            <title> Most Played </title>
          </Helmet>
          <Body />
          <GameDetailsDialog />
          <MostPlayedFilterSidebar />
        </>
      </MostPlayedProvider>
    </GamesProvider>
  );
}

export default MostPlayed;
