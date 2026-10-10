import { ChangeEvent, createContext, useContext } from "react";

import { LicenseFormModes, ManagePartnersContextValueType, ManagePartnersProviderProps, ManagePartnersStateType, PartnerFormModes } from "@src/lib/types/control-panel";
import { useInputHelper } from "@src/utils/inputs-helper";
import ActionMenu from "./menu";
import { useAccessControlContext } from "@src/context/AccessControl";
import { pluck } from "@src/utils/pluck";
import { ControlPanelAccess } from "@src/lib/types/access-control";

const initialState: ManagePartnersStateType = {
    size: 10,
    menuOpen: false,
    viewDetailsDialogOpen: false,
    partnerDialogOpen: false,
    createPartnerSuccessDialogOpen: false,
    generateLicenseKeyDialogOpen: false,
    selectedPartner: null,
    anchorEl: null,
    licenseFormMode: 'create',
    partnerFormMode: 'create',
}

const ManagePartnersContext = createContext<ManagePartnersContextValueType>({} as ManagePartnersContextValueType);

const ManagePartnersProvider = ({ children }: ManagePartnersProviderProps) => {
    const { state, onDispatch } = useInputHelper(initialState);
    const { state: accessControlState } = useAccessControlContext();
    const accessControl: ControlPanelAccess = pluck(accessControlState, 'access.controlPanel');


    const _onToggleOpen = (val?: boolean) => {
        if (val || !state.menuOpen)
            onDispatch('menuOpen')(typeof val === 'boolean' ? val : !state.menuOpen);
    }

    const handleToggleOpenViewDetailsModal = (value?: boolean) => {
        if (typeof value === 'boolean') onDispatch('viewDetailsDialogOpen')(value);
        onDispatch('viewDetailsDialogOpen')(!state.viewDetailsDialogOpen);
    }

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

    const handleOpenMenu = (item: any) => (event: any) => {
        onDispatch('anchorEl')(event.currentTarget);
        onDispatch('selectedPartner')(item);
        _onToggleOpen(true);
    };

    const handleCloseMenu = () => {
        onDispatch('menuOpen')(false);
        onDispatch('anchorEl')(null);
    };

    const handleToggleOpenPartnerModal = (value?: boolean, mode?: PartnerFormModes) => {
        if (typeof value === 'boolean') onDispatch('partnerDialogOpen')(value);
        if (typeof value !== 'boolean') onDispatch('partnerDialogOpen')(!state.partnerDialogOpen);
        if (mode) onDispatch('partnerFormMode')(mode);
    };

    const handleToggleOpenCreatePartnerSuccessModal = (value?: boolean) => {
        if (typeof value === 'boolean') onDispatch('createPartnerSuccessDialogOpen')(value);
        if (typeof value !== 'boolean') onDispatch('createPartnerSuccessDialogOpen')(!state.createPartnerSuccessDialogOpen);
    };

    const handleToggleOpenGenerateLicenseModal = (value?: boolean, mode?: LicenseFormModes) => {
        if (typeof value === 'boolean') onDispatch('generateLicenseKeyDialogOpen')(value);
        if (typeof value !== 'boolean') onDispatch('generateLicenseKeyDialogOpen')(!state.generateLicenseKeyDialogOpen);
        if (mode) onDispatch('licenseFormMode')(mode);
    };

    const handleViewPartner = () => {
        onDispatch('licenseFormMode')('view');
    };

    const handleUpdatePartnerInfo = () => {
        onDispatch('partnerFormMode')('edit');
    }

    const value = {
        state,
        accessControl,
        onDispatch,
        handleOpenMenu,
        handleCloseMenu,
        handleToggleOpenViewDetailsModal,
        handleRequestSort,
        handlePageChange,
        handleRowsPerPageChange,
        handleToggleOpenPartnerModal,
        handleToggleOpenCreatePartnerSuccessModal,
        handleToggleOpenGenerateLicenseModal,
        handleViewPartner,
        handleUpdatePartnerInfo,
    };

    return (
        <ManagePartnersContext.Provider value={value}>
            {children}
            <ActionMenu />
        </ManagePartnersContext.Provider>
    )
};

export const useManagePartnersContext = () => {
    return useContext(ManagePartnersContext);
};

export default ManagePartnersProvider;