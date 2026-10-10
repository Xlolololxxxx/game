import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Iconify from '@src/components/iconify';
import { ContactSupportModalProps } from '@src/lib/types/settings';

const ResultModal = ({
    open,
		success,
    onClose,
}: ContactSupportModalProps) => {
	const theme: any = useTheme();

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
		>
			<DialogContent>
				<Box
					sx={{
						px: 1,
						pt: 1,
						pb: 1,
						backgroundColor: '#fff',
						mx: 'auto',
						my: 2,
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={(theme) => ({
							position: 'absolute',
							right: 8,
							top: 8,
							color: theme.palette.grey[500],
						})}
					>
						<CloseIcon />
					</IconButton>

					<Iconify icon={success ? 'mdi:check-circle' : "mdi:close-circle"} width={{
							xl: 90,
							lg: 60,
							md: 50,
							sm: 40,
							xs: 40,
					}} color={success ? "#33BB48" : "#E85858"} />
					<Typography variant="h5" sx={{ marginBottom: 1, color: success ? "#33BB48" : "#E85858"}}>
						{success ? "Success" : "Failed"}
						</Typography>
					<Typography variant='body1' 
						sx={{ whiteSpace: "pre-line", textAlign: "center", color: "#202224",
							fontSize: {
								xl: "15px",
								lg: "13px",
								md: "13px",
								sm: "12px",
								xs: "12px",
							}
						}} >
						{success ? `Your message has been sent.
						Thank you for contacting support, one of our team
						members will get back to you within 24 hours.` 
						: 
						`Looks like we’ve encountered an issue.
						Please check you’ve entered a valid email address
						and try again.`}
					</Typography>

					<Button
						variant="contained"
						color="primary"
						sx={{bgcolor: theme.palette.purple.dark, px: 10, my: 3}}
						onClick={onClose}
					>
						OKAY
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default ResultModal;