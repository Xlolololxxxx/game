/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// components
import Scrollbar from '@src/components/scrollbar';
// mock
import ButtonExport from '@src/components/buttons/button-export';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify/Iconify';
import { StyledWrapRight } from '@src/sections/@dashboard/styles.css';
import { TABLE_HEAD_COIN_HISTORY } from '@src/utils/mockdata/table-headers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCoinHistoryService } from './hooks';
import { useCoinHistoryContext } from './provider';
import TableRowItem from './table-row';

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const displayName = location?.state?.displayName ?? "";

  const {
    state,
    handlePageChange,
    handleRequestSort,
    handleOpenFilterSidebar,
    handleRowsPerPageChange,
  } = useCoinHistoryContext();

  const {
    data,
    coinHistory,
    isLoading,
    onRefreshCoinHistory,
    onExportCoinHistory
  } = useCoinHistoryService();

  return (
    <Container>
      <Stack direction="row" alignItems="center" mb={5}>
        <IconButton size="large" color="default" onClick={() => navigate(-1)}>
          <Iconify icon={'mdi:arrow-left'} width={30} />
        </IconButton>
        <Typography variant="h4">
          {`User (${displayName}) coin history`}
        </Typography>
      </Stack>

      <StyledWrapRight>
        <Button
          disableRipple
          color="inherit"
          endIcon={<Iconify icon="ic:round-filter-list" />}
          onClick={handleOpenFilterSidebar}
        >
          Filters&nbsp;
        </Button>
        <IconButton aria-label="delete" color="primary" onClick={onRefreshCoinHistory}>
          <Iconify icon={'mdi:refresh'} width={30} />
        </IconButton>
        <ButtonExport
          // disabled={!coinHistory.length || isRefreshing}
          onClick={() => onExportCoinHistory.mutate()}
          loading={onExportCoinHistory.isPending}
        />
      </StyledWrapRight>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader
                order={state.order}
                orderBy={state.orderBy}
                headLabel={TABLE_HEAD_COIN_HISTORY}
                onRequestSort={handleRequestSort}
              />
              <DataTableRow
                colSpan={7}
                isLoading={isLoading}
                headers={TABLE_HEAD_COIN_HISTORY}
                data={coinHistory}
                renderItem={({ item, index }: any) => {
                  return <TableRowItem key={`${index}`} {...item} />
                }} />
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={state.page || 0}
          component="div"
          rowsPerPage={state.rowsPerPage || 10}
          count={data?.totalRecords ?? 0}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[10, 20, 50]}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}

export default React.memo(Body);
