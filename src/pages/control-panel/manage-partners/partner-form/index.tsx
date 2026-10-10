import {
    Box,
    Button
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { Dialog } from '@src/components/dialog';
import { FormInput } from '@src/components/form-input';

import { PartnerFormProps, PartnerFormValues } from '@src/lib/types/control-panel';

import { Select } from '@src/components/select';
import { COUNTRIES } from '@src/utils/mockdata/menu-options';
import { useManagePartnersService } from '../hooks';
import { useManagePartnersContext } from '../provider';
import { useEffect } from 'react';

const TITLE = {
    view: 'View Partner Details',
    create: 'Create New Partner',
    edit: 'Update Partner Details',
};

const PartnerForm = ({ mode = 'create' }: PartnerFormProps) => {
    const { control, handleSubmit, reset, } = useForm<PartnerFormValues>();
    const { onCreatePartner, onUpdatePartner, partnerDetails } = useManagePartnersService();
    const { state, handleToggleOpenPartnerModal, handleToggleOpenCreatePartnerSuccessModal } = useManagePartnersContext();
    const { partnerDialogOpen } = state || {};

    const handleClose = () => {
        handleToggleOpenPartnerModal(false);

        reset({
            partnerName: '',
            baseUrl: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            street: '',
            city: '',
            country: null,
            postCode: '',
            phoneNumber: ''
        });
    }

    const onSubmitPartner = (data: PartnerFormValues) => {
        if (mode === 'create') {
            onCreatePartner.mutate({
                baseUrl: data.baseUrl,
                owner: {
                    city: data.city,
                    country: data.country,
                    emailAddress: data.emailAddress,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    postCode: data.postCode,
                    street: data.street,
                },
                partnerName: data.partnerName
            }, {
                onSuccess: () => {
                    handleToggleOpenPartnerModal(false);
                    handleToggleOpenCreatePartnerSuccessModal(true);
                }
            });
        }
        if (mode === 'edit') {
            onUpdatePartner.mutate({
                baseUrl: data.baseUrl,
                owner: {
                    city: data.city,
                    country: data.country,
                    emailAddress: data.emailAddress,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    postCode: data.postCode,
                    street: data.street,
                },
                partnerName: data.partnerName
            }, {
                onSuccess: () => {
                    handleToggleOpenPartnerModal(false);
                    handleToggleOpenCreatePartnerSuccessModal(true);
                }
            });
        }
    };

    useEffect(() => {
        if (partnerDialogOpen && mode === 'edit' && partnerDetails) {
            const { partnerName, baseUrl, owner } = partnerDetails;
            const { emailAddress, firstName, lastName, phoneNumber, userDetail } = owner || {};
            const { city, country, postCode, street } = userDetail || {};

            reset({
                partnerName,
                baseUrl,
                firstName,
                lastName,
                emailAddress,
                street,
                city,
                country: country?.id || null,
                postCode,
                phoneNumber
            });
        }
    }, [partnerDialogOpen, mode, partnerDetails, reset]);

    return (
        <Dialog
            isOpen={Boolean(partnerDialogOpen)}
            onClose={handleClose}
            maxWidth="lg"
            dialogTitle={TITLE[mode]}
            dialogContent={(
                <form
                    id="partner-form"
                    onSubmit={handleSubmit(onSubmitPartner)}
                    noValidate
                    style={{ width: '100%' }}
                >
                    <Box display="flex" flex={1} justifyContent="space-between" gap={1} sx={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" sx={{ width: '100%' }} gap={2}>
                            <FormInput
                                name="partnerName"
                                internalLabel
                                label="Partner Name*"
                                placeholder="Partner Name*"
                                control={control}
                                rules={{ required: "Partner Name is required" }}
                            />
                            <FormInput
                                name="baseUrl"
                                internalLabel
                                label="Base URL*"
                                placeholder="Base URL*"
                                control={control}
                                rules={{ required: "Base URL is required" }}
                            />
                            <FormInput
                                name="firstName"
                                internalLabel
                                label="Owner's First Name*"
                                placeholder="Owner's First Name*"
                                control={control}
                                rules={{ required: "Owner's First Name is required" }}
                            />
                            <FormInput
                                name="lastName"
                                internalLabel
                                label="Owner's Last Name*"
                                placeholder="Owner's Last Name*"
                                control={control}
                                rules={{ required: "Owner's Last Name is required" }}
                            />
                            <FormInput
                                name="emailAddress"
                                internalLabel
                                label="Email Address*"
                                placeholder="Email Address*"
                                control={control}
                                rules={{ required: "Email Address is required" }}
                            />
                            <FormInput
                                name="password"
                                internalLabel
                                label="Password*"
                                placeholder="Password*"
                                control={control}
                                rules={mode === 'create' ? { required: "Password is required" } : {}}
                                type='password'
                            />
                        </Box>

                        <Box display="flex" flexDirection="column" sx={{ width: '100%' }} gap={2}>
                            <FormInput
                                name="street"
                                internalLabel
                                label="Address Line 1"
                                placeholder="Address Line 1"
                                control={control}
                            />
                            <FormInput
                                name="city"
                                internalLabel
                                label="City"
                                placeholder="City"
                                control={control}
                            />
                            <Select
                                name="country"
                                control={control}
                                options={COUNTRIES}
                                labelId="country-select"
                                label="Country"
                                size="small"
                            />
                            <FormInput
                                name="postCode"
                                internalLabel
                                label="Post Code"
                                placeholder="Post Code"
                                control={control}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
                            <FormInput
                                name="phoneNumber"
                                internalLabel
                                label="Phone Number"
                                placeholder="Phone Number"
                                control={control}
                            />
                        </Box>
                    </Box>
                </form>
            )}
            dialogActions={(
                <>
                    <Button onClick={handleClose}>Close</Button>
                    <Button
                        form="partner-form"
                        variant="contained"
                        type='submit'
                        disabled={onCreatePartner.isPending || onUpdatePartner.isPending}
                    >
                        Submit
                    </Button>
                </>
            )}
        />
    );
};

export default PartnerForm;