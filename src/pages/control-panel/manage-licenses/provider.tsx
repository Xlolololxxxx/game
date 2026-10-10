import { ChangeEvent, createContext, useCallback, useContext } from "react";
import _debounce from 'lodash/debounce';

import { ManageLicensesContextStateType, ManageLicensesContextValueType, ManageLicensesProviderProps } from "@src/lib/types/control-panel";

import { useInputHelper } from "@src/utils/inputs-helper";

const initialState: ManageLicensesContextStateType = {
    page: 0,
    size: 10,
    rowsPerPage: 10,
    selectedLicense: null,
    anchorEl: null,
    search: '',
    status: '',
    order: '',
    orderBy: 'createdAt',
    debouncedSearch: '',
}

const ManageLicensesContext = createContext<ManageLicensesContextValueType>({} as ManageLicensesContextValueType);

const ManageLicensesProvider = ({ children }: ManageLicensesProviderProps) => {
    const { state, onDispatch } = useInputHelper(initialState);

    const handleOpenMenu = (item: any) => (event: any) => {
        onDispatch('anchorEl')(event.currentTarget);
        onDispatch('selectedLicense')(item);
    };

    const handleCloseMenu = () => {
        onDispatch('menuOpen')(false);
        onDispatch('anchorEl')(null);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = state.orderBy === property && state.order === 'asc';
        onDispatch('order')(isAsc ? 'desc' : 'asc');
        onDispatch('orderBy')(property);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        onDispatch('page')(newPage);
    };

    const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        onDispatch('size')(event.target.value);
    };

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

    const value = {
        state,
        onDispatch,
        handleOpenMenu,
        handleCloseMenu,
        handleRequestSort,
        handlePageChange,
        handleRowsPerPageChange,
        handleSearch,
    };

    return (
        <ManageLicensesContext.Provider value={value}>
            {children}
        </ManageLicensesContext.Provider>
    )
};

export const useManageLicensesContext = () => {
    return useContext(ManageLicensesContext);
};

export default ManageLicensesProvider;