
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
import Iconify from '@src/components/iconify';
import Scrollbar from '@src/components/scrollbar';
import DropDownMenu from '@src/components/menu';
import { generateWeeklyOptions } from '@src/utils/filter-helper';
import moment from 'moment';
import { useLeaderBoardContext } from './provider';

const FilterSidebar = () => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			fromDate: "",
			toDate: "",
		}
	});
	const { state, handleCloseFilterSidebar, handleClearFilters, onDispatch } = useLeaderBoardContext();
	const { filterSidebarOpen } = state || {}

	const onSubmit: SubmitHandler<MostPlayedFilterFormType> = (formData) => {
		const weekNumber = moment(formData.fromDate).isoWeek();
		const year = moment(formData.fromDate).isoWeekYear();
		
		onDispatch('week')(weekNumber);
		onDispatch('year')(year);
    onDispatch('filterSidebarOpen')(false);
		onDispatch('fromDate')(formData.fromDate);
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
				PaperProps={{ sx: { width: 280, border: 'none' } }}
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
									Select Date
								</Typography>
								<Controller
									name="fromDate"
									control={control}
									render={({ field: { value, onChange } }) => (
										<DropDownMenu
											options={generateWeeklyOptions()}
											value={value}
											onSort={(event: any) => onChange(event?.target.value)}
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