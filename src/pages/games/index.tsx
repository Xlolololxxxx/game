/* eslint-disable react-hooks/exhaustive-deps */
import { useAccessControlContext } from '@src/context/AccessControl';
import { GameAccess } from '@src/lib/types/access-control';
import { pluck } from '@src/utils/pluck';
import _ from 'lodash';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GameHistory from "../game-history";
import Body from './body';
import GameDetailsDialog from './game-details';
import Header from './header';
import GamesProvider from './provider';

export default function Games() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("code");
  const { state: accessControlState } = useAccessControlContext();
  const gamesAccess: GameAccess = pluck(accessControlState, 'access.games');

  useEffect(() => {
    if(!gamesAccess?.allowViewList && gamesAccess?.allowGameActivity && _.isEmpty(code)){
      navigate('/', { replace: true });
    }
  },[code, gamesAccess]);

  return (
    <GamesProvider>
      {code ? 
        <GameHistory /> :
        <>
          <Helmet>
            <title> Games </title>
          </Helmet>
          <Header />
          <Body />
          <GameDetailsDialog />
        </>
      }
    </GamesProvider>
  );
}
