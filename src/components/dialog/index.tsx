import { DialogActions, DialogContent, DialogProps, DialogTitle, Dialog as MUIDialog } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const BootstrapDialog = styled(MUIDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type MyDialogProps = Partial<DialogProps> & {
    isOpen?: boolean;
    dividers?: boolean;
    onClose?: (args?: any) => void;
    dialogTitle?: ReactNode;
    dialogContent?: ReactNode;
    dialogActions?: ReactNode;
    fullWidth?: boolean;
}

export const Dialog = (props: MyDialogProps) => {
	const {
		isOpen = false,
		fullWidth = true,
		onClose,
		dividers=true,
		dialogTitle,
		dialogContent,
		dialogActions,
		...rest
	} = props;

	return (
		<BootstrapDialog
			{...rest}
			fullWidth={fullWidth}
			onClose={onClose}
			open={isOpen}
			aria-labelledby="customized-dialog"
		>
			{dialogTitle && <DialogTitle sx={{ m: 0, p: 2 }}>{dialogTitle}</DialogTitle>}
			<DialogContent
				dividers={dividers}
				sx={{
					display: 'flex',
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					gap: 5
				}}
			>
				{dialogContent}
			</DialogContent>
			{dialogActions && <DialogActions>{dialogActions}</DialogActions>}
		</BootstrapDialog>
	)
}