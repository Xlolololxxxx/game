import { MenuItem, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGamesContext } from './provider';

function ActionMenu() {
  const navigate = useNavigate();
  const { state, handleCloseMenu, handleOpenEditDetails, } = useGamesContext();
  const { open, anchorEl } = state || {};

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
      <MenuItem onClick={handleOpenEditDetails}>
        Edit
      </MenuItem>
      <MenuItem onClick={navigateGameActivity}>
        Game Activity
      </MenuItem>
    </Popover>
  )
}

export default ActionMenu;