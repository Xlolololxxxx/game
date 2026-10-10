import { MenuItem, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMostPlayedContext } from './provider';
import { useGamesContext } from '../games/provider';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';

function ActionMenu() {
  const navigate = useNavigate();
  const { partner } = usePartnerDropdownContext();
  const { state, handleOpenEditDetails, } = useGamesContext();
  const { state: STATE, handleCloseMenu, accessControl, } = useMostPlayedContext();
  const { open, anchorEl } = STATE || {};

  const handleEdit = () => {
    handleOpenEditDetails();
    handleCloseMenu();
  }

  const navigateGameActivity = () => {
    const params: any = {
      code: state.selectedGame?.code,
    };

    navigate(`/dashboard/games?code=${state.selectedGame?.code}`, { state: params });
    handleCloseMenu();
  }

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      {partner === "fortune8" && accessControl?.allowEdit && <MenuItem onClick={handleEdit}>
        Edit
      </MenuItem>}
      {accessControl?.allowGameActivity && <MenuItem onClick={navigateGameActivity}>
        Game Activity
      </MenuItem>}
    </Popover>
  )
}

export default ActionMenu;