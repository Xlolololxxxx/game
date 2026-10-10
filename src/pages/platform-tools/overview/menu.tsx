import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Iconify from '@src/components/iconify';
import { GRAPH_PERIOD_OPTIONS } from '@src/utils/mockdata/menu-options';
import * as React from 'react';

type Props = {
  value?: string;
  handleChange: (value: string) => void;
}

export default function PositionedMenu(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const selected = React.useMemo(() => {
    return GRAPH_PERIOD_OPTIONS.find(item => item.value === props.value)?.label;
  },[props.value]);

  const handleClose = (value: string) => () => {
    setAnchorEl(null);
    if(value){
      props.handleChange(value);
    }
  };

  return (
    <>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          position: "absolute", 
          right: {
            xl: "80px",
            lg: "80px",
            md: "70px",
            sm: "25px",
            xs: "25px",
          }, zIndex: 4}}
        endIcon={<Iconify icon={'eva:chevron-down-fill'} />}
      >
        {selected}
      </Button>
      <Menu
        // aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {GRAPH_PERIOD_OPTIONS.map((item) => {
          return <MenuItem 
            key={item.value} 
            onClick={handleClose(item.value)}>{item.label}</MenuItem>;
        })}
      </Menu>
    </>
  );
}
