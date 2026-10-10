import {
	Box,
	Card,
	Container,
	IconButton,
	Stack,
	Table,
	TableContainer,
	TablePagination,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify/Iconify';
import Scrollbar from '@src/components/scrollbar';

import { TABLE_HEAD_ACTIVE_USERS } from '@src/utils/mockdata/table-headers';

import moment from 'moment';
import numeral from 'numeral';
import { useUsersService } from '../hooks';
import { useUsersContext } from '../provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const ActiveUsersBody = () => {
	const navigate = useNavigate();

	const {
		state,
		handleReset,
		handleRequestSort,
		handlePageChange,
		handleRowsPerPageChange
	} = useUsersContext();

	const {
		activeUsers,
		activeUsersData,
		activeUsersLoading,
		activeUsersRefetching,
		totalActiveSessionThisMonth,
		onRefreshActiveUsers
	} = useUsersService({ fetchTotalActiveSessionThisMonth: true });

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
						Active Sessions ({state.fromDate && state.toDate ? `${moment(state.fromDate).format("DD MMM YYYY")} - ${moment(state.toDate).format("DD MMM YYYY")}` : `${moment().format("MMMM")}`})
					</Typography>
				</Stack> 
				<Box 
					sx={{
						width: {
							xl: 302,
							lg: 302,
							md: "100%",
							sm: "100%",
							xs: "100%",
						},
						height: {
							xl: 65,
							lg: 65,
							md: 74,
							sm: 74,
							xs: 74,
						},
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						bgcolor: "white", borderRadius: "10px"}}>
					<Typography variant='h5' textAlign="center" >
						{numeral(totalActiveSessionThisMonth).format("0,000")}
					</Typography>
					<Typography variant='body1'
						whiteSpace={'pre-line'}
						color="#718EBF"
						fontSize={{
							xl: "11px",
							lg: "9px",
							md: "9px",
							sm: "12px",
							xs: "12px",
						}}
						textAlign="center">
							Total Amount of Active Sessions {state.fromDate && state.toDate ? `\n(${moment(state.fromDate).format("DD MMM YYYY")} - ${moment(state.toDate).format("DD MMM YYYY")})` : `(${moment().format("MMMM")})`}
					</Typography>
				</Box>
			</Stack>

			<Toolbar handleRefresh={onRefreshActiveUsers} />
			<Card sx={{ borderRadius: "25px", px: "23px", py: "10px" }}>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 800 }}>
						<Table>
							<TableHeader
								order={state?.order}
								orderBy={state.orderBy}
								headLabel={TABLE_HEAD_ACTIVE_USERS}
								onRequestSort={handleRequestSort}
							/>

							<DataTableRow
								colSpan={9}
								isLoading={activeUsersLoading}
								isRefreshing={activeUsersRefetching}
								headers={TABLE_HEAD_ACTIVE_USERS}
								filterName={state.filterName}
								data={activeUsers || []}
								renderItem={({ item, index }: any) => {
									return (
										<TableRowItem
											key={`${index}`}
											{...item}
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
					count={activeUsersData?.totalRecords ?? 0}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
				/>
			</Card>
		</Container>
	)
}

export default ActiveUsersBody