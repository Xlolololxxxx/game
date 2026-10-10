import { createContext, ReactNode, useContext } from "react";

import { useInputHelper } from "@src/utils/inputs-helper";
import accessControl from "@src/lib/access-control";
import { Access } from "@src/lib/types/access-control";

export type AccessControlProviderState = {
    access: Access | null;
};
export type AccessControlContextValueType = {
    state: AccessControlProviderState;
    handlesetAccessControl: (userTypeID: number) => void
};
export type AccessControlProviderProps = {
    children: ReactNode;
}

const initialState: AccessControlProviderState = {
    access: null
};

const AccessControlContext = createContext<AccessControlContextValueType>({} as AccessControlContextValueType);

export const AccessControlProvider = ({ children }: AccessControlProviderProps) => {
    const { state, onDispatch } = useInputHelper(initialState);

    const handlesetAccessControl = (userTypeID: number) => {
        const accessObject = accessControl[userTypeID];
        onDispatch('access')(accessObject);
    }

    const value = {
        state,
        handlesetAccessControl,
    };

    return (
        <AccessControlContext.Provider value={value}>
            {children}
        </AccessControlContext.Provider>
    )
}

export const useAccessControlContext = () => {
    return useContext(AccessControlContext);
};