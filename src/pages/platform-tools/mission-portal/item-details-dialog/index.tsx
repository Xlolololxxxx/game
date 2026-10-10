import { DialogTitle } from '@mui/material';
import _ from 'lodash';
import { useMissionContext } from '../provider';
import InputDescription from './input-description';
import UpdateMissionProvider from './provider';
import { BootstrapDialog } from './styles.css';

function ItemsDetailsDialog() {
  const { state, handleMissionDetails } = useMissionContext();

  return (
    <UpdateMissionProvider>
      <BootstrapDialog
        fullWidth
        maxWidth="sm"
        open={!_.isEmpty(state.editDetails)}
        onClose={() => handleMissionDetails({})} >
        <DialogTitle sx={{ m: 0, p: 2 }}>Edit Mission</DialogTitle>
        <InputDescription />
      </BootstrapDialog>
    </UpdateMissionProvider>
  );
}

export default ItemsDetailsDialog;