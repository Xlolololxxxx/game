import { MenuItem, Popover } from '@mui/material';

function ActionMenu(props: any) {

  return (
    <Popover
      open={Boolean(props.open)}
      anchorEl={props.anchorEl}
      onClose={props.handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={props.onViewDetails}>
        View Details
      </MenuItem>
    </Popover>
  )
}

export default ActionMenu;