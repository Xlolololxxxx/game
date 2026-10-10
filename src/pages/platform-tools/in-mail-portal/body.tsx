/* eslint-disable react-hooks/exhaustive-deps */
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
import { TABLE_HEAD_IN_MAIL_PORTAL_GAMBLY } from '@src/utils/mockdata/table-headers';
import _ from 'lodash';
import BodyHeader from './body-header';
import CreateMailDialog from './create-mail-dialog';
import { useInMailService } from './hooks';
import ItemsDetailsDialog from './item-detials-dialog';
import { useInMailContext } from './provider';
import TableHeader from './table-header';
import TableRowItem from './table-row';

const Body = () => {
  const { data, mails, isLoading } = useInMailService();
  const { state, handlePageChange, handleRequestSort, 
    handleRowsPerPageChange, handleMailDetails } = useInMailContext();

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
                headLabel={TABLE_HEAD_IN_MAIL_PORTAL_GAMBLY}
                onRequestSort={handleRequestSort}
              />
              <DataTableRow
                colSpan={7}
                isLoading={isLoading}
                headers={TABLE_HEAD_IN_MAIL_PORTAL_GAMBLY}
                data={mails}
                renderItem={({ item, index }: any) => {
                  return <TableRowItem 
                    key={`${index}`} {...item} 
                    onOpen={() => handleMailDetails(item)} />
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
      {state.createMailOpen && <CreateMailDialog />}
    </Container>
  );
}

export default React.memo(Body);
