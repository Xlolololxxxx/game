import numeral from 'numeral';
import DialogContent from '@mui/material/DialogContent';
import { useRedeemTransactionsService } from '../../hooks';
import { Box, Button, styled, Dialog as MUIDialog, Typography } from '@mui/material';
import Iconify from '@src/components/iconify';
import { redeemTypeName } from '@src/utils/filter-helper';
import { LoadingButton } from '@mui/lab';
import { FormInput } from '@src/components/form-input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import _ from 'lodash';
import { useToasterContext } from '@src/context/Toaster';
import { AlertType } from '@src/lib/types/toaster';

const BootstrapDialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
		paddingLeft: theme.spacing(10),
		paddingRight: theme.spacing(10),
		[theme.breakpoints.down('md')]: {
			paddingLeft: "20px",
			paddingRight: "20px",
  },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
	visible: boolean;
	item: any;
	status: string;
	hasError?: string;
	onClose: () => void;
}

const UpdateStatus = (props: Props) => {
	const { item, status, visible, onClose } = props;
	const { control, handleSubmit } = useForm();
	const [hasError, setHasError] = useState<string>("");
	const { onUpdateRedeemTransaction } = useRedeemTransactionsService();

	const onSubmit = (formData: any) => {
		if (item) {
			const params = {
				approvalStatus: status,
				reason: formData.reason,
				redeemRequestId: item.id
			};
			onUpdateRedeemTransaction.mutate(params as any, {
				onSuccess: () => onClose(),
				onError: (error: any) => setHasError(error?.message ?? error?.error?.message),
			});
		}
	}

	if(!_.isEmpty(hasError)){
		return <Rejection {...props} hasError={hasError} />
	}

	return (
		<>
		<BootstrapDialog
			fullWidth
			open={visible}
			onClose={onClose}
			aria-labelledby="customized-dialog-title"
		>
			<DialogContent>
				<form id="update-redeem-form" onSubmit={handleSubmit(onSubmit)}>
					<Box >
						<Box display="flex" alignItems={"center"} flexDirection="column" >
							<Iconify icon={"mingcute:warning-fill"} width={60} color={"#FFA742"}/>
							<Typography variant='h5' mt={1}>
								{status === "APPROVE" ? "Approve redemption request?" : "Reject redemption request?"}
							</Typography>
							<Typography variant='subtitle2' mt={2} textAlign={"center"} fontWeight={400}>
								{status === "APPROVE" ? "Please review the details before approving this request." : 
								"Please review the details before rejecting this request."}
							</Typography>
						</Box>
						<Box 
							mt={4}
							borderRadius={1}
							border="1px solid #B4B3FF"
							bgcolor="#F9F9FF"
							display="flex"
							flexDirection="column"
							gap={1}
							p={2} >
							<RowItem label="SC Amount:" value={numeral(item.creditAmount).format("0,000.00")} />
							<RowItem label="User Name:" value={item?.user?.displayName} />
							<RowItem label="Service Type:" value={redeemTypeName(item.redeemTypeID) || ""} />
							<RowItem label="Transaction ID:" value={item.id} />
						</Box>
						{status === "REJECT" && <FormInput
							name="reason"
							label="Reason"
							control={control}
							sx={{mt: 3,
							}}
							multiline
							rows={3}
							labelProps={{variant: "subtitle2", fontWeight: "500", color: "#B0BAC3"}}
							rules={{
								required: "This is required",
							}}
						/>}
					</Box>
					<Box display="flex" flexDirection="row" justifyContent="center" mt={4} gap={2} maxHeight={"50px"}>
						<Button variant="outlined"
							onClick={onClose}
							sx={{
								flex: 1,
								cursor: "pointer",
								color: "#000000",
								borderColor: "#9F9F9F",
								"&:hover": {
									borderColor: "#000000",
									backgroundColor: "transparent",
								},
							}}>
							Close
						</Button>
						<LoadingButton variant="outlined"
							loading={onUpdateRedeemTransaction.isPending}
							onClick={() => handleSubmit(onSubmit)()}
							sx={{
								flex: 1,
								py: 1.2,
								lineHeight: 1.2,
								cursor: "pointer",
								color: "#ffffff",
								borderColor: status === "APPROVE" ? "#33BB48" : "#E85858",
								backgroundColor: status === "APPROVE" ? "#33BB48" : "#E85858",
								"&:hover": {
									borderColor: status === "APPROVE" ? "#33BB48" : "#E85858",
									backgroundColor: status === "APPROVE" ? "#33BB48" : "#E85858",
								},
								"& .MuiCircularProgress-root": {
									color: "#ffffff",
								},
							}}>
							{status === "APPROVE" ? "Approve Request" : "Reject Request"}
						</LoadingButton>
					</Box>
				</form>
			</DialogContent>
		</BootstrapDialog>
		</>
	)
}

