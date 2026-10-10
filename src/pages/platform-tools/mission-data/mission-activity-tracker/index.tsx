import MissionActivityTrackerProvider from './provider';
// @mui
import {
  Card,
  Stack,
  Table,
  TableContainer,
  Typography
} from '@mui/material';

// components
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import { TABLE_HEAD_MISSION_ACTIVITY_TRACKER } from '@src/utils/mockdata/table-headers';
import moment from 'moment';
import { useMissionTrackerService } from './hooks';
import { useMissionActivityTrackeContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';
import FilterSidebar from './filter';
import Pagination from '@src/components/data-table/pagination';
import Scrollbar from '@src/components/scrollbar';

const Content = () => {
  const { data, missions, isLoading, isRefreshing } = useMissionTrackerService();
  const { state, handleRequestSort, handlePageChange } = useMissionActivityTrackeContext();

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
            headLabel={TABLE_HEAD_MISSION_ACTIVITY_TRACKER}
            onRequestSort={handleRequestSort}
          />
          <DataTableRow
            colSpan={9}
            data={missions}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            headers={TABLE_HEAD_MISSION_ACTIVITY_TRACKER}
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
      <Typography variant="h6" display={"flex"} mt={2} alignSelf={"center"} alignItems={"center"} justifyContent={"center"} color="#718EBF" >
      {state.fromDate && state.toDate ? `${moment(state.fromDate).format("MMM DD, YYYY")} - ${moment(state.toDate).format("MMM DD, YYYY")}` : `Month of ${moment().format("MMMM")}`}
      </Typography>
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

const MissionActivityTracker = () => {
  return (
    <MissionActivityTrackerProvider>
      <Content />
    </MissionActivityTrackerProvider>
  );
};

export default MissionActivityTracker;