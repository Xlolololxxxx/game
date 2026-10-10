import React, { ChangeEvent, createContext, useCallback, useContext } from 'react';
import _debounce from 'lodash/debounce';

import { useInputHelper } from '@src/utils/inputs-helper';

import { MostPlayedContextStateType, MostPlayedContextValueType, MostPlayedProviderProps } from '@src/lib/types/most-played';
import { useNavigate } from 'react-router-dom';
import ActionMenu from './menu';
import { useAccessControlContext } from '@src/context/AccessControl';
import { pluck } from '@src/utils/pluck';
import { Access } from '@src/lib/types/access-control';
import { useGamesContext } from '../games/provider';

const initialState: MostPlayedContextStateType = {
  open: '',
  anchorEl: null,
  page: 0,
  provider: null,
  order: 'desc',
  orderBy: 'totalSilverBet',
  search: '',
  debouncedSearch: '',
  rowsPerPage: 10,
  filterSidebarOpen: false,
  selectedGame: null,
  editDetailsOpen: false,
}

export const MostPlayedContext = createContext<MostPlayedContextValueType>({} as MostPlayedContextValueType);

const MostPlayedProvider = ({ children }: MostPlayedProviderProps) => {
  const navigate = useNavigate();

  const { onDispatch: ONDISPATCH } = useGamesContext();
  const { state, onDispatch } = useInputHelper(initialState);
  const { state: accessControlState } = useAccessControlContext();
  const accessControl: Access['mostPlayed'] = pluck(accessControlState, 'access.mostPlayed');
  const handlePageChange = (event: unknown, newPage: number) => {
    onDispatch('page')(newPage);
  }

  const handleRequestSort = (property: string) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    const order = isAsc ? 'desc' : 'asc';
    navigate(`/dashboard/mostplayed?sort=${order}&sortBy=${property}`);
    onDispatch('order')(order);
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
    ONDISPATCH('selectedGame')(item);
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

  const handleOpenFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(true);
  }

  const handleCloseFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(false);
  }

  const handleClearFilters = () => {
    onDispatch('fromDate')(null);
    onDispatch('toDate')(null);
    onDispatch('filterSidebarOpen')(false);
  }

  const handleOpenEditDetails = () => {
    handleCloseMenu();
    onDispatch('editDetailsOpen')(true);
  };

  const handleCloseEditDetails = () => {
    handleCloseMenu();
    onDispatch('selectedGame')(null);
    onDispatch('editDetailsOpen')(false);
  };

  const value = {
    state,
    accessControl,
    onDispatch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleOpenMenu,
    handleCloseMenu,
    handleSearch,
    handleClearFilters,
    handleOpenFilterSidebar,
    handleCloseFilterSidebar,
    handleOpenEditDetails,
    handleCloseEditDetails
  };

  return (
    <MostPlayedContext.Provider value={value}>
      {children}
      <ActionMenu />
    </MostPlayedContext.Provider>
  );
};

export const useMostPlayedContext = () => {
  return useContext(MostPlayedContext);
}

export default MostPlayedProvider;
