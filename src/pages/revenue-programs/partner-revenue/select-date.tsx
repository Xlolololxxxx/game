import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '@src/components/iconify/Iconify';
import { generateMonthlyOptions } from '@src/utils/filter-helper';
import { useProgramsContext } from '../provider';

// ----------------------------------------------------------------------

export default function SelectDate(props: any) {
  const [open, setOpen] = useState(null);
  const { state } = useProgramsContext();
  const [selected, setSelected] = useState<string>();
  const handleOpen = (event: any) => setOpen(event.currentTarget);

  const handleClose = () => setOpen(null);

  useEffect(() => {
    if (state.prDate) {
      setSelected(state.prDate);
    }
  }, [state.prDate]);

  const onSelectionChange = (value: any) => {
    setOpen(null);
    setSelected(value.label);
    props.onChange(value);
  };

  return (
    <>
      <Button
        color="inherit"
        size={'large'}
        fullWidth
        sx={{
          display: 'flex',
          flex: 1,
          height: 56,
          justifyContent: 'space-between',
          border: 0.7,
          borderColor: 'rgba(0,0,0,0.2)',
          color: 'text.secondary',
        }}
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        <Box fontSize={{
          xl: "15px",
          lg: "15px",
          md: "12px",
          sm: "12px",
          xs: "12px",
        }}>
          Date:
          <Typography component="span" variant="subtitle2"
            fontSize={{
              xl: "15px",
              lg: "15px",
              md: "12px",
              sm: "12px",
              xs: "12px",
            }} sx={{ color: 'text.primary', marginLeft: 1, }}>
            {selected}
          </Typography>
        </Box>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {generateMonthlyOptions().map((option) => (
          <MenuItem
            key={option.label}
            selected={option.label === selected}
            onClick={() => onSelectionChange(option)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
