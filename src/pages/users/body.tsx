import { Button, Card, Container, Table, TableContainer, TablePagination } from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify/Iconify';
import Scrollbar from '@src/components/scrollbar';
import { TABLE_HEAD_USERS, TABLE_HEAD_USERS_GAMBLY, TABLE_HEAD_USERS_PALMSPLAY } from '@src/utils/mockdata/table-headers';

import { useUsersContext } from './provider';
import TableRowItem from './table-row';
import Toolbar from './toolbar';

import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { useMemo } from 'react';
import { useUsersService } from './hooks';

const Body = () => {
	const { data, users, isLoading, isRefreshing } = useUsersService({
		fetchList: true,
	});

	const {
		tableContainerRef,
		state,
		accessControl,
		handleRequestSort,
		handleOpenMenu,
		handlePageChange,
		handleRowsPerPageChange,
		handleScrollLeft,
		handleScrollRight
	} = useUsersContext();
	const { partner } = usePartnerDropdownContext();

	const {
		allowViewMore,
	} = accessControl || {};

	const showMenuOptions = allowViewMore;

	const tableHeaders = useMemo(() => {
		let headers = partner === "palmsplay"
		? TABLE_HEAD_USERS_PALMSPLAY
		: partner === "gambly"
		? TABLE_HEAD_USERS_GAMBLY
		: TABLE_HEAD_USERS;

		if (!showMenuOptions) {
			headers = headers.filter(({ id }) => {
				return id !== '';
			});
		}

		return headers;
	}, [showMenuOptions, partner]);

	return (
		<>
			<Container sx={{mt: 3}}>
				<Toolbar isLoading={isLoading || isRefreshing} />
				<Card sx={{ borderRadius: "25px", px: "23px", py: "10px" }}>
					<Scrollbar>
						<TableContainer ref={tableContainerRef} sx={{ overflowX: 'auto' }}>
							<Table>
								<TableHeader
									order={state.order}
									orderBy={state.orderBy}
									headLabel={tableHeaders}
									onRequestSort={handleRequestSort}
								/>
								<DataTableRow
									colSpan={9}
									data={users || []}
									isLoading={isLoading}
									headers={tableHeaders}
									isRefreshing={isRefreshing}
									filterName={state.filterName}
									renderItem={({ item, index }: any) => {
										return (
											<TableRowItem
												key={`${index}`}
												{...item}
												handleOpenMenu={handleOpenMenu(item)}
												showMenuOptions={showMenuOptions}
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
			<div style={{ position: 'relative', width: '100%' }}>
				<div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
					<Button onClick={handleScrollLeft} color="secondary" >
						<Iconify icon="mdi:chevron-left" sx={{ color: 'text.black', width: 30, height: 30 }} />
					</Button>
					<Button onClick={handleScrollRight} color="secondary">
						<Iconify icon="mdi:chevron-right" sx={{ color: 'text.black', width: 30, height: 30 }} />
					</Button>
				</div>
			</div>
		</>
	)
}

export default Body