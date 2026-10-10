/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Container,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import React from 'react';

// components
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';

import { TABLE_HEAD_GAMES } from '@src/utils/mockdata/table-headers';

import { useGamesService } from './hooks';
import { useGamesContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';


const Body = () => {
  const {
    state,
    accessControl,
    tableContainerRef,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleOpenMenu,
  } = useGamesContext();

  const {
    data,
    games,
    isLoading,
    isRefreshing
  } = useGamesService();

  const { allowViewList, allowViewGameInfo } = accessControl || {};

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
        <Typography variant="h4" gutterBottom>
          Games
        </Typography>
      </Stack>
      {allowViewList && <Toolbar />}
      {allowViewList && (
				<Card sx={{ borderRadius: "25px", px: "23px", py: "10px" }}>
          <Scrollbar>
          <TableContainer ref={tableContainerRef} sx={{ overflowX: 'auto' }}>
            <Table>
                <TableHeader
                  order={state.order}
                  orderBy={state.orderBy}
                  headLabel={TABLE_HEAD_GAMES}
                  onRequestSort={handleRequestSort}
                />
                <DataTableRow
                  colSpan={9}
                  isLoading={isLoading}
                  isRefreshing={isRefreshing}
                  headers={TABLE_HEAD_GAMES}
                  filterName={state.search}
                  data={games}
                  renderItem={({ item, index }: any) => {
                    return (
                      <TableRowItem
                        key={`${index}`}
                        {...item}
                        showMenu={allowViewGameInfo}
                        handleOpenMenu={handleOpenMenu(item)}
                      />
                    )
                  }}
                />
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            component="div"
            page={state.page || 0}
            count={data?.totalRecords || 0}
            rowsPerPage={state.rowsPerPage || 10}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[10, 20, 50]}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Card>
      )}
    </Container>
  );
}

export default React.memo(Body);
