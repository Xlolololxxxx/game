import { MenuItem, Popover } from '@mui/material'

type Props = {
  item: any;
  anchor: any;
  onClose: () => void;
  onShowDialog: () => void;
}

function ActionMenu(props: Props) {
  return (
    <Popover
      open={Boolean(props.anchor)}
      anchorEl={props.anchor}
      onClose={() => props.onClose()}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={props.onShowDialog}>
        View Details
      </MenuItem>
    </Popover>
  )
}

export default ActionMenu;