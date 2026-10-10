import {
	Card,
	Container,
	IconButton,
	Stack,
	Table,
	TableContainer,
	TablePagination,
	Typography
} from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify/Iconify';
import Scrollbar from '@src/components/scrollbar';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { TABLE_HEAD_USERS, TABLE_HEAD_USERS_PALMSPLAY } from '@src/utils/mockdata/table-headers';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersService } from '../hooks';
import { useUsersContext } from '../provider';
import TableRowItem from '../table-row';
import Toolbar from '../toolbar';

const ActiveUsersBody = () => {
	const navigate = useNavigate();
	const {
		state,
		accessControl,
		handleReset,
		handleOpenMenu,
		handleRequestSort,
		handlePageChange,
		handleRowsPerPageChange
	} = useUsersContext();
	const { partner } = usePartnerDropdownContext();
	const {
		data, users, isLoading, isRefreshing,
		onRefreshActiveUsers
	} = useUsersService({ fetchList: true, fetchTotalActiveSessionThisMonth: false });
	const { allowViewMore } = accessControl || {};
	const showMenuOptions = allowViewMore;

	const tableHeaders = useMemo(() => {
		let headers = partner === "palmsplay" ? TABLE_HEAD_USERS_PALMSPLAY : TABLE_HEAD_USERS;

		if (!showMenuOptions) {
			headers = headers.filter(({ id }) => {
				return id !== '';
			});
		}

		return headers;
	}, [showMenuOptions, partner]);

	return (
		<Container>
			<Stack	
				direction={{
					xl: "row",
					lg: "row",
					md: "column",
					sm: "column",
					xs: "column",
				}}
				gap={{
					xl: 0,
					lg: 0,
					md: 1,
					sm: 1,
					xs: 1,
				}}
				alignItems={{
					xl: "center",
					lg: "center",
					md: "flex-start",
					sm: "flex-start",
					xs: "flex-start",
				}} justifyContent="space-between">
				<Stack direction="row"  alignItems="center">
					<IconButton size="large" color="default" onClick={() =>{
							handleReset();
						 	navigate('/dashboard/users');
						}}>
						<Iconify icon={'mdi:arrow-left'} width={30} />
					</IconButton>
					<Typography variant="h4" >
						New Users ({state.fromDate && state.toDate ? `${moment(state.fromDate).format("DD MMM YYYY")} - ${moment(state.toDate).format("DD MMM YYYY")}` : `${moment().format("MMMM")}`})
					</Typography>
				</Stack> 
			</Stack>

			<Toolbar handleRefresh={onRefreshActiveUsers} />
			<Card sx={{ borderRadius: "25px", px: "23px", py: "10px" }}>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 800 }}>
						<Table>
							<TableHeader
								order={state?.order}
								orderBy={state.orderBy}
								headLabel={tableHeaders}
								onRequestSort={handleRequestSort}
							/>
							<DataTableRow
								colSpan={9}
								data={users || []}
								isLoading={isLoading}
								headers={tableHeaders}
								isRefreshing={isRefreshing}
								filterName={state.filterName}
								renderItem={({ item, index }: any) => {
									return (
										<TableRowItem
											key={`${index}`}
											{...item}
											handleOpenMenu={handleOpenMenu(item)}
											showMenuOptions={showMenuOptions}
										/>
									)
								}}
							/>
						</Table>
					</TableContainer>
				</Scrollbar>

				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					page={(state.page || 0)}
					component="div"
					rowsPerPage={state.size || 10}
					count={data?.totalRecords ?? 0}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
				/>
			</Card>
		</Container>
	)
}

export default ActiveUsersBody