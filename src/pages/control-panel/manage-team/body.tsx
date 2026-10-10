import {
  Card,
  Container,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import Toolbar from "./toolbar";

import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_MANAGE_TEAM } from '@src/utils/mockdata/table-headers';
import { useManageTeamService } from './hooks';
import { useManageTeamContext } from './provider';
import TableRowItem from './table-row';
import { useAuthService } from '@src/store/hooks';
import { useCallback } from 'react';
import { User } from '@src/lib/types/auth';
import { USERTYPES } from '@src/lib/constants';

const ManageTeamBody = () => {
  const { currentUser } = useAuthService();
  const { userTypeID: currentUserAccessType } = currentUser || {};
  const { data, users, isLoading, isRefreshing } = useManageTeamService();

  const {
    state,
    handleRequestSort,
    handlePageChange,
    handleRowsPerPageChange,
    handleOpenMenu,
  } = useManageTeamContext();

  const canEdit = useCallback(({ userTypeID: selectedUserAccessType }: User) => {
    console.log("selectedUserAccessTypeselectedUserAccessType", selectedUserAccessType)
    if (currentUserAccessType === USERTYPES.DEVELOPER) return true;
    return (currentUserAccessType === USERTYPES.ADMIN || currentUserAccessType === USERTYPES.OWNER) && (selectedUserAccessType !== USERTYPES.OWNER && selectedUserAccessType !== USERTYPES.DEVELOPER);
  }, [currentUserAccessType]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
        <Typography variant="h4" gutterBottom >
          Manage Team
        </Typography>
      </Stack>
      <Toolbar />
      <Card sx={{ borderRadius: "25px", px: "23px", py: "10px" }}>
        <Scrollbar>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHeader
                order={state.order}
                orderBy={state.orderBy}
                headLabel={TABLE_HEAD_MANAGE_TEAM}
                onRequestSort={handleRequestSort}
              />

              <DataTableRow
                colSpan={9}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
                headers={TABLE_HEAD_MANAGE_TEAM}
                data={users || []}
                renderItem={({ item, index }: any) => {
                  return (
                    <TableRowItem
                      key={`${index}`}
                      {...item}
                      canEdit={canEdit(item)}
                      handleOpenMenu={handleOpenMenu(item)}
                    />
                  )
                }}
              />
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          page={(state.page || 0)}
          component="div"
          rowsPerPage={state.size || 10}
          count={data?.totalRecords ?? 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  )
}

export default ManageTeamBody