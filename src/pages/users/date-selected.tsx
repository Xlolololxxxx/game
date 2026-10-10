import { Avatar, Box, Typography } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import dayjs from 'dayjs';
import React from 'react';
import { useUsersContext } from './provider';

export default function DateSelected() {
  const { state,  handleOpenFilterSidebar } = useUsersContext();
  const dateDisplay = React.useMemo(() => {
    const fromDate = state.fromDate ? dayjs(state.fromDate).format("DD MMM YYYY") : "";
    const toDate = state.toDate ? dayjs(state.toDate).format("DD MMM YYYY") : "";
    return `${fromDate} - ${toDate}`
  }, [state.fromDate, state.toDate]);

  return (
    <>
      <Box
        onClick={handleOpenFilterSidebar}
        sx={{
          display: 'flex',
          width: {
            xl: 256,
            lg: 256,
            md: 256,
            sm: "100%",
            xs: "100%",
          },
          height: 56,
          gap: 1,
          bgcolor: "white",
          borderRadius: "10px",
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: "center",
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