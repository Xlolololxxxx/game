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

import DropDownMenu from '@src/components/menu';
import { getCoinTypes } from '@src/utils/mockdata/menu-options';
import { Controller, useForm } from 'react-hook-form';
import { useCoinHistoryContext } from './provider';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';

const FilterSidebar = () => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			fromDate: null,
			toDate: null,
			coinType: null,
		}
	});
	const { partner } = usePartnerDropdownContext();
	const { state, handleCloseFilterSidebar, handleApplyFilter, handleClearFilters } = useCoinHistoryContext();

	const onClear = () => {
		handleClearFilters();
		reset();
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Drawer
				anchor="right"
				open={state.filterSidebarOpen}
				onClose={handleCloseFilterSidebar}
				PaperProps={{
					sx: { width: 280, border: 'none' },
				}}
			>
				<form onSubmit={handleSubmit(handleApplyFilter)}>
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
								COIN TYPE
							</Typography>
							<Controller
								name="coinType"
								control={control}
								render={({ field: { value, onChange } }) => (
									<DropDownMenu
										options={getCoinTypes(partner)}
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
									Date Played
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

export default FilterSidebar