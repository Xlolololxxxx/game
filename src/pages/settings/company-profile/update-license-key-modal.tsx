import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { UpdateLicenseKeyModalProps } from '@src/lib/types/settings';
import { useState } from 'react';

const UpdateLicenseKeyModal = ({
    open,
    onClose,
    onActivate,
    isActivating,
}: UpdateLicenseKeyModalProps) => {
	const theme: any = useTheme();
	const [newLicenseKey, setNewLicenseKey] = useState('');

	const handleSubmit = () => {
		onActivate(newLicenseKey);
	};

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
						px: {
							xl: 3,
							lg: 3,
							md: 3,
							sm: 1,
							xs: 1,
						},
						pt: {
							xl: 6,
							lg: 6,
							md: 6,
							sm: 3,
							xs: 3,
						},
						pb: 3,
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
					<Typography variant="h6" sx={{ marginBottom: 1 }}>ENTER NEW LICENSE KEY</Typography>
					<TextField
						fullWidth
						value={newLicenseKey}
						onChange={(e) => setNewLicenseKey(e.target.value)}
						sx={{ marginBottom: 1 }}
						InputProps={{
							inputProps: {
								style: { textAlign: "center" },
							}
					}}
					/>
					<Button
						variant="contained"
						color="primary"
						sx={{bgcolor: theme.palette.purple.dark, px: 10, my: 3}}
						onClick={handleSubmit}
						disabled={isActivating}
					>
						SUBMIT
					</Button>
					<Typography variant='body1' color="#6A6D73" fontStyle={"italic"} >Refresh page to see updates</Typography>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default UpdateLicenseKeyModal