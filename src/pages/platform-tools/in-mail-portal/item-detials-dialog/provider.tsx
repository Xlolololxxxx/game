import { CreateMailContextStateType, InMailProviderProps, UpdateMailContextValueType } from '@src/lib/types/in-mail-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { createContext, useContext } from 'react';
import { useInMailService } from '../hooks';
import { useInMailContext } from '../provider';

const initialState: CreateMailContextStateType = {
  subject: "",
  popupDescription: "",
  contentImage: "",
  thumbnailImage: "",
  startDate: null,
  endDate: null,
  daysOfWeek: [] as any,
  applicableTiers: [] as any,
  enableCoinBonus: false,
  enableCTA: false,
  isActionButtonEnabled: false,
  productId: null,
  gameId: null,
  silverAmount: "",
  bonusGoldAmount: "",
  url: "",
} as CreateMailContextStateType

export const UpdateMailContext = createContext<UpdateMailContextValueType>({} as UpdateMailContextValueType);

const UpdateMailProvider = ({ children }: InMailProviderProps) => {
  const { state, onDispatch, onSetInitial } = useInputHelper(initialState);
  const [enableEdit, setEnableEdit ] = React.useState(false);
  const { handleMailDetails } = useInMailContext();
  const [error] = React.useState({});
  const { products, games, getMailDetails, updateMailStatus, updateMailDetails, 
    onRefreshInMail } = useInMailService({ getInMailDetails: true});

  const onUpdateMailDetails = React.useCallback(() => {
    const params = {...state};
    params.startDate = state.startDate?.format('YYYY-MM-DD');
    params.endDate = state.endDate?.format('YYYY-MM-DD');
    if(state.ctaType === "GAME"){
      params.gameId = state.gameId?.id;
    }else if(state.ctaType === "PRODUCT"){
      params.productId = state.productId?.id;
    }else if(state.ctaType === "URL"){
      params.url = state.url;
    }

    updateMailDetails.mutate(params);
  }, [state, updateMailDetails]);

  const onUpdateMailStatus = React.useCallback(() => {
    updateMailStatus.mutate({
      id: state.id,
      isActive: !state.isActive,
    });
  }, [state, updateMailStatus]);

  const value = {
    state,
    error,
    enableEdit,
    setEnableEdit,
    onDispatch,
    onUpdateMailDetails,
    onUpdateMailStatus,
  };

  React.useEffect(() => {
    if(updateMailStatus.isSuccess || updateMailDetails.isSuccess){
      onRefreshInMail();
      handleMailDetails({});
    }
  },[updateMailStatus.isSuccess, updateMailDetails.isSuccess, handleMailDetails, onRefreshInMail]);

  React.useEffect(() => {
    if(!_.isEmpty(getMailDetails) && !_.isEmpty(products) && !_.isEmpty(games)){
      const params = {
        ...initialState,
        ...getMailDetails,
        startDate: getMailDetails.startDate ? dayjs(getMailDetails.startDate) : null,
        endDate: getMailDetails.endDate ? dayjs(getMailDetails.endDate) : null,
      };

      if(getMailDetails.ctaType && getMailDetails.ctaType === "PRODUCT"){
        params.productId = _.find(products, { 'id': getMailDetails.productId });
      }else if(getMailDetails.ctaType && getMailDetails.ctaType === "GAME"){
        params.gameId = _.find(games, { 'id': getMailDetails.gameId });
      }

      onSetInitial(params);
    }
  },[getMailDetails, products, games, onSetInitial]);

  return (
    <UpdateMailContext.Provider value={value}>
      {children}
    </UpdateMailContext.Provider>
  );
};

export const useUpdateMailContext = () => {
  return useContext(UpdateMailContext);
}

export default UpdateMailProvider;
