import { Avatar, Box, Typography } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import dayjs from 'dayjs';
import React from 'react';
import { useLeaderBoardContext } from './provider';
import moment from 'moment';

export default function DateSelected() {
  const { state,  handleOpenFilterSidebar } = useLeaderBoardContext();
  const dateDisplay = React.useMemo(() => {
    const weekNumber = moment().isoWeek();
    const year = moment().isoWeekYear();
    const fromDate = state.fromDate ? dayjs(state.fromDate).format("MMMM DD") : dayjs().format("MMMM DD");
    const week = state.fromDate ? `Week ${state.week} / ${state.year}` : `Week ${weekNumber} / ${year}`;
    return `${fromDate} - ${week}`
  }, [state.fromDate, state.week, state.year]);

  return (
    <>
      <Box
        onClick={handleOpenFilterSidebar}
        sx={{
          display: 'flex',
          width: {
            xl: 238,
            lg: 238,
            md: 238,
            sm: "100%",
            xs: "100%",
          },
          height: 56,
          gap: 1,
          bgcolor: "white",
          borderRadius: "10px",
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Avatar sx={{ bgcolor: "rgba(45, 156, 219, 0.15)" }}>
          <Iconify
            icon={"lucide:calendar"}
            color="#2D9CDB"
            width={22}
          />
        </Avatar>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant='body1' fontWeight={"600"} >Filter Period</Typography>
          <Typography variant='body1' fontSize={10} >
            {dateDisplay}
          </Typography>
        </Box>
        <Iconify
          icon={"ic:baseline-expand-more"}
          color="#B9BBBD"
          width={25}
        />
      </Box>
    </>
  );
};