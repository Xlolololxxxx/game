import _debounce from 'lodash/debounce';
import { ChangeEvent, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';

import { useAccessControlContext } from '@src/context/AccessControl';

import { UsersAccess } from '@src/lib/types/access-control';
import {
    UserFilterFormType,
    UsersAPIParams, UsersContextStateType, UsersContextValueType, UsersProviderProps
} from '@src/lib/types/users';

import { useInputHelper } from "@src/utils/inputs-helper";
import { pluck } from '@src/utils/pluck';

import moment from 'moment';
import ActionMenu from "./menu";

const initialState: UsersAPIParams & UsersContextStateType = {
    search: '',
    debouncedSearch: '',
    email: '',
    fromDate: '',
    isDeleted: false,
    name: '',
    page: 0,
    partnerID: 0,
    size: 10,
    sort: '',
    toDate: '',
    userID: 0,
    userTypeID: 0,
    selectedUser: {
        emailAddress: '',
        partnerID: {
            id: 0,
            partnerName: undefined,
            isActive: undefined,
            createdDate: undefined,
            hibernateLazyInitializer: undefined
        },
        id: 0,
        phoneNumber: null,
        userTypeID: 0
    },
    userdetails: {},
    open: false,
    anchorEl: null,
    moreDetailsOpen: false,
    editingDetails: false,
    editBalanceOpen: false,
    editTierLevelOpen: false,
    filterSidebarOpen: false,
    showDemographics: false,
    selectedDemographicCategory: 'gender',
};

const UsersContext = createContext<UsersContextValueType>({} as UsersContextValueType);

const UsersProvider = ({ children }: UsersProviderProps) => {
    const tableContainerRef = useRef<any>(null);
    const [screen, setScreen] = useState<string>("");
    const { state: accessControlState } = useAccessControlContext();
    const accessControl: UsersAccess = pluck(accessControlState, 'access.users');
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchKey');

    const { state, onDispatch, onSetInitial } = useInputHelper(initialState);

    const onToggleOpen = (val?: boolean) => {
        if (val || !state.open)
            onDispatch('open')(typeof val === 'boolean' ? val : !state.open);
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        onDispatch('page')(newPage);
    }

    const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        onDispatch('size')(event.target.value);
    }

    const handleOpenMenu = (item: any) => (event: any) => {
        onDispatch('anchorEl')(event.currentTarget);
        onDispatch('selectedUser')(item);
        onToggleOpen(true);
    }

    const handleCloseMenu = () => {
        onDispatch('open')(false);
        onDispatch('anchorEl')(null);
    }

    const handleOpenMoreDetails = () => {
        onDispatch('moreDetailsOpen')(true);
    }

    const handleCloseMoreDetails = () => {
        onDispatch('moreDetailsOpen')(false);
        onDispatch('selectedUser')(null);
        onDispatch('editingDetails')(false);
    }

    const handleEditDetails = () => {
        onDispatch('editingDetails')(true);
    }

    const handleOpenUpdateBalance = () => {
        onDispatch('editBalanceOpen')(true);
    }

    const handleCloseUpdateBalance = () => {
        onDispatch('editBalanceOpen')(false);
    }

    const handleOpenUpdateTierLevel = () => {
        onDispatch('editTierLevelOpen')(true);
    }

    const handleCloseUpdateTierLevel = () => {
        onDispatch('editTierLevelOpen')(false);
    }

    const handleOpenFilterSidebar = () => {
        onDispatch('filterSidebarOpen')(true);
    }

    const handleCloseFilterSidebar = () => {
        onDispatch('filterSidebarOpen')(false);
    }

    const handleApplyFilter = (formData: UserFilterFormType) => {
        onDispatch('fromDate')(formData.fromDate ? moment(formData.fromDate).format("YYYY-MM-DD") : null);
        onDispatch('toDate')(formData.toDate ? moment(formData.toDate).format("YYYY-MM-DD") : null);
        onDispatch('filterSidebarOpen')(false);
    }

    const handleClearFilters = () => {
        onDispatch('page')(0);
        onDispatch('search')("");
        onDispatch('debouncedSearch')("");
        onDispatch('fromDate')(null);
        onDispatch('toDate')(null);
        onDispatch('startDate')(null);
        onDispatch('endDate')(null);
        onDispatch('filterSidebarOpen')(false);
    }

    const handleToggleUserDemographics = (value?: boolean) => {
        onDispatch('showDemographics')(!state.showDemographics);
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

    const handleRequestSort = (property: string) => {
        const isAsc = state.orderBy === property && state.order === 'asc';
        onDispatch('order')(isAsc ? 'desc' : 'asc');
        onDispatch('orderBy')(property);
    };

    const debouncedSearchFn = (value: string) => {
        onDispatch('page')(0);
        onDispatch('debouncedSearch')(value);

        // merge search params
        const currentParams = Object.fromEntries(searchParams.entries());
        setSearchParams({ ...currentParams, searchKey: value });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebouncedSearch = useCallback(_debounce(debouncedSearchFn, 1000), [searchParams]);

    const handleSearch = (value: string) => {
        onDispatch('search')(value);
        handleDebouncedSearch(value);
    };

    const handleReset = () => {
        onSetInitial(initialState);
    };

    useEffect(() => {
        onDispatch('search')(searchQuery || "");
        onDispatch('debouncedSearch')(searchQuery || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const value = {
        screen, setScreen,
        state,
        accessControl,
        onDispatch,
        handleReset,
        handlePageChange,
        handleOpenMenu,
        tableContainerRef,
        handleScrollLeft,
        handleScrollRight,
        handleRequestSort,
        handleRowsPerPageChange,
        handleSearch,
        handleApplyFilter,
        handleClearFilters,
        handleOpenMoreDetails,
        handleCloseMoreDetails,
        handleEditDetails,
        handleOpenUpdateBalance,
        handleCloseUpdateBalance,
        handleOpenUpdateTierLevel,
        handleCloseUpdateTierLevel,
        handleOpenFilterSidebar,
        handleCloseFilterSidebar,
        handleToggleUserDemographics,
    };

    return (
        <UsersContext.Provider value={value}>
            {children}
            <ActionMenu
                selectedUser={state.selectedUser}
                open={state.open}
                handleCloseMenu={handleCloseMenu}
            />
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    return useContext(UsersContext);
}

export default UsersProvider;