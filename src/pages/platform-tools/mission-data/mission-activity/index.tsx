import {
  Card,
  Stack,
  Table,
  TableContainer
} from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Pagination from '@src/components/data-table/pagination';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_MISSION_ACTIVITY } from '@src/utils/mockdata/table-headers';
import FilterSidebar from './filter';
import { useMissionTrackerService } from './hooks';
import MissionActivityProvider, { useMissionActivityContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Content = () => {
  const { data, missions, isLoading, isRefreshing } = useMissionTrackerService();
  const { state, handleRequestSort, handlePageChange } = useMissionActivityContext();

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
            headLabel={TABLE_HEAD_MISSION_ACTIVITY}
            onRequestSort={handleRequestSort}
          />
          <DataTableRow
            colSpan={9}
            data={missions}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            headers={TABLE_HEAD_MISSION_ACTIVITY}
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
    </Stack>
  );
};

const MissionActivityTracker = () => {
  return (
    <MissionActivityProvider>
      <Content />
      <FilterSidebar />
    </MissionActivityProvider>
  );
};

export default MissionActivityTracker;