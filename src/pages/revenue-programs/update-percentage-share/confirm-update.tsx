import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type UpdateConfirmationDialogProps = {
    open: boolean;
    handleClose: () => void;
    oldValue: number;
    newValue: number;
    handleConfirm: () => void
};

const UpdateConfirmationDialog: React.FC<UpdateConfirmationDialogProps> = ({
    open,
    handleClose,
    oldValue,
    newValue,
    handleConfirm
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="update-confirmation-dialog"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="update-confirmation-dialog" align='center' p={2}>UPDATE CONFIRMATION</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', }}>
                <div style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <Typography variant="h5" align="center">
                        You are about to update the % share
                        <br />
                        from <b>{oldValue.toFixed(2)}</b> to <b style={{ color: '#0056b3' }}>{newValue.toFixed(2)}</b>
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 5 }}>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#6E00A9', color: 'white', paddingLeft: 50, paddingRight: 50 }}
                >
                    CONFIRM
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateConfirmationDialog;
