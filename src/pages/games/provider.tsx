import _debounce from 'lodash/debounce';
import { ChangeEvent, createContext, useCallback, useContext, useRef } from 'react';

import { useAccessControlContext } from '@src/context/AccessControl';

import { useInputHelper } from '@src/utils/inputs-helper';
import { pluck } from '@src/utils/pluck';

import { GamesContextStateType, GamesContextValueType, GamesProviderProps } from '@src/lib/types/games';
import { Access } from '@src/lib/types/access-control';

import ActionMenu from './menu';

const initialState: GamesContextStateType = {
  open: '',
  anchorEl: null,
  page: 0,
  provider: null,
  order: '',
  orderBy: '',
  search: '',
  debouncedSearch: '',
  rowsPerPage: 10,
  selectedGame: null,
  gamedetails: {},
  viewDetailsOpen: false,
  editDetailsOpen: false,
}

const GamesContext = createContext<GamesContextValueType>({} as GamesContextValueType);

const GamesProvider = ({ children }: GamesProviderProps) => {
  const tableContainerRef = useRef<any>(null);
  const { state, onDispatch } = useInputHelper(initialState);

  const { state: accessControlState } = useAccessControlContext();
  const accessControl: Access['games'] = pluck(accessControlState, 'access.games');

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

  const onToggleOpen = (val?: boolean) => {
    onDispatch('open')(typeof val === 'boolean' ? val : !state.open);
  }

  const handleOpenMenu = (item: any) => (event: any) => {
    onDispatch('anchorEl')(event.currentTarget);
    onDispatch('selectedGame')(item);
    onToggleOpen(true);
  }

  const handleCloseMenu = () => {
    onToggleOpen(false);
    onDispatch('anchorEl')(null);
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

  const handleOpenMoreDetails = () => {
    handleCloseMenu();
    onDispatch('viewDetailsOpen')(true);
  };

  const handleCloseMoreDetails = () => {
    handleCloseMenu();
    onDispatch('selectedGame')(null);
    onDispatch('viewDetailsOpen')(false);
  };

  const handleOpenEditDetails = () => {
    handleCloseMenu();
    onDispatch('editDetailsOpen')(true);
  };

  const handleCloseEditDetails = () => {
    handleCloseMenu();
    onDispatch('selectedGame')(null);
    onDispatch('editDetailsOpen')(false);
  };

  const handleScrollLeft = useCallback(() => {
    if (tableContainerRef.current) {
        tableContainerRef.current.scrollLeft -= 100;
    }
}, []);

const handleScrollRight = useCallback(() => {
    if (tableContainerRef.current) {
        tableContainerRef.current.scrollLeft += 100;
    }
}, []);

  const value = {
    state,
    accessControl,
    tableContainerRef,
    handleScrollLeft,
    handleScrollRight,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleOpenMenu,
    handleCloseMenu,
    handleSearch,
    handleOpenEditDetails,
    handleCloseEditDetails,
    handleOpenMoreDetails,
    handleCloseMoreDetails,
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
      <ActionMenu />
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  return useContext(GamesContext);
}

export default GamesProvider;
