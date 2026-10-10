import { Box } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Iconify from '@src/components/iconify';
import React from 'react';

interface Props {
  label: string;
  tooltipMessage: string;
}

export default function TooltipLabel(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
      <Box display={"flex"} alignItems={"center"} gap={0.7}>
        {props.label}
        <Tooltip 
          open={open} 
          onClose={handleClose} 
          onOpen={handleOpen} 
          title={props.tooltipMessage}
          arrow
          slotProps={{
            popper: {
              sx: { 
                [`& .${tooltipClasses.tooltip}`]: {
                  backgroundColor: "#4990EF",
                  color: 'white',
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: 1.5,
                  paddingBottom: 1.5,
                  fontSize: 11,
                },
              }
            }
          }}>

          <Iconify icon="ep:info-filled" color="#2F80ED" width={18} height={18} />
       </Tooltip>
    </Box>
  )
}
