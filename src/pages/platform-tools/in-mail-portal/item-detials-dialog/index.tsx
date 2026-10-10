import { Box, CircularProgress, Stack } from '@mui/material';
import _ from 'lodash';
import { useInMailContext } from '../provider';
import MailDescription from './mail-description';
import MailSettings from './mail-settings';
import { BootstrapDialog } from './styles.css';
import UpdateMailProvider from './provider';
import { useInMailService } from '../hooks';

function ItemsDetailsDialog() {
  const { state, handleMailDetails } = useInMailContext();
  const { getMailDetailsLoading } = useInMailService();

  return (
    <UpdateMailProvider>
      <BootstrapDialog
        fullWidth
        maxWidth="lg"
        open={!_.isEmpty(state.editDetails)}
        onClose={() => handleMailDetails({})} >
        <Stack>
          <MailDescription />
          <Box sx={{width: "100%", height: 1.1, bgcolor: "#C7ACAC"}} />
          <MailSettings />
          {getMailDetailsLoading && <CircularProgress sx={{position: "absolute", alignSelf: "center", mt: 6}} />}
        </Stack>
      </BootstrapDialog>
    </UpdateMailProvider>
  );
}

export default ItemsDetailsDialog;