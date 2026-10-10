import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormDatePicker } from '@src/components/date-picker/form-date';
import { Dialog } from '@src/components/dialog';
import { FormInput } from '@src/components/form-input';
import { Select } from '@src/components/select';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { UserFormType } from '@src/lib/types/users';
import { ACCOUNT_TYPE_OPTIONS, GENDER, STATUS, USSTATES } from '@src/utils/mockdata/menu-options';
import dayjs from 'dayjs';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useUsersService } from '../hooks';
import { useUsersContext } from '../provider';

const Div = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10,
});

const UserDetailsDialog = () => {
    const { onUpdateUserDetails } = useUsersService();
    const { partner } = usePartnerDropdownContext();
    const isPalmsPlay = partner === "palmsplay";
    const { handleCloseMoreDetails, handleEditDetails, state, accessControl } = useUsersContext();
    const { moreDetailsOpen, editingDetails, selectedUser } = state ?? {};

    const { control, reset, getValues } = useForm<UserFormType>({
        defaultValues: {
            userId: "",
            partnerId: 1,
            firstName: "",
            lastName: "",
            emailAddress: "",
            dateOfBirth: null,
            genderId: GENDER[0].value,
            countryId: USSTATES[0].value,
            address: "",
            phoneNumber: "",
            displayName: "",
            acctType: 1,
            status: 1,
            silver: "0.00",
            gold: "0.00",
            goldBonus: "0.00",
            jadeAmount: "0.00",
            enrollmentDate: "",
            lastModifiedDate: ""
        }
    });

    const GoldLabel = useMemo(() => {
        switch(partner){
            case "palmsplay":
                return "Palms Gold";
            case "gambly":
                return "Sweeps Coins";
            default:
                return "GWz Gold";
        }
    },[partner]);

    const GoldBonusLabel = useMemo(() => {
        switch(partner){
            case "palmsplay":
                return "Bonus Gold";
            case "gambly":
                return "B-Gold Balance";
            default:
                return "Gold balance";
        }
    },[partner]);

    console.log("selectedUserselectedUser", selectedUser)

    useEffect(() => {
        if (selectedUser) {
            reset({
                userId: selectedUser.id,
                partnerId: selectedUser.partnerID?.id,
                firstName: selectedUser.firstName || "",
                lastName: selectedUser.lastName || "",
                emailAddress: selectedUser.emailAddress,
                dateOfBirth: selectedUser.dateOfBirth ?  dayjs(selectedUser.dateOfBirth, 'DD-MM-YYYY') : null,
                genderId: selectedUser.userDetail?.gender?.id,
                countryId: selectedUser.userDetail?.province?.id,
                address: selectedUser.userDetail?.street || "",
                phoneNumber: selectedUser.phoneNumber || "",
                displayName: selectedUser.displayName || "",
                acctType: selectedUser.userTypeID,
                status: selectedUser.isDeleted ? 0 : 1,
                silver: numeral(selectedUser.SILVER).format("0,000"),
                gold: numeral(selectedUser.GOLD).format("0,000"),
                goldBonus: numeral(selectedUser['GOLD BONUS']).format("0,000"),
                jadeAmount: numeral(selectedUser.userJade?.amount).format("0,000"),
                enrollmentDate: selectedUser.enrollmentDate ? moment.parseZone(selectedUser.enrollmentDate).format("MM-DD-YYYY hh:mm A") : '',
                lastModifiedDate: selectedUser.lastModifiedDate ? moment.parseZone(selectedUser.lastModifiedDate).format("MM-DD-YYYY hh:mm A") : '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser]);

    const handleSave = () => {
        const values = getValues();

        const params = {
            "acctType": values.acctType,
            "genderId": values.genderId,
            "countryId": values.countryId,
            provinceId: values.countryId,
            "partnerId": values.partnerId,
            "address": values.address,
            "displayName": values.displayName,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "phoneNumber": values.phoneNumber,
            "status": !!values.status,
            "isDeleted": !values.status,
            "userId": selectedUser?.id,
            birthday: values.dateOfBirth ? values.dateOfBirth.format('DD-MM-YYYY') : null,
        }

        onUpdateUserDetails.mutate(params);
    }

    return (
        <Dialog
            isOpen={Boolean(moreDetailsOpen)}
            onClose={handleCloseMoreDetails}
            dialogTitle={(
                <>
                    User details
                    {accessControl?.allowUpdateUserDetails && <Div>
                        {editingDetails ? (
                            <LoadingButton
                                loading={onUpdateUserDetails.isPending}
                                onClick={handleSave}
                            >
                                SAVE
                            </LoadingButton>
                        ) : (
                            <Button onClick={handleEditDetails}>EDIT</Button>
                        )}
                    </Div>}
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
                            disabled={!editingDetails || isPalmsPlay}
                        />
                        <FormInput
                            internalLabel
                            name="lastName"
                            label="Last Name"
                            control={control}
                            disabled={!editingDetails || isPalmsPlay}
                        />
                        <FormInput
                            internalLabel
                            name="emailAddress"
                            label="Email Address"
                            control={control}
                            disabled
                        />
                        {!isPalmsPlay && (
                            <>
                                <FormDatePicker
                                    name="dateOfBirth"
                                    label="Date Of Birth"
                                    control={control}
                                    disabled={!editingDetails || isPalmsPlay}
                                />
                                <Select
                                    name="genderId"
                                    control={control}
                                    options={GENDER}
                                    labelId="gender-select"
                                    label="Gender"
                                    size="small"
                                    disabled={!editingDetails || isPalmsPlay}
                                />
                                <Select
                                    name="countryId"
                                    control={control}
                                    options={USSTATES}
                                    labelId="country-select"
                                    label="States"
                                    size="small"
                                    disabled={!editingDetails || isPalmsPlay}
                                />
                                <FormInput
                                    internalLabel
                                    name="address"
                                    label="Address"
                                    control={control}
                                    disabled={!editingDetails}
                                />
                                <FormInput
                                    internalLabel
                                    name="phoneNumber"
                                    label="Phone Number"
                                    control={control}
                                    disabled={!editingDetails || isPalmsPlay}
                                />
                            </>
                        )}
                        <Box sx={{ height: 15 }} />
                    </Box>

                    {/* right side */}
                    <Box display="flex" flexDirection="column" gap="25px">
                        <FormInput
                            internalLabel
                            name="displayName"
                            label="Display Name"
                            control={control}
                            disabled={!editingDetails}
                        />
                        <Select
                            name="acctType"
                            control={control}
                            options={ACCOUNT_TYPE_OPTIONS}
                            labelId="acctType-select"
                            label="Account Type"
                            size="small"
                            disabled
                        />
                        <Select
                            name="status"
                            control={control}
                            options={STATUS}
                            labelId="status-select"
                            label="Status"
                            size="small"
                            disabled={!editingDetails}
                        />
                        <FormInput
                            internalLabel
                            name="silver"
                            label="Silver balance"
                            control={control}
                            disabled
                        />
                        <FormInput
                            internalLabel
                            name="gold"
                            label={GoldLabel}
                            control={control}
                            disabled
                        />
                        <FormInput
                            internalLabel
                            name="goldBonus"
                            label={GoldBonusLabel}
                            control={control}
                            disabled
                        />
                        <FormInput
                            internalLabel
                            name="jadeAmount"
                            label={isPalmsPlay ? "Golden Ball" : "Jade Amount"}
                            control={control}
                            disabled
                        />
                        <FormInput
                            internalLabel
                            name="enrollmentDate"
                            label="Date Created"
                            control={control}
                            disabled
                        />
                        <FormInput
                            internalLabel
                            name="lastModifiedDate"
                            label="Last Modified"
                            control={control}
                            disabled
                        />
                    </Box>
                </>
            )}
            dialogActions={(<Button autoFocus onClick={handleCloseMoreDetails}>Close</Button>)}
        />
    );
}

export default UserDetailsDialog