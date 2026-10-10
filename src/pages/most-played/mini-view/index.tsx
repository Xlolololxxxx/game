/* eslint-disable react-hooks/exhaustive-deps */

// @mui

// components

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Button, Stack, Typography } from '@mui/material';
import GamesProvider from '../../games/provider';
import TransactionProvider from '../provider';
import Body from './body';
import { useNavigate } from 'react-router-dom';

const MostPlayedGames = () => {
  const navigate = useNavigate();

  return (
    <TransactionProvider>
      <GamesProvider>
        <>
        <Stack direction={"row"} justifyContent={"space-between"} mt={5} mb={2}>
          <Typography variant="h5">
            Most Played Games
          </Typography>
          <Button variant='outlined'
            onClick={() => navigate('/dashboard/mostplayed?sort=desc&sortBy=totalSilverBet')}
            sx={{outlineColor: "#CDD9E8", color: "#64748B"}} endIcon={<ChevronRightOutlinedIcon />}>
            View All
          </Button>
        </Stack>
        <Body />
        </>
      </GamesProvider>
    </TransactionProvider>
  );
};

export default MostPlayedGames;