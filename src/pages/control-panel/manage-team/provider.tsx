import { ChangeEvent, createContext, useContext } from "react";


import { ManageTeamContextValueType, ManageTeamProviderProps, ManageTeamStateType } from "@src/lib/types/control-panel";

import { useInputHelper } from "@src/utils/inputs-helper";
import ActionMenu from "./menu";
import { useAccessControlContext } from "@src/context/AccessControl";
import { ControlPanelAccess } from "@src/lib/types/access-control";
import { pluck } from "@src/utils/pluck";

const initialState: ManageTeamStateType = {
    size: 10,
    menuOpen: false,
    inviteDialogOpen: false,
    updateUserDialogOpen: false,
    selectedUser: null,
    anchorEl: null,
}

const ManageTeamContext = createContext<ManageTeamContextValueType>({} as ManageTeamContextValueType);

const ManageTeamProvider = ({ children }: ManageTeamProviderProps) => {
    const { state, onDispatch } = useInputHelper(initialState);
    const { state: accessControlState } = useAccessControlContext();
    const accessControl: ControlPanelAccess = pluck(accessControlState, 'access.controlPanel');

    const _onToggleOpen = (val?: boolean) => {
        if (val || !state.menuOpen)
            onDispatch('menuOpen')(typeof val === 'boolean' ? val : !state.menuOpen);
    }

    const handleToggleInviteModal = (value?: boolean) => {
        if (typeof value === 'boolean') onDispatch('inviteDialogOpen')(value);
        onDispatch('inviteDialogOpen')(!state.inviteDialogOpen);
    }

    const handleToggleUpdateUserModal = (value?: boolean) => {
        if (typeof value === 'boolean') onDispatch('updateUserDialogOpen')(value);
        onDispatch('updateUserDialogOpen')(!state.updateUserDialogOpen);
    }

    const handleRequestSort = (property: string) => {
        const isAsc = state.orderBy === property && state.order === 'asc';
        onDispatch('order')(isAsc ? 'desc' : 'asc');
        onDispatch('orderBy')(property);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        onDispatch('page')(newPage);
    }

    const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        onDispatch('size')(event.target.value);
    }

    const handleOpenMenu = (item: any) => (event: any) => {
        onDispatch('anchorEl')(event.currentTarget);
        onDispatch('selectedUser')(item);
        _onToggleOpen(true);
    }

    const handleCloseMenu = () => {
        onDispatch('menuOpen')(false);
        onDispatch('anchorEl')(null);
    }

    const value = {
        state,
        accessControl,
        onDispatch,
        handleOpenMenu,
        handleCloseMenu,
        handleToggleInviteModal,
        handleToggleUpdateUserModal,
        handleRequestSort,
        handlePageChange,
        handleRowsPerPageChange,
    };

    return (
        <ManageTeamContext.Provider value={value}>
            {children}
            <ActionMenu />
        </ManageTeamContext.Provider>
    )
};

export const useManageTeamContext = () => {
    return useContext(ManageTeamContext);
};

export default ManageTeamProvider;