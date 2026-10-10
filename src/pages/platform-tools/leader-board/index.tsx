
import { Box, Card, Table, TableContainer, TablePagination } from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_GOLD, TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_SILVER } from '@src/utils/mockdata/table-headers';
import { useMemo } from 'react';
import FilterSidebar from "./filter";
import { useLeaderBoardService } from './hooks';
import LeaderBoardProvider, { useLeaderBoardContext } from "./provider";
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Body = () => {
	const { data, users, isLoading, isRefreshing } = useLeaderBoardService();

	const {
		state,
		handleRequestSort,
		handleOpenMenu,
		handlePageChange,
		handleRowsPerPageChange,
	} = useLeaderBoardContext();


	const tableHeaders = useMemo(() => {
		return state.coinTypeId === 2 ? TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_GOLD : TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_SILVER;
	}, [state.coinTypeId]);

	return (
		<>
			<Box>
				<Box height={"30px"} />
				<Toolbar />
				<Card sx={{ borderRadius: "25px", px: "23px", py: "10px" }}>
					<Scrollbar>
						<TableContainer sx={{ overflowX: 'auto' }}>
							<Table>
								<TableHeader
									order={state.order}
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
				<FilterSidebar />
			</Box>
		</>
	)
}

const LeaderBoardPage = () => {

	return (
		<LeaderBoardProvider>
			<Body />
		</LeaderBoardProvider>
	)
}

export default LeaderBoardPage