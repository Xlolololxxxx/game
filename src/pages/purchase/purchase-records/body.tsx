import {
    Card,
    Container,
    IconButton,
    Stack,
    Table,
    TableContainer,
    TablePagination,
    Typography,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';
import Iconify from '@src/components/iconify/Iconify';

import { TABLE_HEAD_PURCHASE } from '@src/utils/mockdata/table-headers';

import { usePurchasesService } from '../hooks';
import { usePurchasesContext } from '../provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Body = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const userId = params.get("u");
	const displayName = params.get("d");

	const { data, purchases, isLoading, isRefreshing } = usePurchasesService();
	const { state, handlePageChange, handleRequestSort, handleRowsPerPageChange } = usePurchasesContext();

	return (
		<Container>
			{userId && displayName && (
				<Stack direction="row" alignItems="center" mb={1}>
					<IconButton size="large" color="default" onClick={() => navigate(-1)}>
						<Iconify icon={'mdi:arrow-left'} width={30} />
					</IconButton>
					<Typography variant="h4">
						{`User (${displayName}) purchase history`}
					</Typography>
				</Stack>
			) }

			<Toolbar />

			<Card sx={{borderRadius: "25px", px: "23px", py: "10px"}}>
				<Scrollbar>
					<TableContainer sx={{ overflowX: 'auto' }}>
						<Table>
							<TableHeader
								order={state.order}
								orderBy={state.orderBy}
								headLabel={TABLE_HEAD_PURCHASE}
								onRequestSort={handleRequestSort}
							/>
							<DataTableRow
								colSpan={9}
								isLoading={isLoading}
								isRefreshing={isRefreshing}
								headers={TABLE_HEAD_PURCHASE}
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
		</Container>
	)
}

export default Body