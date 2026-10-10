import { Box, Stack } from '@mui/material';
import React from 'react';
import { useInMailContext } from '../provider';
import AdvanceSection from "./advance-section";
import MailAdvanceSettings from './mail-advance-settings';
import MailDescription from './mail-description';
import MailSettings from './mail-settings';
import CreateMailProvider from './provider';
import { BootstrapDialog } from './styles.css';


function CreateMailDialog() {
  const { state: STATE, handleCreateMailDialog } = useInMailContext();

  return (
    <CreateMailProvider>
      <BootstrapDialog
        fullWidth
        maxWidth="lg"
        open={STATE.createMailOpen}
        onClose={handleCreateMailDialog} >
        <Stack>
          <MailDescription />
          <Box sx={{width: "100%", height: 1.1, bgcolor: "#C7ACAC"}} />
          <MailSettings />
          <AdvanceSection />
          <MailAdvanceSettings />
        </Stack>
      </BootstrapDialog>
    </CreateMailProvider>
  );
}

export default React.memo(CreateMailDialog);