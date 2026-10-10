import { MissionActivityContextValueType, MissionContextStateType, MissionProviderProps } from '@src/lib/types/missions-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import _debounce from 'lodash/debounce';
import { ChangeEvent, createContext, useCallback, useContext } from 'react';

const initialState: MissionContextStateType = {
  open: '',
  anchorEl: null,
  page: 0,
  provider: null,
  order: 'asc',
  orderBy: 'userID',
  search: '',
  debouncedSearch: '',
  rowsPerPage: 10,
  filterSidebarOpen: false,
}

export const PurchasingUsersContext = createContext<MissionActivityContextValueType>({} as MissionActivityContextValueType);

const PurchasingUsersProvider = ({ children }: MissionProviderProps) => {
  const { state, onDispatch } = useInputHelper(initialState);

  const handlePageChange = (newPage: number) => {
    onDispatch('page')(newPage);
  }

  const handleRequestSort = (property: string) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    const order = isAsc ? 'desc' : 'asc';
    onDispatch('order')(order);
    onDispatch('orderBy')(property);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    onDispatch('rowsPerPage')(event.target.value);
  }

  const debouncedSearchFn = (value: string) => {
    onDispatch('page')(0);
    onDispatch('debouncedSearch')(value);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedSearch = useCallback(_debounce(debouncedSearchFn, 1000), []);

  const handleSearch = (value: string) => {
    onDispatch('search')(value);
    handleDebouncedSearch(value);
  }

  const handleToggleFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(!state.filterSidebarOpen);
  }

  const handleCloseFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(false);
  };

  const handleClearFilters = () => {
    onDispatch('page')(0);
    onDispatch('fromDate')(null);
    onDispatch('toDate')(null);
    onDispatch('filterSidebarOpen')(false);
  };

  const value = {
    state,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleSearch,
    handleClearFilters,
    handleToggleFilterSidebar,
    handleCloseFilterSidebar
  };

  return (
    <PurchasingUsersContext.Provider value={value}>
      {children}
    </PurchasingUsersContext.Provider>
  );
};

export const usePurchasingUsersContext = () => {
  return useContext(PurchasingUsersContext);
}

export default PurchasingUsersProvider;
