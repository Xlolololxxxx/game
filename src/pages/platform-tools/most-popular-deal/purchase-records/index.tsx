import {
  Button,
  Card,
  Stack,
  Table,
  TableContainer
} from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Pagination from '@src/components/data-table/pagination';
import { Dialog } from '@src/components/dialog';
import Iconify from '@src/components/iconify';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_PROMOTION_PURCHASE_RECORDS } from '@src/utils/mockdata/table-headers';
import { useMissionActivityTrackeContext } from '../promotions-data/provider';
import { useMissionTrackerService } from './hooks';
import PurchasingUsersProvider, { usePurchasingUsersContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Content = () => {
  const { data, missions, isLoading, isRefreshing } = useMissionTrackerService();
  const { state, handleRequestSort, handlePageChange } = usePurchasingUsersContext();

  return (
    <Stack flex={1} px={3} alignContent={"center"}>
    <Toolbar />
    <Card sx={{borderRadius: "20px", px: "23px", py: "10px" }}>
      <Scrollbar>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHeader
            order={state.order}
            orderBy={state.orderBy}
            headLabel={TABLE_HEAD_PROMOTION_PURCHASE_RECORDS}
            onRequestSort={handleRequestSort}
          />
          <DataTableRow
            colSpan={9}
            data={missions}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            headers={TABLE_HEAD_PROMOTION_PURCHASE_RECORDS}
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

const DialogContent = () => {
  const { state, handleShowPurchaseDetails } = useMissionActivityTrackeContext();

  return (
    <Dialog
      isOpen={Boolean(state.showPurchaseDetails)}
      maxWidth={"lg"}
      onClose={handleShowPurchaseDetails}
      dialogTitle={(
        <>
          <Stack>
            <Button
              onClick={handleShowPurchaseDetails}

              sx={{
                display: "flex",
                alignSelf: "flex-end",
              }} >
                <Iconify icon="mdi:close" color={"#7D7D7D"} />
              </Button>
          </Stack>
        </>
    )}
      dialogContent={
        <Content />
      }
    />
  )
}

const PurchaseRecords = () => {
  return (
    <PurchasingUsersProvider>
      <DialogContent />
    </PurchasingUsersProvider>
  );
};

export default PurchaseRecords;