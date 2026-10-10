import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog } from '@src/components/dialog';
import { FormInput } from '@src/components/form-input';
import { Select } from '@src/components/select';

import { ACCOUNT_TYPE_OPTIONS_PER_USERTYPE, STATUS } from '@src/utils/mockdata/menu-options';

import { UpdateUserFormType } from '@src/lib/types/control-panel';

import useGameProviders from '@src/hooks/useGameProviders';
import { UpdateUserDetailsAPIParams } from '@src/lib/types/users';
import { useAuthService } from '@src/store/hooks';
import { formatAddress } from '@src/utils/country-formatter';
import { useManageTeamService } from '../hooks';
import { useManageTeamContext } from '../provider';
import DeleteConfirmation from './delete-confirmation';

type UserTypeID = keyof typeof ACCOUNT_TYPE_OPTIONS_PER_USERTYPE;

const Div = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10,
});

const UpdateTeamMember = () => {
	const { currentUser } = useAuthService();
	const { gameProviders } = useGameProviders();
	const [ showDelete, setShowDelete ] = useState(false);
	const { state, handleToggleUpdateUserModal } = useManageTeamContext();
	const { onUpdateUserDetails, onDeleteUser } = useManageTeamService();

	const { selectedUser, updateUserDialogOpen } = state || {};

	const accountTypeOptions =
		currentUser?.userTypeID && currentUser.userTypeID in ACCOUNT_TYPE_OPTIONS_PER_USERTYPE
			? ACCOUNT_TYPE_OPTIONS_PER_USERTYPE[currentUser.userTypeID as UserTypeID]
			: [];

	const { control, reset, getValues, watch } = useForm<UpdateUserFormType>({
		defaultValues: {
			userId: "",
			firstName: "",
			lastName: "",
			emailAddress: "",
			title: "",
			acctType: 1,
			status: 1,
		}
	});

	useEffect(() => {
		if (selectedUser && updateUserDialogOpen) {
			reset({
				userId: selectedUser.id,
				firstName: selectedUser.firstName || "",
				lastName: selectedUser.lastName || "",
				emailAddress: selectedUser.emailAddress,
				title: selectedUser.title,
				acctType: selectedUser.userTypeID,
				status: selectedUser.isDeleted ? 0 : 1,
				providerId: selectedUser?.provider?.providerID,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedUser, updateUserDialogOpen]);

	const handleDelete = () => {
		if (selectedUser) {
			const partnerId = selectedUser?.partnerID?.id ?? selectedUser?.partnerID;
			const params: any = {
				userId: selectedUser?.id,
				id: selectedUser?.id,
				...(partnerId ? { partnerId } : {}),
			};

			console.log("paramsparams", params);
			onDeleteUser.mutate(params);
		}
	};

	const handleSave = () => {
		if (selectedUser) {
			const { acctType, firstName, lastName, title, status } = getValues();
			const { userDetail, dateOfBirth, displayName = '', id: userId, partnerID, phoneNumber } = selectedUser || {};
			const { city = '', country, postCode = '', street = '', gender } = userDetail || {};
			const { id: countryId = 0 } = country || {};

			const params: UpdateUserDetailsAPIParams = {
				acctType,
				address: formatAddress({
					city,
					country: {
							id: countryId
					},
					postCode,
					street: street || ''
				}),
				birthday: dateOfBirth || '',
				countryId,
				displayName,
				firstName,
				lastName,
				userId,
				genderId: gender?.id || 1,
				jobTitle: title,
				partnerId: partnerID.id,
				status: !!status,
				phoneNumber: phoneNumber || '',
			};

			onUpdateUserDetails.mutate(params);
		}
	}

	const handleClose = () => {
		handleToggleUpdateUserModal();
		reset({
			userId: "",
			firstName: "",
			lastName: "",
			emailAddress: "",
			title: "",
			acctType: 1,
			status: 1,
		});
	}

	return (
		<>
		<Dialog
			isOpen={Boolean(updateUserDialogOpen)}
			onClose={handleClose}
			dialogTitle={(
				<>
					User details
					<Div>
						{selectedUser?.userTypeID === 6 && <LoadingButton
							loading={onDeleteUser.isPending}
							onClick={() => setShowDelete(true)}
						>
							DELETE PROFILE
						</LoadingButton>}
						<LoadingButton
							loading={onUpdateUserDetails.isPending}
							onClick={handleSave}
						>
							SAVE
						</LoadingButton>
					</Div>
				</>
			)}
			dialogContent={(
				<>
					<Box display="flex" flexDirection="column" gap="25px">
						<FormInput
							internalLabel
							name="userId"
							label="User ID"
							control={control}
							disabled
						/>
						<FormInput
							internalLabel
							name="firstName"
							label="First Name"
							control={control}
						/>
						<FormInput
							internalLabel
							name="lastName"
							label="Last Name"
							control={control}
						/>
						<FormInput
							internalLabel
							name="emailAddress"
							label="Email Address"
							control={control}
							disabled
						/>

						<Select
							name="acctType"
							control={control}
							disabled={selectedUser?.userTypeID === 6}
							options={accountTypeOptions}
							labelId="acctType-select"
							label="Access / Account Type"
							size="small"
						/>
						{watch("acctType") === 6 && <Select
							name="providerId"
							control={control}
							disabled
							options={gameProviders}
							labelKey='name'
							valueKey="id"
							labelId="acctType-select"
							label="Provider Name"
							size="small"
						/>}
					</Box>
					<Box display="flex" flexDirection="column" gap="25px">
						<Select
							name="status"
							control={control}
							options={STATUS}
							labelId="status-select"
							label="Status"
							size="small"
						/>
					</Box>
				</>
			)}
			dialogActions={(<Button autoFocus onClick={() => handleToggleUpdateUserModal()}>Close</Button>)}
		/>
		<DeleteConfirmation 
			visible={showDelete} 
			onSubmit={() => {
				setShowDelete(false);
				handleDelete();
			}}
			onClose={() => setShowDelete(false)} />
		</>
	);
}

export default UpdateTeamMember