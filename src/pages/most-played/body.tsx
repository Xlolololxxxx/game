/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useSearchParams } from 'react-router-dom';

// @mui
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

// components
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify/Iconify';
import Scrollbar from '@src/components/scrollbar';

import { TABLE_HEAD_MOST_PLAYED } from '@src/utils/mockdata/table-headers';


import { useMostPlayedService } from './hooks';
import { useMostPlayedContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Body = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sort');
  const sortByValue = searchParams.get('sortBy');
  const { data, games, isLoading, isRefreshing } = useMostPlayedService();
  const {
    state,
    handleOpenMenu,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
  } = useMostPlayedContext();

  return (
    <Container>
      {sortValue && sortByValue ? (
        <Stack direction="row" alignItems="center" mb={5}>
          <IconButton size="large" color="default" onClick={() => navigate('/dashboard/games')}>
            <Iconify icon={'mdi:arrow-left'} width={30} />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            Most Played
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
          <Typography variant="h4" gutterBottom>
            Most Played
          </Typography>
        </Stack>
      )}
      <Toolbar />
      <Card sx={{borderRadius: "25px", px: "23px", py: "10px"}}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader
                order={state.order}
                orderBy={state.orderBy}
                headLabel={TABLE_HEAD_MOST_PLAYED}
                onRequestSort={handleRequestSort}
              />
              <DataTableRow
                colSpan={9}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
                headers={TABLE_HEAD_MOST_PLAYED}
                filterName={state.search}
                data={games}
                renderItem={({ item, index }: any) => {
                  return (
                    <TableRowItem
                      key={`${index}`}
                      {...item}
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
    </Container>
  );
};

export default Body;