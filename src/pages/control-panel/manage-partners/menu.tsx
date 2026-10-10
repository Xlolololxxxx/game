import { MenuItem, Popover } from '@mui/material';
import { useManagePartnersContext } from './provider';

function ActionMenu(props: any) {
  const { state, handleCloseMenu, handleToggleOpenGenerateLicenseModal, handleViewPartner } = useManagePartnersContext();
  const { menuOpen } = state ?? {};

  const onViewDetails = () => {
    handleCloseMenu();
    handleToggleOpenGenerateLicenseModal(true);
    handleViewPartner();
  }

  return (
    <Popover
      open={Boolean(menuOpen)}
      anchorEl={state.anchorEl}
      onClose={() => handleCloseMenu()}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={onViewDetails}>
        View
      </MenuItem>
    </Popover>
  )
}

export default ActionMenu;