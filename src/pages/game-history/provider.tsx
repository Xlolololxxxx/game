import { GameHistoryContextStateType, GameHistoryContextValueType, GameHistoryProviderProps } from '@src/lib/types/game-history';
import { useInputHelper } from '@src/utils/inputs-helper';
import moment from 'moment';
import { ChangeEvent, createContext, useContext } from 'react';

const initialState: GameHistoryContextStateType = {
  page: 0,
  order: 'desc',
  orderBy: 'CreatedDate',
  rowsPerPage: 10,
  fromDate: null,
  toDate: null,
}

export const GameHistoryContext = createContext<GameHistoryContextValueType>({} as GameHistoryContextValueType);

const GameHistoryProvider = ({ children }: GameHistoryProviderProps) => {
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
  };

  const handleOpenFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(true);
  };

  const handleCloseFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(false);
  };

  const handleApplyFilter = (formData: any) => {
    onDispatch('filterSidebarOpen')(false);
    onDispatch('fromDate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DD") : null);
    // const updatedDate = new Date(formData?.toDate); // Clone the date to avoid mutation
    // updatedDate.setHours(23, 59, 0, 0); // 
    // onDispatch('toDate')(updatedDate);
    onDispatch('currency')(formData.currency);
    onDispatch('toDate')(formData.toDate ? moment(formData.toDate).format("YYYY-MM-DD") : null);
  }

  const handleClearFilters = () => {
    onDispatch('fromDate')(null);
    onDispatch('toDate')(null);
    onDispatch('currency')(null);
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
    <GameHistoryContext.Provider value={value}>
      {children}
    </GameHistoryContext.Provider>
  );
};

export const useGameHistoryContext = () => {
  return useContext(GameHistoryContext);
}

export default GameHistoryProvider;
