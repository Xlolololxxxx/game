import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '@src/components/iconify/Iconify';
import useGameProviders from '@src/hooks/useGameProviders';
import { useProgramsContext } from '../provider';

// ----------------------------------------------------------------------

export default function ProviderName(props: any) {
  const [open, setOpen] = useState(null);
  const { state } = useProgramsContext();
  const { gameProviders } = useGameProviders();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (state.gprProviderName) {
      setSelected(state.gprProviderName);
    }
  }, [state.gprProviderName]);

  const handleOpen = (event: any) => setOpen(event.currentTarget);

  const handleClose = () => setOpen(null);

  const onSelectionChange = (value: any) => {
    setOpen(null);
    setSelected(value.name);
    props.onChange(value.name);
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
          Provider Name:
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
        {gameProviders.map((option) => (
          <MenuItem
            key={option.name}
            selected={option.name === selected}
            onClick={() => onSelectionChange(option)}
            sx={{ typography: 'body2' }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
