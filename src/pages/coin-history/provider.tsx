import { CoinHistoryContextStateType, CoinHistoryContextValueType, CoinHistoryProviderProps } from '@src/lib/types/coin-history';
import { useInputHelper } from '@src/utils/inputs-helper';
import moment from 'moment';
import { ChangeEvent, createContext, useContext } from 'react';

const initialState: CoinHistoryContextStateType = {
  page: 0,
  order: 'desc',
  orderBy: 'id',
  rowsPerPage: 10,
  coinType: {},
}

export const CoinHistoryContext = createContext<CoinHistoryContextValueType>({} as CoinHistoryContextValueType);

const CoinHistoryProvider = ({ children }: CoinHistoryProviderProps) => {
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

  const handleOpenFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(true);
  };

  const handleCloseFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(false);
  };

  const handleApplyFilter = (formData: any) => {
    onDispatch('filterSidebarOpen')(false);
    onDispatch('fromDate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DD") : null);
    onDispatch('coinType')(formData.coinType);
    onDispatch('toDate')(formData.toDate ? moment(formData.toDate).format("YYYY-MM-DD") : null);
  }

  const handleClearFilters = () => {
    onDispatch('fromDate')(null);
    onDispatch('toDate')(null);
    onDispatch('coinType')({});
    onDispatch('filterSidebarOpen')(false);
  }

  const value = {
    state,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleOpenFilterSidebar,
    handleCloseFilterSidebar,
    handleApplyFilter,
    handleClearFilters
  };

  return (
    <CoinHistoryContext.Provider value={value}>
      {children}
    </CoinHistoryContext.Provider>
  );
};

export const useCoinHistoryContext = () => {
  return useContext(CoinHistoryContext);
}

export default CoinHistoryProvider;
