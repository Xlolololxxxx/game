import _debounce from 'lodash/debounce';
import { ChangeEvent, createContext, useCallback, useContext } from 'react';
import moment from 'moment';

import { useInputHelper } from '@src/utils/inputs-helper';

import {
  PurchasesContextStateType,
  PurchasesContextValueType,
  PurchasesFilterFormType,
  PurchasesProviderProps
} from '@src/lib/types/purchases';

const initialState: PurchasesContextStateType = {
  page: 0,
  order: 'desc',
  orderBy: 'transactionDate',
  filterName: '',
  rowsPerPage: 10,
  fromdate: null,
  todate: null,
  status: '',
  userid: '',
  search: '',
  debouncedSearch: '',
  filterSidebarOpen: false,
  paymentOption: '',
}

export const PurchaseContext = createContext<PurchasesContextValueType>({} as PurchasesContextValueType);

const PurchaseProvider = ({ children }: PurchasesProviderProps) => {
  const { state, onDispatch } = useInputHelper(initialState);

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
  }

  const debouncedSearchFn = (value: string) => {
    onDispatch('page')(0);
    onDispatch('userid')(value);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedSearch = useCallback(_debounce(debouncedSearchFn, 1000), []);

  const handleSearch = (value: string) => {
    onDispatch('search')(value);
    handleDebouncedSearch(value);
  }

  const handleToggleFilterSidebar = (value?: boolean) => {
    if (typeof value === 'boolean') {
      onDispatch('filterSidebarOpen')(value);
      return null;
    }

    onDispatch('filterSidebarOpen')(!state.filterSidebarOpen);
  }

  const handleApplyFilter = (formData: PurchasesFilterFormType) => {
    onDispatch('page')(0);
    onDispatch('status')(formData.status);
    onDispatch('paymentOption')(formData.paymentOption);
    onDispatch('fromdate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DD") : null);
    onDispatch('todate')(formData.toDate ? moment(formData.toDate).format("YYYY-MM-DD") : null);
    onDispatch('filterSidebarOpen')(false);
  }

  const handleClearFilters = () => {
    onDispatch('page')(0);
    onDispatch('status')(null);
    onDispatch('paymentOption')(null);
    onDispatch('fromdate')(null);
    onDispatch('todate')(null);
    onDispatch('filterSidebarOpen')(false);
  }

  const value = {
    state,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleSearch,
    handleToggleFilterSidebar,
    handleApplyFilter,
    handleClearFilters
  };

  return (
    <PurchaseContext.Provider value={value}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchasesContext = () => {
  return useContext(PurchaseContext);
}

export default PurchaseProvider;
