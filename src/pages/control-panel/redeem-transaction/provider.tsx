import React, { ChangeEvent, createContext, useCallback, useContext } from 'react';
import _debounce from 'lodash/debounce';
import moment from 'moment';

import { RedeemTransactionsContextStateType, RedeemTransactionsContextValueType, RedeemTransactionsFilterFormType, RedeemTransactionsProviderProps } from '@src/lib/types/redeem-transactions';
import { useInputHelper } from '@src/utils/inputs-helper';

const initialState: RedeemTransactionsContextStateType = {
  menuOpen: false,
  updateRedeemStatusOpen: false,
  anchorEl: null,
  page: 0,
  order: 'desc',
  orderBy: 'requestDate',
  search: '',
  debouncedSearch: '',
  filterSidebarOpen: false,
  rowsPerPage: 10,
  selected: null,
  fromDate: '',
  toDate: '',
  currentTab: "pending"
};

export const RedeemContext = createContext<RedeemTransactionsContextValueType>({} as RedeemTransactionsContextValueType);

const RedeemProvider = ({ children }: RedeemTransactionsProviderProps) => {
  const { state, onDispatch } = useInputHelper(initialState);

  const tableContainerRef = React.useRef<any>(null);

  const onToggleOpen = (val?: boolean) => {
    onDispatch('menuOpen')(typeof val === 'boolean' ? val : !state.menuOpen);
  }

  const handlePageChange = (event: unknown, newPage: number) => {
    onDispatch('page')(newPage);
  }

  const handleRequestSort = (property: string) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    onDispatch('order')(isAsc ? 'desc' : 'asc');
    onDispatch('orderBy')(property);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    onDispatch('rowsPerPage')(event.target.value);
  };

  const debouncedSearchFn = (value: string) => {
    onDispatch('page')(0);
    onDispatch('debouncedSearch')(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedSearch = useCallback(_debounce(debouncedSearchFn, 1000), []);

  const handleSearch = (value: string) => {
    onDispatch('search')(value);
    handleDebouncedSearch(value);
  };

  const handleToggleFilterSidebar = (value?: boolean) => {
    if (typeof value === 'boolean') {
      onDispatch('filterSidebarOpen')(value);
      return null;
    }

    onDispatch('filterSidebarOpen')(!state.filterSidebarOpen);
  }

  const handleApplyFilter = (formData: RedeemTransactionsFilterFormType) => {
    onDispatch('page')(0);
    onDispatch('fromDate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DD") : null);
    onDispatch('toDate')(formData.toDate ? moment(formData.toDate).format("YYYY-MM-DD") : null);
    onDispatch('filterSidebarOpen')(!state.filterSidebarOpen);
  }

  const handleClearFilters = () => {
    onDispatch('page')(0);
    onDispatch('status')(null);
    onDispatch('paymentOption')(null);
    onDispatch('fromDate')(null);
    onDispatch('toDate')(null);
    onDispatch('search')("");
    onDispatch('debouncedSearch')("");
  }

  const handleOpenMenu = (item: any) => (event: any) => {
    onDispatch('anchorEl')(event.currentTarget);
    onDispatch('selected')(item);
    onToggleOpen(true);
  };

  const handleCloseMenu = () => {
    onToggleOpen(false);
    onDispatch('anchorEl')(null);
  };

  const handleOpenUpdateRedeemStatus = () => {
    onDispatch('updateRedeemStatusOpen')(true);
  };

  const handleCloseUpdateRedeemStatus = () => {
    onDispatch('updateRedeemStatusOpen')(false);
  };

  const value = {
    state,
    tableContainerRef,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleSearch,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenUpdateRedeemStatus,
    handleCloseUpdateRedeemStatus,
    handleToggleFilterSidebar,
    handleApplyFilter,
    handleClearFilters
  };

  return (
    <RedeemContext.Provider value={value}>
      {children}
    </RedeemContext.Provider>
  );
};

export const useRedeemTransactionsContext = () => {
  return useContext(RedeemContext);
};

export default RedeemProvider;
