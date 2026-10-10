import {
  Card,
  Stack,
  Table,
  TableContainer,
  Typography
} from '@mui/material';
import MissionActivityTrackerProvider from './provider';

// components
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import { TABLE_HEAD_GOLD_SHOP_DATA } from '@src/utils/mockdata/table-headers';

import Scrollbar from '@src/components/scrollbar';
import moment from 'moment';
import FilterSidebar from './filter';
import { useGoldShopService } from './hooks';
import { useMissionActivityTrackeContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Content = () => {
  const { missions, isLoading, isRefreshing } = useGoldShopService();
  const { state, handleRequestSort } = useMissionActivityTrackeContext();

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
            headLabel={TABLE_HEAD_GOLD_SHOP_DATA}
            onRequestSort={handleRequestSort}
          />
          <DataTableRow
            colSpan={9}
            data={missions}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            headers={TABLE_HEAD_GOLD_SHOP_DATA}
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