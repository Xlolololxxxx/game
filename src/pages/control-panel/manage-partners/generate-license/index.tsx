import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Typography
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { Dialog } from '@src/components/dialog';
import { Select } from '@src/components/select';

import useGameProviders from "@src/hooks/useGameProviders";
import usePaymentTypes from "@src/hooks/usePaymentTypes";

import { GenerateLicenseKeyFormValues, LicenseFormProps } from '@src/lib/types/control-panel';

import moment, { Moment } from "moment";
import { useManagePartnersService } from "../hooks";
import { useManagePartnersContext } from '../provider';

const TITLE = {
    view: 'License Details',
    create: 'Generate License Key',
    edit: 'Update License Key',
};

const GenerateLicenseKeyForm = (props: LicenseFormProps) => {
    const { mode = 'create' } = props;

    const { control, handleSubmit, reset, getValues } = useForm<GenerateLicenseKeyFormValues>({
        defaultValues: {
            expireAt: moment().add(1, 'month').toISOString(),
        }
    });

    const { gameProviders } = useGameProviders();
    const { paymentTypes } = usePaymentTypes();
    const { partners, onCreateLicense, partnerDetails, isLoadingPartnerDetails, onUpdatePartnerStatus } = useManagePartnersService();
    const { state, handleToggleOpenGenerateLicenseModal, handleToggleOpenPartnerModal } = useManagePartnersContext();
    const { generateLicenseKeyDialogOpen } = state || {};

    const [selectedGameProviders, setSelectedGameProviders] = useState<number[]>([]);
    const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<number[]>([]);

    const { license, id: partnerId, partnerName, isActive } = partnerDetails || {};
    const { createdAt, expireAt, licenseKey, isRewardEnabled, paymentTypes: licensePaymentTypes, providers: licenseProviders } = license || {};

    useEffect(() => {
        if (generateLicenseKeyDialogOpen) {
            const { paymentTypes: licensePaymentTypes, providers: licenseProviders } = license || {};
            setSelectedGameProviders(licenseProviders?.map((provider) => provider.id) || []);
            setSelectedPaymentTypes(licensePaymentTypes?.map((paymentType) => paymentType.id) || []);
            reset({
                isRewardEnabled,
                expireAt,
                isActive,
            });
        }
    }, [licensePaymentTypes, licenseProviders, generateLicenseKeyDialogOpen, isRewardEnabled, isActive, expireAt, license, reset]);

    const partnerOptions = useMemo(() => {
        return partners?.map(({ id, partnerName = '' }) => ({
            value: `${id}`,
            label: partnerName
        })) || [];
    }, [partners]);

    const handleClose = () => {
        handleToggleOpenGenerateLicenseModal(false);
        setSelectedGameProviders([]);
        setSelectedPaymentTypes([]);
        reset({
            partnerId: null,
        })
    };

    const handleSelectGameProvider = (id: number, checked: boolean) => {
        setSelectedGameProviders((prev: any) => {
            if (checked) prev = [id, ...prev];

            if (!checked) {
                return prev?.filter((prevId: number) => prevId !== id);
            }

            return prev;
        });
    }

    const handleSelectPaymentType = (id: number, checked: boolean) => {
        setSelectedPaymentTypes((prev: any) => {
            if (checked) prev = [id, ...prev];

            if (!checked) {
                return prev?.filter((prevId: number) => prevId !== id);
            }

            return prev;
        });
    }

    const checkIfGameProviderSelected = useCallback((id: number) => {
        return !!selectedGameProviders?.includes(id as never);
    }, [selectedGameProviders]);

    const checkIfPaymentTypeSelected = useCallback((id: number) => {
        return !!selectedPaymentTypes?.includes(id as never);
    }, [selectedPaymentTypes]);

    const onSubmit = (data: GenerateLicenseKeyFormValues) => {
        onCreateLicense.mutate({
            ...data,
            description: '',
            providerIds: selectedGameProviders,
            paymentTypeIds: selectedPaymentTypes,
        }, {
            onSuccess: () => handleClose()
        });
    };

    const handleUpdatePartnerStatus = () => {
        const { isActive = 1 } = getValues();
        onUpdatePartnerStatus.mutate({ isActive });
    };

    const _renderHeader = useMemo(() => {
        if (['create', 'edit'].includes(mode)) {
            return (
                <Box display="flex" alignItems="center">
                    <Select
                        name="partnerId"
                        control={control}
                        options={partnerOptions}
                        labelId="partner-select"
                        label="Partner"
                        size="small"
                    />
                </Box>
            );
        }

        return (
            <>
                <Typography variant="h6" gutterBottom>
                    LICENSE KEY
                </Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" fontWeight="bold" mr={1}>
                        PARTNER NAME:
                    </Typography>
                    <Typography variant="body1">
                        {partnerName}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" fontWeight="bold" mr={1}>
                        PARTNER ID:
                    </Typography>
                    <Typography variant="body1">
                        {partnerId}
                    </Typography>
                </Box>
                <Box textAlign="right" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => handleToggleOpenPartnerModal(true, 'edit')}>
                        UPDATE PARTNER PROFILE
                    </Button>
                </Box>
            </>
        )
    }, [mode, partnerId, partnerName, partnerOptions, control, handleToggleOpenPartnerModal]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Dialog
                isOpen={Boolean(generateLicenseKeyDialogOpen)}
                maxWidth="lg"
                onClose={handleClose}
                dialogTitle={(
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        {TITLE[mode]}

                        {mode === 'edit' && (
                            <Button variant="text" onClick={() => handleToggleOpenGenerateLicenseModal(true, 'view')}>
                                Cancel
                            </Button>
                        )}
                    </Box>
                )}
                dialogContent={isLoadingPartnerDetails ? (
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        loading
                    </Box>
                ) : (
                    <form
                        id="generate-license-form"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '100%' }}
                    >
                        <Box
                            sx={{
                                padding: 4,
                                width: "90%",
                                margin: "0 auto",
                            }}
                        >
                            {_renderHeader}
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between">
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
                                                    onChange={(e) => handleSelectGameProvider(id, e.target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    disabled={mode === 'view'}
                                                />
                                            }
                                            label={name}
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
                                                    onChange={(e) => handleSelectPaymentType(id, e.target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    disabled={mode === 'view'}
                                                />
                                            }
                                            label={name}
                                        />
                                    ))}

                                    <Box mt={5}>
                                        <Controller
                                            name="isRewardEnabled"
                                            control={control}
                                            render={({ field: { value, onChange } }) =>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={!!value}
                                                            onChange={(e) => onChange(e.target.checked)}
                                                            disabled={mode === 'view'}
                                                        />
                                                    }
                                                    label="Enable Rewards Redeem"
                                                />}
                                        />
                                    </Box>
                                </FormGroup>
                                {mode === 'view' ? (
                                    <FormGroup>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Box display="flex">
                                                <Typography variant="body1" fontWeight="bold" mr={1}>
                                                    License Key:
                                                </Typography>
                                                <Typography variant="body1">
                                                    {licenseKey || '-'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Box display="flex">
                                                    <Typography variant="body1" fontWeight="bold" mr={1}>
                                                        DATE CREATED:
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {createdAt ? moment.parseZone(createdAt).format("MM-DD-YYYY HH:mm:ss") : '-'}
                                                    </Typography>
                                                </Box>
                                                <Box display="flex">
                                                    <Typography variant="body1" fontWeight="bold" mr={1}>
                                                        END DATE:
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {expireAt ? moment.parseZone(expireAt).format("MM-DD-YYYY HH:mm:ss") : '-'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Button
                                                variant="text"
                                                onClick={() => handleToggleOpenGenerateLicenseModal(true, 'edit')}
                                                disabled={!licenseKey}
                                            >
                                                Update License Key
                                            </Button>
                                        </Box>
                                    </FormGroup>
                                ) : null}
                            </Box>
                            {mode !== 'view' && (
                                <Box textAlign="right" mt={2}>
                                    <Controller
                                        name="expireAt"
                                        control={control}
                                        render={({ field: { value, onChange } }) =>
                                            <MobileDateTimePicker
                                                label="Expiry Date"
                                                views={["day", "hours", "minutes", "seconds"]}
                                                format="MM/DD/YYYY HH:mm:ss"
                                                ampm={false}
                                                value={value && moment(value)}
                                                onAccept={(selectedDateValue) => {
                                                    const dateTime = (selectedDateValue as Moment).toDate().toISOString();
                                                    onChange(dateTime);
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                            )}
                        </Box>
                    </form>
                )}
                dialogActions={(
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: mode === 'view' ? 'space-between' : 'flex-end'
                        }}
                    >
                        {mode === 'view' ? (
                            <>
                                <Box width="20%">
                                    <Select
                                        name="isActive"
                                        control={control}
                                        options={[
                                            { value: 1, label: 'Active' },
                                            { value: 0, label: 'Disable' },
                                        ]}
                                        labelId="isActive-select"
                                        label="Partner Status"
                                        size="small"
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={handleUpdatePartnerStatus}
                                    disabled={onUpdatePartnerStatus.isPending}
                                >
                                    Update Partner Status
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" form="generate-license-form" type="submit">
                                Submit
                            </Button>
                        )}
                    </Box>
                )}
            />
        </LocalizationProvider>
    )
}

export default GenerateLicenseKeyForm