import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useCreateMailContext } from './provider';
import { styles } from './styles.css';

function AdvanceSection() {
  const { state, onDispatch } = useCreateMailContext();

  const onPress= () => {
    onDispatch("isActionButtonEnabled")(!state.isActionButtonEnabled);
    window.scrollTo(0, 7000);
  }

  return (
    <Box sx={styles.box_advance} >
      <Typography color="white">
        ADVANCE SETTINGS
      </Typography>
      <Stack onClick={onPress} 
        direction={"row"} gap="1.3rem">
        {state.isActionButtonEnabled && <Typography color="white">
          PLEASE SELECT 1 OPTION
        </Typography>}
        {state.isActionButtonEnabled ? 
          <ExpandLessIcon sx={{color: "white"}}/> : 
          <ExpandMoreIcon sx={{color: "white"}}/>}
      </Stack>
    </Box>
  );
}

export default React.memo(AdvanceSection);