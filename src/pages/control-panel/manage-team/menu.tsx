import { MenuItem, Popover } from '@mui/material';
import { useManageTeamContext } from './provider';

function ActionMenu(props: any) {
  const { state, accessControl, handleToggleUpdateUserModal, handleCloseMenu } = useManageTeamContext();
  const { menuOpen } = state ?? {};

  const onEditDetails = () => {
    handleCloseMenu();
    handleToggleUpdateUserModal();
  }

  return (
    <Popover
      open={Boolean(menuOpen)}
      anchorEl={state.anchorEl}
      onClose={() => handleCloseMenu()}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={onEditDetails} disabled={!accessControl?.allowUpdateTeam}>
        Edit
      </MenuItem>
    </Popover>
  )
}

export default ActionMenu;