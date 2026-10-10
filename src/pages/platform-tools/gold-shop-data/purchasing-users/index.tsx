import {
  Card,
  Stack,
  Table,
  TableContainer
} from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Pagination from '@src/components/data-table/pagination';
import { TABLE_HEAD_PURCHASING_USER } from '@src/utils/mockdata/table-headers';
import { useMissionTrackerService } from './hooks';
import PurchasingUsersProvider, { usePurchasingUsersContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';
import FilterSidebar from './filter';
import Scrollbar from '@src/components/scrollbar';

const Content = () => {
  const { data, missions, isLoading, isRefreshing } = useMissionTrackerService();
  const { state, handleRequestSort, handlePageChange } = usePurchasingUsersContext();

  return (
    <Stack mt={3}>
    <Toolbar />
    <Card sx={{borderRadius: "20px", px: "23px", py: "10px" }}>
      <Scrollbar>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHeader
            order={state.order}
            orderBy={state.orderBy}
            headLabel={TABLE_HEAD_PURCHASING_USER}
            onRequestSort={handleRequestSort}
          />
          <DataTableRow
            colSpan={9}
            data={missions}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            headers={TABLE_HEAD_PURCHASING_USER}
            filterName={state.search}
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
    </Card>
    <Pagination
      page={state.page || 0}
      count={data?.totalRecords || 0}
      rowsPerPage={state.rowsPerPage || 10}
      onPageChange={handlePageChange}
    />
    <FilterSidebar />
    </Stack>
  );
};

const PurchasingUsers = () => {
  return (
    <PurchasingUsersProvider>
      <Content />
    </PurchasingUsersProvider>
  );
};

export default PurchasingUsers;