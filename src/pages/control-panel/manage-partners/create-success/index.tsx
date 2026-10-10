import { Box, Button } from "@mui/material";
import { Dialog } from "@src/components/dialog";
import { useManagePartnersContext } from "../provider";

const CreateSuccess = () => {
    const { state, handleToggleOpenCreatePartnerSuccessModal, handleToggleOpenGenerateLicenseModal } = useManagePartnersContext();
    const { createPartnerSuccessDialogOpen } = state || {};

    const handleClose = () => {
        handleToggleOpenCreatePartnerSuccessModal(false);
    };

    const handleContinue = () => {
        handleToggleOpenCreatePartnerSuccessModal(false);
        handleToggleOpenGenerateLicenseModal(true, 'create');
    };

    return (
        <Dialog
            fullWidth={false}
            isOpen={Boolean(createPartnerSuccessDialogOpen)}
            onClose={handleClose}
            maxWidth="lg"
            dialogTitle="New Partner Successfully Added"
            dialogContent={(
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Button variant="contained" onClick={handleContinue}>Continue to License Keys</Button>
                    <Button variant="text" onClick={handleClose}>Update later</Button>
                </Box>
            )}
        />
    )
}

export default CreateSuccess;