/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from 'react';

import { GenerateProgramsAPIParams, ProgramsContextStateType, ProgramsContextValueType, ProgramsProviderProps } from '@src/lib/types/programs';
import { useAuthService } from '@src/store/hooks';
import { generateMonthlyOptions } from '@src/utils/filter-helper';
import { useInputHelper } from '@src/utils/inputs-helper';
import moment from 'moment';

const initialState: ProgramsContextStateType = {
  gprDate: generateMonthlyOptions()[0].label,
  prDate: generateMonthlyOptions()[0].label,
  gprProviderName: "LION Games",
  prProviderName: "LION Games",
  selectedItem: null,
  gprMonth: generateMonthlyOptions()[0].month,
  gprYear: generateMonthlyOptions()[0].year,
  prMonth: generateMonthlyOptions()[0].month,
  prYear: generateMonthlyOptions()[0].year,
};

export const ProgramContext = createContext<ProgramsContextValueType>({} as ProgramsContextValueType);

const ProgramProvider = ({ children }: ProgramsProviderProps) => {
  const { currentUser } = useAuthService();
  const { state, onDispatch } = useInputHelper(initialState);

  const onSetFormValues = (args: GenerateProgramsAPIParams) => {
    const { gprProviderName, prProviderName, gprDate, prDate, gprMonth, gprYear, prMonth, prYear } = args || {};
    if(gprProviderName) onDispatch('gprProviderName')(gprProviderName);
    if(prProviderName) onDispatch('prProviderName')(prProviderName);
    if(gprDate) onDispatch('gprDate')(gprDate);
    if(prDate) onDispatch('prDate')(prDate);
    if(gprMonth) onDispatch('gprMonth')(gprMonth);
    if(gprYear) onDispatch('gprYear')(gprYear);
    if(prMonth) onDispatch('prMonth')(prMonth);
    if(prYear) onDispatch('prYear')(prYear);
    onDispatch('autogenerate')(+moment());
  };

  const value = {
    state,
    onDispatch,
    onSetFormValues,
  };

  console.log("currentUsercurrentUser", currentUser)

  useEffect(() => {
    onDispatch("gprProviderName")(currentUser?.provider?.providerName || 'LION Games');
    onDispatch("prProviderName")(currentUser?.provider?.providerName || 'LION Games');
  },[currentUser?.provider?.providerName]);

  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgramsContext = () => {
  return useContext(ProgramContext);
}

export default ProgramProvider;
