import { InMailContextStateType, InMailContextValueType, InMailProviderProps } from '@src/lib/types/in-mail-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import { ChangeEvent, createContext, useCallback, useContext } from 'react';
import _debounce from 'lodash/debounce';

const initialState: InMailContextStateType = {
  page: 0,
  order: 'desc',
  orderBy: 'CreatedDate',
  rowsPerPage: 10,
  editDetails: {},
  createMailOpen: false,
  search: "",
  subject: "",
}

export const InMailContext = createContext<InMailContextValueType>({} as InMailContextValueType);

const InMailProvider = ({ children }: InMailProviderProps) => {
  const { state, onDispatch } = useInputHelper(initialState);

  const debouncedSearchFn = (value: string) => {
    onDispatch('page')(0);
    onDispatch('subject')(value);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedSearch = useCallback(_debounce(debouncedSearchFn, 1000), []);

  const handleSearch = (value: string) => {
    onDispatch('search')(value);
    handleDebouncedSearch(value);
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
  }

  const handleMailDetails = (item: any) => {
    onDispatch('editDetails')(item);
  }

  const handleCreateMailDialog = () => {
    onDispatch('createMailOpen')(!state.createMailOpen);
  }

  const value = {
    state,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleMailDetails,
    handleCreateMailDialog,
    handleSearch,
  };

  return (
    <InMailContext.Provider value={value}>
      {children}
    </InMailContext.Provider>
  );
};

export const useInMailContext = () => {
  return useContext(InMailContext);
}

export default InMailProvider;