const Rejection = (props: Props) => {
	const { item, visible, hasError, onClose } = props;
	const { triggerOpen } = useToasterContext();
	const { control, handleSubmit } = useForm();
	const { onUpdateRedeemTransaction } = useRedeemTransactionsService();

	const onSubmit = (formData: any) => {
		if (item) {
			const additional = formData.reason ? `\n Notes: ${formData.reason}` : ""
			const cleanedError = (hasError ?? "").replace(/\|/g, "").trim();

			const params = {
				approvalStatus: "REJECT",
				reason: `${cleanedError}${additional}`,
				redeemRequestId: item.id
			};
			onUpdateRedeemTransaction.mutate(params as any, {
				onSuccess: () => onClose(),
				onError: (error: any) => {
					triggerOpen({
						type: AlertType.error,
						title: "Error",
						message: error?.message ?? error?.error?.message
					});
				}
			});
		}
	}

	return (
		<>
		<BootstrapDialog
			fullWidth
			open={visible}
			onClose={onClose}
			aria-labelledby="customized-dialog-title"
		>
			<DialogContent>
				<form id="update-redeem-form" onSubmit={handleSubmit(onSubmit)}>
					<Box >
						<Box display="flex" alignItems={"center"} flexDirection="column" >
							<Iconify icon={"mingcute:warning-fill"} width={60} color={"#E85858"}/>
							<Typography variant='h6' mt={1}>
								Transaction cannot be approved
							</Typography>
							<Typography variant='subtitle2' mt={2} fontWeight={400}>
								This transaction cannot be approved due to the following error:
							</Typography>
						</Box>
						<Box 
							mt={2}
							borderRadius={1}
							border="1px solid #FF9DAF"
							bgcolor="#FFF0F3"
							display="flex"
							flexDirection="column"
							gap={1}
							p={2} >
							{hasError}
						</Box>
						<Typography variant='subtitle2' mt={2} fontWeight={400}>
							Please reject this request so the player can be notified.
						</Typography>
						<Typography variant='h6' mt={1}>
							Additional Notes for Rejection <Typography display="inline" color="red">*</Typography>
						</Typography>
						<FormInput
							name="reason"
							label=""
							control={control}
							sx={{mt: 2}}
							multiline
							rows={3}
							labelProps={{variant: "subtitle2", fontWeight: "500", color: "#B0BAC3"}}
						/>
					</Box>
					<Box display="flex" flexDirection="row" justifyContent="center" mt={4} gap={2} maxHeight={"50px"}>
						<Button variant="outlined"
							onClick={onClose}
							sx={{
								flex: 1,
								cursor: "pointer",
								color: "#000000",
								borderColor: "#9F9F9F",
								"&:hover": {
									borderColor: "#000000",
									backgroundColor: "transparent",
								},
							}}>
							Close
						</Button>
						<LoadingButton variant="outlined"
							loading={onUpdateRedeemTransaction.isPending}
							onClick={() => handleSubmit(onSubmit)()}
							sx={{
								flex: 1,
								py: 1.2,
								lineHeight: 1.2,
								cursor: "pointer",
								color: "#ffffff",
								borderColor: "#E85858",
								backgroundColor: "#E85858",
								"&:hover": {
									borderColor: "#E85858",
									backgroundColor: "#E85858",
								},
								"& .MuiCircularProgress-root": {
									color: "#ffffff",
								},
							}}>
							Reject Request
						</LoadingButton>
					</Box>
				</form>
			</DialogContent>
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
			<Typography variant="subtitle2" fontWeight={500} color="#474A49">
				{label}
			</Typography>

			<Typography variant="subtitle2" fontWeight={700}>
				{value}
			</Typography>
		</Box>
	)
}

export default UpdateStatus;