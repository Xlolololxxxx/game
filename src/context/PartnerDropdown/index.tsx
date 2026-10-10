import { PartnerDropdownContextStateType, PartnerDropdownContextValueType, PartnerDropdownProviderProps } from "@src/lib/types/partner-provider";
import Config from "@src/utils/api/config";
import { useInputHelper } from "@src/utils/inputs-helper";
import * as TokenHelper from "@src/utils/token-helper";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const initialState: PartnerDropdownContextStateType = {
	selectedPartnerId: Config.PARTNER_ID,
}

const PartnerDropdownContext = createContext<PartnerDropdownContextValueType>({} as PartnerDropdownContextValueType);

export const PartnerDropdownProvider = ({ children }: PartnerDropdownProviderProps) => {
	const { pathname } = useLocation();
	const { state, onDispatch, handleFormReset } = useInputHelper(initialState);

	const handleSelectPartner = (value: PartnerDropdownContextStateType) => {
		onDispatch('selectedPartnerId')(value);
		TokenHelper.setProviderID(String(value));
	};

	const partner = useMemo(() => {
		switch(state.selectedPartnerId){
			case 1: case "1": default:
				return 'fortune8';
			case 2: case "2":
				return 'gamezone';
			case 3: case "3":
				return 'palmsplay';
			case 4: case "4":
				return 'palmssport';
			case 5: case "5":
				return 'gambly';
		}
	},[state?.selectedPartnerId]);

	const value = {
		state,
		partner,
		onDispatch,
		handleSelectPartner,
		handleFormReset,
	};

	useEffect(() => {
		if(pathname === "/login"){
			TokenHelper.setProviderID(String(Config.PARTNER_ID));
			onDispatch('selectedPartnerId')(Config.PARTNER_ID);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[pathname]);

	useEffect(() => {
		onDispatch('selectedPartnerId')(TokenHelper.getProviderID() || Config.PARTNER_ID);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return (
		<PartnerDropdownContext.Provider value={value}>
			{children}
		</PartnerDropdownContext.Provider>
	)
}

export const usePartnerDropdownContext = () => {
	return useContext(PartnerDropdownContext);
};