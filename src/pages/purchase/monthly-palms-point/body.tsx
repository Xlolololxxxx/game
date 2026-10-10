import {
	Card,
	Container,
	Stack,
	Table,
	TableContainer,
	TablePagination,
	Typography
} from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { TABLE_HEAD_MONTHLY_PALMS_POINT, TABLE_HEAD_MONTHLY_PURCHASE } from '@src/utils/mockdata/table-headers';
import { usePurchasesService } from './hooks';
import { usePurchasesContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Body = () => {
	const { partner } = usePartnerDropdownContext();
	const { data, purchases, isLoading, isRefreshing } = usePurchasesService();
	const { state, handlePageChange, handleRequestSort, handleRowsPerPageChange } = usePurchasesContext();

	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
				<Typography variant="h4" gutterBottom fontFamily={"Inter"}>
					Monthly Report
				</Typography>
			</Stack>
			<Toolbar />

			<Card sx={{borderRadius: "25px", px: "23px", py: "10px"}}>
				<Scrollbar>
					<TableContainer sx={{ overflowX: 'auto' }}>
						<Table>
							<TableHeader
								display="flex"
								order={state.order}
								orderBy={state.orderBy}
								align="center"
								headLabel={partner === "palmsplay" ? TABLE_HEAD_MONTHLY_PALMS_POINT : TABLE_HEAD_MONTHLY_PURCHASE}
								onRequestSort={handleRequestSort}
							/>
							<DataTableRow
								colSpan={9}
								isLoading={isLoading}
								isRefreshing={isRefreshing}
								headers={partner === "palmsplay" ? TABLE_HEAD_MONTHLY_PALMS_POINT : TABLE_HEAD_MONTHLY_PURCHASE}
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
					count={data?.totalElements ?? 0}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
				/>
			</Card>
		</Container>
	)
}

export default Body