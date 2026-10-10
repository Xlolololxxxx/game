import { useEffect } from 'react';
import numeral from 'numeral';
import { useForm } from 'react-hook-form';
import { redeemStatus, redeemTypeName } from '@src/utils/filter-helper';
import { FormInput02 } from '@src/components/form-input';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRedeemTransactionsService } from '../../hooks';
import { Box, Button, styled, Dialog as MUIDialog, Typography } from '@mui/material';
import moment from 'moment';

const BootstrapDialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
	visible: boolean;
	item: any;
	onClose: () => void;
}

const RedemptionDetails = (props: Props) => {
	const { item, visible, onClose } = props;
	const { control, reset, handleSubmit } = useForm();
	const { onUpdateRedeemTransaction } = useRedeemTransactionsService();

	const onSubmit = (formData: any) => {
		if (item) {
			const params = {
				approvalStatus: formData.approvalStatus,
				redeemRequestId: item.id
			};
			onUpdateRedeemTransaction.mutate(params as any, {
				onSuccess: () => onClose(),
			});
		}
	}

	useEffect(() => {
		if (item) {
			reset({
				goldAmount: item.goldAmount,
				redeemTypeID: redeemTypeName(item.redeemTypeID),
				redeemStatusID: item.redeemStatusID,
				giftCardID: item.giftCardID,
				giftCardName: item.giftCardName,
				productID: item.productID,
				productName: item.productName,
				bank_FirstName: item.bank_FirstName,
				bank_LastName: item.bank_LastName,
				bank_Name: item.bank_Name,
				bank_AccountNumber: item.bank_AccountNumber,
				bank_SwiftCode: item.bank_SwiftCode,
				bank_IBAN_IBC_Code: item.bank_IBAN_IBC_Code,
				paypal_FirstName: item.paypal_FirstName,
				paypal_LastName: item.paypal_LastName,
				paypal_Email: item.paypal_Email,
				achAccountNumber: item.achAccountNumber,
				achEmail: item.achEmail,
				achFirstName: item.achFirstName,
				achLastName: item.achLastName,
				achRoutingNumber: item.achRoutingNumber,
				btcAddress: item.btcAddress,
				approvalStatus: item.approvalStatus,
				redeemStatusName: redeemStatus(item.redeemStatusID),
				failureReason: item.failureReason,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item]);

	const dialogContent = item ? (
		<form id="update-redeem-form" onSubmit={handleSubmit(onSubmit)}>
			<Box sx={{}}>
				<Box display="grid"
					gridTemplateColumns="repeat(2, 1fr)"
					gap={2}>
					<Typography variant="subtitle2" fontWeight={"700"} color="#9B9B9B">
						User ID:{" "}
						<Typography display="inline" variant="subtitle2" fontWeight={"700"} 
							color={'#2D60FF'}>
							{item.userID}
						</Typography>
					</Typography>
					<Typography variant="subtitle2" fontWeight={"700"} align='right' color="#9B9B9B">
						Transaction ID:{" "}
						<Typography display="inline" variant="subtitle2" fontWeight={"700"} 
							color={'#2D60FF'}>
							{item.id}
						</Typography>
					</Typography>
				</Box>
				<Box display="grid"
					mt={3}
					gridTemplateColumns="repeat(2, 1fr)"
					gap={2}>
					<FormInput02
						name="redeemTypeID"
						label="Service Type"
						control={control}
						disabled
						labelProps={{variant: "subtitle2", fontWeight: "500", color: "#B0BAC3"}}
					/>
					<FormInput02
						name="redeemStatusName"
						label="Status"
						control={control}
						disabled
						labelProps={{variant: "subtitle2", fontWeight: "500", color: "#B0BAC3"}}
					/>
				</Box>

				<Box mt={4}
					borderRadius={1}
					border="1px solid #B4B3FF"
					bgcolor="#F9F9FF"
					display="flex"
					flexDirection="column"
					gap={1}
					p={2}>
					<RowItem label="SC Amount:" value={numeral(item.goldAmount).format("0,000.00")} />
					<RowItem label="User Name:" value={item?.user?.displayName} />
					{item.redeemTypeID === 1 ? 
					<>
					{item.bank_AccountType && <RowItem label="Bank Account Type:" value={item.bank_AccountType} />}
					{item.bank_AccountNumber && <RowItem label="Bank Account Number:" value={item.bank_AccountNumber} />}
					{item.bank_IBAN_IBC_Code && <RowItem label="Bank Routing Number:" value={item.bank_IBAN_IBC_Code} />}
					</> : null}
					{item.redeemTypeID === 2 ? 
					<>
					{item.paypal_Email && <RowItem label="PayPal Email:" value={item.paypal_Email} />}
					</> : null}
					{item.redeemTypeID === 9 ? 
					<>
					{item.pickupCode && <RowItem label="Pick up code:" value={item.pickupCode} />}
					{item.expiration && <RowItem label="Expiration:" value={moment(item.expiration).format("YYYY-MM-DD | hh:mm:ss")} />}
					{item.estimatedPayoutTime && <RowItem label="Estimated Availablity:" value={moment(item.estimatedPayoutTime).format("YYYY-MM-DD | hh:mm:ss")} />}
					</> : null}
					{item.requestDate && <RowItem label="Date Requested:" value={moment(item.requestDate).format("YYYY-MM-DD | hh:mm:ss")} />}
					{item.approvedAt && <RowItem label="Approval Date:" value={moment(item.approvedAt).format("YYYY-MM-DD | hh:mm:ss")} />}
					{item.completedDate && <RowItem label="Completed:" value={moment(item.completedDate).format("YYYY-MM-DD | hh:mm:ss")} />}
					{item.payoutFee && <RowItem label="Payout Fee:" value={numeral(item.payoutFee).format("$0,000.00")} />}
				</Box>

				{item.failureReason && <FormInput02
					name="failureReason"
					label="Reason for rejection"
					placeholder=" "
					control={control}
					disabled
					multiline
					rows={3}
					labelProps={{mt: 3, variant: "subtitle2", fontWeight: "700", color: "#232323"}}
					sx={{
						// Input text color
						"& .MuiInputBase-input.Mui-disabled": {
							WebkitTextFillColor: "#232323", // Required for Chrome
							color: "#111111",
						},

						// Border color
						"& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
							borderColor: "#DFEAF2",
						},

						'& .MuiInputBase-root': {
							height: "100px",
						},
					}}
				/>}
			</Box>
			<Box display="flex" justifyContent="center" mt={4}>
				<Button variant="outlined" 
					onClick={onClose}
					sx={{
						px: 6,
						py: 1.2,
						color: "#000000",
						borderColor: "#9F9F9F",
						"&:hover": {
							borderColor: "#000000",
							backgroundColor: "transparent",
						},
					}}>
					Close
				</Button>
			</Box>
		</form>
	) : null;

	return (
		<>
		<BootstrapDialog
			fullWidth
			onClose={onClose}
			open={visible}
			aria-labelledby="customized-dialog-title"
		>
        <DialogTitle sx={{ m: 0, p: 2, px: 3 }}>
          Redemption Details
        </DialogTitle>
        <DialogContent dividers>{dialogContent}</DialogContent>
		</BootstrapDialog>
		</>
	)
}

const RowItem = ({ label, value }: {label: string; value: string}) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
		>
			<Typography variant="subtitle2" fontWeight={700} color="#474A49">
				{label}
			</Typography>

			<Typography variant="subtitle2" fontWeight={700}>
				{value}
			</Typography>
		</Box>
	)
}

export default RedemptionDetails