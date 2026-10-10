import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Iconify from '@src/components/iconify';
import DropDownMenu from '@src/components/menu';
import Scrollbar from '@src/components/scrollbar';
import { PAYMENTS, STATUS_OPTIONS } from '@src/utils/mockdata/menu-options';
import { PurchasesFilterFormType } from '@src/lib/types/purchases';
import { usePurchasesContext } from '../provider';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';

const PurchasesFilterSidebar = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            paymentOption: "",
            status: "",
            fromDate: "",
            toDate: "",
        }
    });
    const { partner } = usePartnerDropdownContext();

    const { state, handleToggleFilterSidebar, handleApplyFilter, handleClearFilters } = usePurchasesContext();
    const { filterSidebarOpen } = state || {}

    const onSubmit: SubmitHandler<PurchasesFilterFormType> = (formData) => {
        handleApplyFilter(formData);
    };

    const onClear = () => {
        handleClearFilters();
        reset();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Drawer
                anchor="right"
                open={filterSidebarOpen}
                onClose={() => handleToggleFilterSidebar(false)}
                PaperProps={{
                    sx: { width: 280, border: 'none' },
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                            Filters
                        </Typography>
                        <IconButton onClick={() => handleToggleFilterSidebar(false)}>
                            <Iconify icon="eva:close-fill" />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Scrollbar>
                        {partner === 'fortune8' && <Stack spacing={2} sx={{ p: 2 }}>
                            <div>
                                <Typography variant="subtitle1" gutterBottom>
                                    Payment Option
                                </Typography>
                                <Controller
                                    name="paymentOption"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <DropDownMenu
                                            options={PAYMENTS}
                                            value={value}
                                            onSort={(event: any) => onChange(event?.target.value)}
                                        />
                                    )}
                                />
                            </div>
                        </Stack>}
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <div>
                                <Typography variant="subtitle1" gutterBottom>
                                    Status
                                </Typography>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <DropDownMenu
                                            options={STATUS_OPTIONS}
                                            value={value}
                                            onSort={(event: any) => onChange(event?.target.value)}
                                        />
                                    )}
                                />
                            </div>
                        </Stack>
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <div>
                                <Typography variant="subtitle1" gutterBottom>
                                    Transaction date
                                </Typography>

                                <Controller
                                    name="fromDate"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <MobileDatePicker
                                            label="From"
                                            value={value && new Date(value)}
                                            sx={{ marginTop: 2 }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    error: false
                                                },
                                            }}
                                            onChange={(selectedDateValue) => onChange(selectedDateValue as string)}
                                        />
                                    )}
                                />

                                <Controller
                                    name="toDate"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <MobileDatePicker
                                            label="To"
                                            value={value && new Date(value)}
                                            sx={{ marginTop: 2 }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    error: false
                                                },
                                            }}
                                            onChange={(selectedDateValue) => onChange(selectedDateValue as string)}
                                        />
                                    )}
                                />

                            </div>
                        </Stack>
                        <Box sx={{ p: 3 }}>
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                color="inherit"
                                variant="outlined"
                                startIcon={<Iconify icon="ic:check" />}
                            >
                                Apply
                            </LoadingButton>
                            <Box sx={{ height: 10 }} />
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="button"
                                color="error"
                                variant="contained"
                                onClick={onClear}
                            >
                                Clear
                            </LoadingButton>
                        </Box>
                    </Scrollbar>
                </form>
            </Drawer>
        </LocalizationProvider>
    )
}

export default PurchasesFilterSidebar