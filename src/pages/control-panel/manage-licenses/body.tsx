import React from 'react'
import { Card, Container, Stack, Table, TableContainer, TablePagination, Typography } from '@mui/material';

import Scrollbar from '@src/components/scrollbar';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';

import { TABLE_HEAD_MANAGE_LICENSES } from '@src/utils/mockdata/table-headers';

import { useManageLicensesService } from './hooks'
import { useManageLicensesContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

const Body = () => {
    const { data, licenses, isLoading, isRefreshing } = useManageLicensesService();

    const {
        state,
        handleRequestSort,
        handlePageChange,
        handleRowsPerPageChange,
        handleOpenMenu,
    } = useManageLicensesContext();

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
                    <Typography variant="h4" gutterBottom>
                        License Keys
                    </Typography>
                </Stack>
                <Toolbar />
                <Card sx={{borderRadius: "25px", px: "23px", py: "10px"}}>
                    <Scrollbar>
                        <TableContainer sx={{ overflowX: 'auto' }}>
                            <Table>
                                <TableHeader
                                    order={state.order}
                                    orderBy={state.orderBy}
                                    headLabel={TABLE_HEAD_MANAGE_LICENSES}
                                    onRequestSort={handleRequestSort}
                                />

                                <DataTableRow
                                    colSpan={9}
                                    isLoading={isLoading}
                                    isRefreshing={isRefreshing}
                                    headers={TABLE_HEAD_MANAGE_LICENSES}
                                    data={licenses || []}
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
        </>
    )
}

export default Body