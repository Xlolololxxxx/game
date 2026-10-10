import RedeemTransactionsFilterSidebar from './filter';
import {
  Table,
  TableContainer,
  TablePagination
} from '@mui/material';

import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import { TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_PENDING_REDEMPTION } from '@src/utils/mockdata/table-headers';
import { useRedeemTransactionsService } from '../hooks';
import { useRedeemTransactionsContext } from '../provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

export default function PendingRedemption() {
  return (
      <>
        <Body />
        <RedeemTransactionsFilterSidebar />
      </>
  );
}


const Body = () => {
  const { state, tableContainerRef, handlePageChange, handleRequestSort, handleRowsPerPageChange } = useRedeemTransactionsContext();
  const { data, isLoading, isRefreshing, redeemTransactions } = useRedeemTransactionsService();

  return (
    <>
      <Toolbar />
      <TableContainer ref={tableContainerRef} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHeader
            order={state.order}
            orderBy={state.orderBy}
            headLabel={TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_PENDING_REDEMPTION}
            onRequestSort={handleRequestSort}
          />
          <DataTableRow
            colSpan={9}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            headers={TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_PENDING_REDEMPTION}
            data={redeemTransactions}
            renderItem={({ item, index }: any) => {
              return (
                <TableRowItem
                  key={`${index}`}
                  {...item}
                  currentTab={state.currentTab}
                />
              )
            }} />
        </Table>

      </TableContainer>
      <TablePagination
        component="div"
        page={state.page || 0}
        count={data?.totalRecords || 0}
        rowsPerPage={state.rowsPerPage || 10}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[10, 20, 50]}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
}
