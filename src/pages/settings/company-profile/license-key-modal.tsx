import { useCallback, useEffect, useState } from "react";

import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	Stack,
	Tab,
	Tabs,
	Typography
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LicenseKeyModalProps } from "@src/lib/types/settings";
import moment from 'moment';

import { Dialog } from "@src/components/dialog";

import useGameProviders from "@src/hooks/useGameProviders";
import usePaymentTypes from "@src/hooks/usePaymentTypes";

import { useTheme } from "@emotion/react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useCompanyProfileService } from "./hooks";
import { a11yProps } from "./index";

const LicenseKeyModal = ({ open, onClose, handleOpenUpdate }: LicenseKeyModalProps) => {
	const theme: any = useTheme();
  const [value, setValue] = useState(0);
	const [selectedGameProviders, setSelectedGameProviders] = useState<number[]>([]);
	const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<number[]>([]);

	const { gameProviders } = useGameProviders();
	const { paymentTypes } = usePaymentTypes();
	const { partnerLicenseData, partnerLicenseIsLoading } = useCompanyProfileService();
	const { partnerName, id, license } = partnerLicenseData || {};
	const { isRewardEnabled, licenseKey, activatedAt, expireAt, paymentTypes: licensePaymentTypes, providers: licenseProviders } = license || {};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

	const checkIfGameProviderSelected = useCallback((id: number) => {
			return !!selectedGameProviders?.includes(id as never);
	}, [selectedGameProviders]);

	const checkIfPaymentTypeSelected = useCallback((id: number) => {
			return !!selectedPaymentTypes?.includes(id as never);
	}, [selectedPaymentTypes]);

	useEffect(() => {
		const { paymentTypes: licensePaymentTypes, providers: licenseProviders } = license || {};
		setSelectedGameProviders(licenseProviders?.map((provider) => provider.id) || []);
		setSelectedPaymentTypes(licensePaymentTypes?.map((paymentType) => paymentType.id) || []);
	}, [licensePaymentTypes, licenseProviders, isRewardEnabled, license]);

	if (partnerLicenseIsLoading) return <div>Loading...</div>;

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Dialog
				isOpen={open}
				maxWidth="lg"
				onClose={onClose}
				dialogTitle={(
					<Box sx={{px: {
						xl: 6,
						lg: 6,
						md: 0,
						sm: 0,
						xs: 0,
					}}}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="License Key Details" {...a11yProps(0)} />
							</Tabs>
						</Box>
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

						<Typography variant="h6" gutterBottom mt={3} 
							px={{
								xl: 2,
								lg: 2,
								md: 0,
								sm: 0,
								xs: 0,
							}}>
							LICENSE KEY
						</Typography>
						<Stack 
							direction={{
								xl: "row",
								lg: "row",
								md: "column",
								sm: "column",
								xs: "column",
							}} 
							alignItems={{
								xl: "center",
								lg: "center",
								md: "flex-start",
								sm: "flex-start",
								xs: "flex-start",
							}} 
							justifyContent={"space-between"} 
							px={{
								xl: 2,
								lg: 2,
								md: 0,
								sm: 0,
								xs: 0,
							}} >
							<Box display="flex" alignItems="center" flex={0.8}>
								<Typography variant="body1" fontWeight="bold" mr={1}>
									Partner Name:
								</Typography>
								<Typography variant="body1">
									{partnerName}
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" flex={0.8}>
								<Typography variant="body1" fontWeight="bold" mr={1}>
									Partner ID:
								</Typography>
								<Typography variant="body1">
									{id}
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" flex={1}>
								<Typography variant="body1" fontWeight="bold" mr={1}>
									License Key:
								</Typography>
								<Typography variant="body1" color="#333B69">
									{licenseKey}
								</Typography>
							</Box>
						</Stack>
					</Box>
				)}
				dialogContent={(
					<Box
						sx={{
							py: 3,
							px: {
								xl: 8,
								lg: 8,
								md: 3,
								sm: 3,
								xs: 3,
							},
							width: "100%",
							margin: "0 auto",
						}}
					>
						<Box 
							display="flex"
							flexDirection={{
								xl: "row",
								lg: "row",
								md: "column",
								sm: "column",
								xs: "column",
							}} justifyContent="space-between">
							<FormGroup>
								<Typography variant="body1" fontWeight="bold" gutterBottom>
									GAME PROVIDERS
								</Typography>
								{gameProviders.map(({ id, name }) => (
									<FormControlLabel
										key={`game-provider-${id}`}
										control={
											<Checkbox
												checked={checkIfGameProviderSelected(id)}
												inputProps={{ 'aria-label': 'controlled' }}
												disabled
											/>
										}
										label={name}
										disabled
									/>
								))}
							</FormGroup>
							<FormGroup>
								<Typography variant="body1" fontWeight="bold" gutterBottom>
									PAYMENT PROVIDERS
								</Typography>
								{paymentTypes.map(({ id, name }) => (
									<FormControlLabel
										key={`payment-type-${id}`}
										control={
											<Checkbox
												checked={checkIfPaymentTypeSelected(id)}
												inputProps={{ 'aria-label': 'controlled' }}
												disabled
											/>
										}
										label={name}
									/>
								))}
							</FormGroup>
						</Box>

						<Divider sx={{ my: 2 }} />
						<Box
							display="flex"
							justifyContent="space-between"
							// alignItems="center"
							mt={2}
							alignItems={{
								xl: "center",
								lg: "center",
								md: "flex-start",
								sm: "flex-start",
								xs: "flex-start",
							}}
							flexDirection={{
								xl: "row",
								lg: "row",
								md: "column",
								sm: "column",
								xs: "column",
							}}
						>
							<Box>
								<FormControlLabel
									control={
										<Checkbox
											checked={isRewardEnabled}
										/>
									}
									label="ENABLE REWARDS REDEEM"
									disabled
								/>
							</Box>
							<Box display="flex" flexDirection={{
								xl: "row",
								lg: "row",
								md: "column",
								sm: "column",
								xs: "column",
							}}>
								<Box display="flex">
									<Typography variant="body1" fontWeight="bold" mr={1}>
										DATE CREATED:
									</Typography>
									<Typography variant="body1" fontWeight="bold" color="#718EBF">
										{moment(activatedAt).format("MM-DD-YYYY")}
									</Typography>
								</Box>
								<Box mx={1} 
									display={{
										xl: "flex",
										lg: "flex",
										md: "none",
										sm: "none",
										xs: "none",
									}}>/</Box>
								<Box display="flex">
									<Typography variant="body1" fontWeight="bold" mr={1}>
										END DATE:
									</Typography>
									<Typography variant="body1" fontWeight="bold" color="#718EBF">
										{moment(expireAt).format("MM-DD-YYYY")}
									</Typography>
								</Box>
							</Box>
						</Box>
						<Box display={"flex"} alignItems={"center"} justifyContent={"center"} 
							py={3}>
							<Button variant="contained"
								color={"primary"} 
								onClick={handleOpenUpdate}
								sx={{bgcolor: theme.palette.purple.dark, px: 4}}>
								Update License Key
							</Button>
						</Box>
					</Box>
				)}
			/>
		</LocalizationProvider>
	)
};

export default LicenseKeyModal;
