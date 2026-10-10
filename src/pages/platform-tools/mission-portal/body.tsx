import React from 'react';
// @mui
import {
  Card,
  Container,
  Table,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Scrollbar from '@src/components/scrollbar';
// mock
import DataTableRow from '@src/components/data-table/data-row';
import { TABLE_HEAD_MISSIONS_PORTAL } from '@src/utils/mockdata/table-headers';
import _ from 'lodash';
import BodyHeader from './body-header';
import { useMissionsService } from './hooks';
import ItemsDetailsDialog from './item-details-dialog';
import { useMissionContext } from './provider';
import TableHeader from './table-header';
import TableRowItem from './table-row';

const Body = () => {
  const { data, missions, isLoading } = useMissionsService();
  const { state, handlePageChange, handleRequestSort, 
    handleRowsPerPageChange, handleMissionDetails } = useMissionContext();

  return (
    <Container>
      <BodyHeader />
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader
                disableButton
                order={state.order}
                orderBy={state.orderBy}
                headLabel={TABLE_HEAD_MISSIONS_PORTAL}
                onRequestSort={handleRequestSort}
              />
              <DataTableRow
                colSpan={7}
                isLoading={isLoading}
                headers={TABLE_HEAD_MISSIONS_PORTAL}
                data={missions}
                renderItem={({ item, index }: any) => {
                  return <TableRowItem 
                    key={`${index}`} {...item} 
                    onOpen={() => handleMissionDetails(item)} />
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
      {!_.isEmpty(state.editDetails) && <ItemsDetailsDialog />}
    </Container>
  );
}

export default React.memo(Body);
