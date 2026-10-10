import {
    Card,
    Container,
    Stack,
    Table,
    TableContainer,
    TablePagination,
    Typography,
} from '@mui/material';

import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_MANAGE_PARTNERS } from '@src/utils/mockdata/table-headers';

import { useManagePartnersService } from './hooks';
import { useManagePartnersContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from "./toolbar";
import GenerateLicenseKeyForm from './generate-license';
import PartnerForm from './partner-form';

const ManagePartnersBody = () => {
    const { data, partners, isLoading, isRefreshing } = useManagePartnersService();

    const {
        state,
        handleRequestSort,
        handlePageChange,
        handleRowsPerPageChange,
        handleOpenMenu,
    } = useManagePartnersContext();

    const { licenseFormMode, partnerFormMode } = state || {};

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
                    <Typography variant="h4" gutterBottom>
                        Partners
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
                                    headLabel={TABLE_HEAD_MANAGE_PARTNERS}
                                    onRequestSort={handleRequestSort}
                                />

                                <DataTableRow
                                    colSpan={9}
                                    isLoading={isLoading}
                                    isRefreshing={isRefreshing}
                                    headers={TABLE_HEAD_MANAGE_PARTNERS}
                                    data={partners || []}
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
            <GenerateLicenseKeyForm mode={licenseFormMode} />
            <PartnerForm mode={partnerFormMode} />
        </>
    )
}

export default ManagePartnersBody;