import { MenuItem, Popover } from '@mui/material'
import React from 'react'

type Props = {
    open: any;
    handleClose: () => void;
    handleOpenUserDialog: () => void;
    handleLogout: () => void;
}

const AccountMenu = (props: Props) => {
    const { open, handleClose, handleOpenUserDialog, handleLogout } = props;

    return (
        <Popover
            open={!!(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    width: 180,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                },
            }}
        >
            <MenuItem
                onClick={handleOpenUserDialog}
                sx={{ m: 1 }}
            >
                Update details
            </MenuItem>
            <MenuItem
                onClick={handleLogout}
                sx={{ m: 1 }}
            >
                Logout
            </MenuItem>
        </Popover>
    )
}

export default AccountMenu