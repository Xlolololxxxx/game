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
import { MostPlayedFilterFormType } from '@src/lib/types/most-played';
import { DATE_FORMAT } from '@src/lib/constants';
import Iconify from '@src/components/iconify';
import Scrollbar from '@src/components/scrollbar';
import { useMissionActivityTrackeContext } from './provider';
import { format } from 'date-fns';

const FilterSidebar = () => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			fromDate: "",
			toDate: "",
		}
	});

	const { state, handleCloseFilterSidebar, handleClearFilters, onDispatch } = useMissionActivityTrackeContext();
	const { filterSidebarOpen } = state || {}

	const onSubmit: SubmitHandler<MostPlayedFilterFormType> = (formData) => {
		const fromDateValue = new Date(formData.fromDate)
		const toDateValue = new Date(formData.toDate)

		const formattedFromDate = format(fromDateValue, DATE_FORMAT);
		const formattedToDate = format(toDateValue, DATE_FORMAT);

		onDispatch('fromDate')(formattedFromDate);
		onDispatch('toDate')(formattedToDate);
    onDispatch('filterSidebarOpen')(false);
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
				onClose={handleCloseFilterSidebar}
				PaperProps={{
						sx: { width: 280, border: 'none' },
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
						<Typography variant="subtitle1" sx={{ ml: 1 }}>
							Filters
						</Typography>
						<IconButton onClick={handleCloseFilterSidebar}>
							<Iconify icon="eva:close-fill" />
						</IconButton>
					</Stack>
					<Divider />
					<Scrollbar>
						<Stack spacing={2} sx={{ p: 2 }}>
							<div>
								<Typography variant="subtitle1" gutterBottom>
									Date Created
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
					</Scrollbar>
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
				</form>
			</Drawer>
		</LocalizationProvider>
	)
}

export default FilterSidebar