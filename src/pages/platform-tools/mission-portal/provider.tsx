import { MissionContextStateType, MissionContextValueType, MissionProviderProps } from '@src/lib/types/missions-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import { ChangeEvent, createContext, useCallback, useContext } from 'react';
import _debounce from 'lodash/debounce';

const initialState: MissionContextStateType = {
  page: 0,
  order: 'desc',
  orderBy: 'enrollmentDate',
  rowsPerPage: 10,
  editDetails: {},
  createMailOpen: false,
  name: "",
  search: ""
}

export const MissionContext = createContext<MissionContextValueType>({} as MissionContextValueType);

const MissionProvider = ({ children }: MissionProviderProps) => {
  const { state, onDispatch } = useInputHelper(initialState);

  const debouncedSearchFn = (value: string) => {
    onDispatch('page')(0);
    onDispatch('name')(value);
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

  const handleMissionDetails = (item: any) => {
    onDispatch('editDetails')(item);
  }

  const handleCreateMailDialog = () => {
    onDispatch('createMailOpen')(!state.createMailOpen);
  }

  const value = {
    state,
    onDispatch,
    handleSearch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleMissionDetails,
    handleCreateMailDialog,
  };

  return (
    <MissionContext.Provider value={value}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissionContext = () => {
  return useContext(MissionContext);
}

export default MissionProvider;
