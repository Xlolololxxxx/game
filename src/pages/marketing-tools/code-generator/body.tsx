import React from 'react';
// @mui
import {
  Card,
  Container,
  IconButton,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';
// components
import Scrollbar from '@src/components/scrollbar';
// mock
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify';
import { TABLE_HEAD_CODE_GENERATOR } from '@src/utils/mockdata/table-headers';
import CreateCode from './create-code';
import { useCodeGeneratorService } from './hooks';
import ItemDetails from './item-details';
import { useCodeGeneratorContext } from './provider';
import TableRowItem from './table-row';
import BodyHeader from './toolbar';
import { applySortFilter, getComparator } from '@src/utils/filter-helper';
import UsersClaimed from './users-claimed';

const Body = () => {
  const { data, codes, isLoading, isRefreshing } = useCodeGeneratorService();
  const { state, handlePageChange, handleRequestSort, handleCreateOpen, handleOpenMenu,
    handleRowsPerPageChange, handleCloseDetails } = useCodeGeneratorContext();

  const filteredCodes = React.useMemo(() => {
    return applySortFilter(codes, getComparator(state.order, state.orderBy), "", "");
  },[codes, state.order, state.orderBy]);

  if(state.openDetails){
    return (
      <Container>
        <Stack direction="row" alignItems="center" mb={1}>
					<IconButton size="large" color="default" onClick={handleCloseDetails}>
						<Iconify icon={'mdi:arrow-left'} width={30} />
					</IconButton>
					<Typography variant="h6" color="#747994" >
            Go Back
					</Typography>
				</Stack> 
        <ItemDetails />
        <UsersClaimed />
      </Container>
    )
  }

  if(state.createOpen){
    return (
      <Container>
        <Stack direction="row" alignItems="center" mb={1}>
					<IconButton size="large" color="default" onClick={handleCreateOpen}>
						<Iconify icon={'mdi:arrow-left'} width={30} />
					</IconButton>
					<Typography variant="h6" color="#747994" >
            Go Back
					</Typography>
				</Stack> 
        <CreateCode />
      </Container>
    )
  }

  return (
    <Container>
      <BodyHeader />
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader
                disableButton
                align="center"
                order={state.order}
                orderBy={state.orderBy}
                headLabel={TABLE_HEAD_CODE_GENERATOR}
                onRequestSort={handleRequestSort}
              />
              <DataTableRow
                colSpan={7}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
                headers={TABLE_HEAD_CODE_GENERATOR}
                data={filteredCodes}
                renderItem={({ item, index }: any) => {
                  return <TableRowItem 
                    key={`${index}`} {...item} 
                    onOpen={handleOpenMenu(item)} 
                    />
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
