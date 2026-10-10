import { Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useManageTeamContext } from '../provider';
import InviteUserForm from './form';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const InviteFormDialog = () => {
  const { state, handleToggleInviteModal } = useManageTeamContext();

  return (
    <div>
      <BootstrapDialog
        fullWidth
        onClose={() => handleToggleInviteModal(false)}
        open={state.inviteDialogOpen}
        aria-labelledby="customized-dialog-title"
      >
        <DialogContent dividers sx={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <InviteUserForm />
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

export default InviteFormDialog