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

import Iconify from '@src/components/iconify';
import Scrollbar from '@src/components/scrollbar';

import { UserFilterFormType } from '@src/lib/types/users';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useUsersContext } from './provider';

const UsersFilterSidebar = () => {
	const [params] = useSearchParams();
	const onlyNewUsers = params.get('newUsers') === 'true';
	const onlyActiveUsers = params.get('activeUsers') === 'true';
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			fromDate: null,
			toDate: null,
		}
	});
	const { state, handleCloseFilterSidebar, handleApplyFilter, handleClearFilters } = useUsersContext();
	const { filterSidebarOpen } = state || {};

	const onSubmit: SubmitHandler<UserFilterFormType> = (formData) => {
		handleApplyFilter(formData);
		reset();
	};

	const onClear = () => {
		reset();
		handleClearFilters();
	}

	useEffect(() => {
		reset();
	},[onlyActiveUsers, onlyNewUsers, reset]);

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
									Transaction Date
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
											onChange={(selectedDateValue) => onChange(selectedDateValue as any)}
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
												onChange={(selectedDateValue) => onChange(selectedDateValue as any)}
											/>
										)}
									/>
							</div>
						</Stack>
					</Scrollbar>
					<Box sx={{ display: "flex", flexDirection: "column", p: 3, gap: "1rem" }}>
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

export default UsersFilterSidebar