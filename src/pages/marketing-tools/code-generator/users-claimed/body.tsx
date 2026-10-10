import {
	Card,
	Table,
	TableContainer,
	TablePagination
} from '@mui/material';

import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';

import { TABLE_HEAD_USER_CLIAM_PROMO } from '@src/utils/mockdata/table-headers';

import { useUsersService } from './hooks';
import { useProviderContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Body = () => {
	const { data, purchases, isLoading, isRefreshing } = useUsersService();
	const { state, handlePageChange, handleRequestSort, handleRowsPerPageChange } = useProviderContext();

	return (
		<>
			<Toolbar />
			<Card sx={{borderRadius: "25px", }}>
				<Scrollbar>
					<TableContainer sx={{ overflowX: 'auto' }}>
						<Table>
							<TableHeader
								order={state.order}
								orderBy={state.orderBy}
								headLabel={TABLE_HEAD_USER_CLIAM_PROMO}
								onRequestSort={handleRequestSort}
							/>
							<DataTableRow
								colSpan={9}
								isLoading={isLoading}
								isRefreshing={isRefreshing}
								headers={TABLE_HEAD_USER_CLIAM_PROMO}
								filterName={state.filterName}
								data={purchases}
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
					rowsPerPage={state.rowsPerPage || 10}
					count={data?.totalRecords ?? 0}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
				/>
			</Card>
		</>
	)
}

export default Body