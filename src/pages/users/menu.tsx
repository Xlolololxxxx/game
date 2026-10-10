import { MenuItem, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from './provider';

function ActionMenu(props: any) {
  const navigate = useNavigate();
  const { state, accessControl, handleOpenMoreDetails, handleOpenUpdateBalance, handleOpenUpdateTierLevel } = useUsersContext();
  const { open, selectedUser } = state || {};
  const { allowViewMore, allowUpdateUserBalance, allowUpdateTierLevel } = accessControl || {};

  const onViewMoreDetails = () => {
    props.handleCloseMenu();
    handleOpenMoreDetails();
  }

  const onUpdateBalance = () => {
    props.handleCloseMenu();
    handleOpenUpdateBalance();
  }

  const onUpdateTierLevel = () => {
    props.handleCloseMenu();
    handleOpenUpdateTierLevel();
  }

  const onPurchase = () => {
    navigate(`/dashboard/purchase?u=${selectedUser?.id}&d=${selectedUser?.displayName}`)
  }

  const onGameHistory = () => {
    const state = {
      user_id: props.selectedUser.id,
      email: props.selectedUser.emailAddress,
      displayName: props.selectedUser.displayName
    };

    navigate(`/dashboard/users/report/game-history?u=${state.user_id}`, { state });
  }

  const onCoinHistory = () => {
    const state = {
      user_id: props.selectedUser.id,
      email: props.selectedUser.emailAddress,
      displayName: props.selectedUser.displayName
    };

    navigate(`/dashboard/users/report/coin-history?u=${state.user_id}`, { state });
  }

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={state.anchorEl}
      onClose={() => props.handleCloseMenu()}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={onViewMoreDetails}>
        More details
      </MenuItem>
      {allowViewMore && (
        <>
          <MenuItem onClick={onPurchase}>
            Purchase history
          </MenuItem>
          <MenuItem onClick={onGameHistory}>
            Game history
          </MenuItem>
          <MenuItem onClick={onCoinHistory}>
            Coin history
          </MenuItem>
        </>
      )}

      {allowUpdateUserBalance && (
        <MenuItem onClick={onUpdateBalance}>
          Update Balance
        </MenuItem>
      )}

      {allowUpdateTierLevel && (
        <MenuItem onClick={onUpdateTierLevel}>
          Update Tier Level
        </MenuItem>
      )}
    </Popover>
  )
}

export default ActionMenu;