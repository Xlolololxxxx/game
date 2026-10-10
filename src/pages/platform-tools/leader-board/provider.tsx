import {
	LeaderBoardAPIParams, LeaderBoardContextStateType, LeaderBoardContextValueType,
	LeaderBoardProviderProps
} from '@src/lib/types/leaderboard';
import { ChangeEvent, createContext, useContext } from "react";
import { useInputHelper } from "@src/utils/inputs-helper";

const initialState: LeaderBoardAPIParams & LeaderBoardContextStateType = {
    email: '',
    fromDate: '',
    isDeleted: false,
    name: '',
    page: 0,
    partnerID: 0,
    size: 10,
    sort: '',
    toDate: '',
		coinTypeId: 1,
		week: null,
		year: null,
    open: false,
    anchorEl: null,
    filterSidebarOpen: false,
};

const LeaderBoardContext = createContext<LeaderBoardContextValueType>({} as LeaderBoardContextValueType);

const LeaderBoardProvider = ({ children }: LeaderBoardProviderProps) => {
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

	const handleOpenFilterSidebar = () => {
		onDispatch('filterSidebarOpen')(true);
	}

	const handleCloseFilterSidebar = () => {
		onDispatch('filterSidebarOpen')(false);
	}

	const handleClearFilters = () => {
		onDispatch('page')(0);
		onDispatch('week')(null);
		onDispatch('year')(null);
		onDispatch('filterSidebarOpen')(false);
	}

	const handleRequestSort = (property: string) => {
		const isAsc = state.orderBy === property && state.order === 'asc';
		onDispatch('order')(isAsc ? 'desc' : 'asc');
		onDispatch('orderBy')(property);
	};

	const handleSwitchCoinType = (coinTypeId: number) => {
		onDispatch('coinTypeId')(coinTypeId);
	};

	const handleReset = () => {
		onSetInitial(initialState);
	};

	const value = {
		state,
		onDispatch,
		handleReset,
		handlePageChange,
		handleOpenMenu,
		handleRequestSort,
		handleRowsPerPageChange,
		handleClearFilters,
		handleOpenFilterSidebar,
		handleCloseFilterSidebar,
		handleSwitchCoinType
	};

	return (
		<LeaderBoardContext.Provider value={value}>
			{children}
		</LeaderBoardContext.Provider>
	)
}

export const useLeaderBoardContext = () => {
	return useContext(LeaderBoardContext);
}

export default LeaderBoardProvider;