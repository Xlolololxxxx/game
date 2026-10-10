import { CodeGeneratorContextStateType, CodeGeneratorContextValueType, CodeGeneratorProviderProps } from '@src/lib/types/code-generator';
import { useInputHelper } from '@src/utils/inputs-helper';
import _debounce from 'lodash/debounce';
import moment from 'moment';
import { ChangeEvent, createContext, useCallback, useContext } from 'react';
import ActionMenu from './menu';

const initialState: CodeGeneratorContextStateType = {
  page: 0,
  order: 'desc',
  orderBy: 'enrollmentDate',
  rowsPerPage: 10,
  editDetails: {},
  createOpen: false,
  name: "",
  search: "",
  filterSidebarOpen: false,
  open: false,
  openDetails: false,
  anchorEl: null,
  fromDate: null,
  toDate: null,
  type: "",
  status: "",
}

export const CodeGeneratorContext = createContext<CodeGeneratorContextValueType>({} as CodeGeneratorContextValueType);

const CodeGeneratorProvider = ({ children }: CodeGeneratorProviderProps) => {
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

  const handleCreateOpen = () => {
    onDispatch('createOpen')(!state.createOpen);
  }

  const handleOpenFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(true);
  }

  const handleCloseFilterSidebar = () => {
    onDispatch('filterSidebarOpen')(false);
  }

  const handleApplyFilter = (formData: any) => {
    onDispatch('filterSidebarOpen')(false);
    // onDispatch('fromDate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null);
    // const updatedDate = new Date(formData?.toDate); // Clone the date to avoid mutation
    // updatedDate.setHours(23, 59, 0, 0); // 
    // onDispatch('toDate')(updatedDate);
    onDispatch('fromDate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DD") : null);
    onDispatch('toDate')(formData.toDate ? moment(formData.toDate).format("YYYY-MM-DD") : null);
    onDispatch('status')(formData.status);
  }

  const handleClearFilters = () => {
    onDispatch('filterSidebarOpen')(false);
    onDispatch('fromDate')(null);
    onDispatch('toDate')(null);
    onDispatch('status')("");
    onDispatch('type')("");
  }

  const handleOpenMenu = (item: any) => (event: any) => {
    onDispatch('anchorEl')(event.currentTarget);
    onDispatch('editDetails')(item);
    onDispatch('open')(true);
  }

  const handleCloseMenu = () => {
    onDispatch('open')(false);
    onDispatch('anchorEl')(null);
  }

  const handleCodeGeneratorDetails = () => {
    onDispatch('openDetails')(true);
    onDispatch('open')(false);
    onDispatch('anchorEl')(null);
  }

  const handleCloseDetails = () => {
    onDispatch('openDetails')(false);
    onDispatch('editDetails')(null);
  }

  const value = {
    state,
    onDispatch,
    handleSearch,
    handlePageChange,
    handleRequestSort,
    handleRowsPerPageChange,
    handleCodeGeneratorDetails,
    handleCreateOpen,
    handleApplyFilter,
    handleClearFilters,
    handleOpenFilterSidebar,
    handleCloseFilterSidebar,
    handleOpenMenu,
    handleCloseMenu,
    handleCloseDetails,
  };

  return (
    <CodeGeneratorContext.Provider value={value}>
      {children}
      <ActionMenu
        selectedUser={state.editDetails}
        open={state.open}
        anchorEl={state.anchorEl}
        handleCloseMenu={handleCloseMenu}
        onViewDetails={handleCodeGeneratorDetails}
      />
    </CodeGeneratorContext.Provider>
  );
};

export const useCodeGeneratorContext = () => {
  return useContext(CodeGeneratorContext);
}

export default CodeGeneratorProvider;
