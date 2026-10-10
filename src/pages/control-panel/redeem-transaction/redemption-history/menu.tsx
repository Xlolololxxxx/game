import { MenuItem, Popover } from '@mui/material'

type Props = {
  item: any;
  anchor: any;
  onClose: () => void;
  onShowDialog: () => void;
  onShowRejectDialog: () => void;
}

function ActionMenu(props: Props) {
  const isPending = [1,2,3,4,7,9,13].includes(props.item.redeemStatusID);


  return (
    <Popover
      open={Boolean(props.anchor)}
      anchorEl={props.anchor}
      onClose={() => props.onClose()}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {isPending && <MenuItem onClick={props.onShowRejectDialog}>
        Reject Request
      </MenuItem>}
      <MenuItem onClick={props.onShowDialog}>
        View Details
      </MenuItem>
    </Popover>
  )
}

export default ActionMenu;