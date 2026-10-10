import { PromotionContextValueType, MissionContextStateType, MissionProviderProps } from '@src/lib/types/missions-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import _debounce from 'lodash/debounce';
import { ChangeEvent, createContext, useCallback, useContext } from 'react';
import ActionMenu from './menu';

const initialState: MissionContextStateType = {
  open: '',
  anchorEl: null,
  page: 0,
  provider: null,
  order: 'asc',
  orderBy: 'id',
  search: '',
  debouncedSearch: '',
  rowsPerPage: 10,
  filterSidebarOpen: false,
  showPurchaseDetails: false,
}

export const MissionActivityTrackeContext = createContext<PromotionContextValueType>({} as PromotionContextValueType);

const MissionActivityTrackerProvider = ({ children }: MissionProviderProps) => {
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
  };

  const handleToggleFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(!state.filterSidebarOpen);
  };

  const handleCloseFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(false);
  };

  const handleOpenMenu = (item: any) => (event: any) => {
    onDispatch('anchorEl')(event.currentTarget);
    onDispatch('selectedItem')(item);
    onDispatch('open')(true);
  };

  const handleCloseMenu = () => {
    onDispatch('open')(false);
    onDispatch('anchorEl')(null);
  };

  const handleShowPurchaseDetails= () => {
    onDispatch('showPurchaseDetails')(!state.showPurchaseDetails);
    onDispatch('open')(false);
    onDispatch('anchorEl')(null);
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
    handleCloseFilterSidebar,
    handleOpenMenu,
    handleShowPurchaseDetails
  };

  return (
    <MissionActivityTrackeContext.Provider value={value}>
      {children}
      <ActionMenu
        open={state.open}
        anchorEl={state.anchorEl}
        handleCloseMenu={handleCloseMenu}
        onShowPurchaseDetails={handleShowPurchaseDetails}
      />
    </MissionActivityTrackeContext.Provider>
  );
};

export const useMissionActivityTrackeContext = () => {
  return useContext(MissionActivityTrackeContext);
}

export default MissionActivityTrackerProvider;
