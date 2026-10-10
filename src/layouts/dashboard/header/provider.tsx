import React, { Dispatch, ReactElement, SetStateAction, createContext, useContext, useState } from 'react';

interface ContextValue {
  createUserVisible: boolean;
  openUpdateUserDialog: boolean;
  setCreateUserVisible: Dispatch<SetStateAction<boolean>>;
  setOpenUpdateUserDialog: Dispatch<SetStateAction<boolean>>;
}

export const HeaderContext = createContext<ContextValue>({} as ContextValue);

interface ProviderProps {
  children: ReactElement;
}

const HeaderProvider = ({ children }: ProviderProps) => {
  const [createUserVisible, setCreateUserVisible] = useState<boolean>(false);
  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState<boolean>(false);

  const value = {
    createUserVisible,
    openUpdateUserDialog,
    setCreateUserVisible,
    setOpenUpdateUserDialog,
  };

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
}

export default HeaderProvider;
