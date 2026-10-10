import {
  Card,
  Table,
  TableContainer
} from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_MOST_PLAYED } from '@src/utils/mockdata/table-headers';
import { useMostPlayedService } from '../hooks';
import { useMostPlayedContext } from '../provider';
import TableRowItem from './table-row';

const Body = () => {
  const { games, isLoading, isRefreshing } = useMostPlayedService();

  const {
    state,
    handleRequestSort,
  } = useMostPlayedContext();

  return (
    <Card sx={{borderRadius: "25px", px: "23px", py: "10px"}}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              order={state.order}
              orderBy={state.orderBy}
              headLabel={TABLE_HEAD_MOST_PLAYED.slice(0, 6)}
              onRequestSort={handleRequestSort}
              tableRowStyle={{display: "flex"}}
              sx={{ flex: 1, textAlign: 'center', fontWeight: "600" }}
            />
            <DataTableRow
              colSpan={9}
              isLoading={isLoading}
              isRefreshing={isRefreshing}
              headers={TABLE_HEAD_MOST_PLAYED.slice(0, 6)}
              filterName={state.search}
              data={games}
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
  );
};

export default Body;