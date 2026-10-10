import { CreateMailContextStateType, CreateMailContextValueType, InMailProviderProps } from '@src/lib/types/in-mail-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import _ from 'lodash';
import moment from 'moment';
import React, { createContext, useContext } from 'react';
import { useInMailService } from '../hooks';
import { useInMailContext } from '../provider';

const initialState: CreateMailContextStateType = {
  startDate: null,
  endDate: null,
  // daysOfWeek: [] as any,
  // applicableTiers: [] as any,
  enableCoinBonus: false,
  enableCTA: false,
  isActionButtonEnabled: false,
  gameId: null,
  productId: null,
  url: "",
  contentImage: "url",
  ctaButtonPosition: "CENTER",
  coinBonusButtonPosition: "CENTER",
} as CreateMailContextStateType

export const CreateMailContext = createContext<CreateMailContextValueType>({} as CreateMailContextValueType);

const CreateMailProvider = ({ children }: InMailProviderProps) => {
  const [error, setError ] = React.useState({});
  const { handleCreateMailDialog } = useInMailContext();
  const { state, onSetInitial, onDispatch } = useInputHelper(initialState);
  const { onCreateInMail, onRefreshInMail } = useInMailService();

  const onCreatingMail = React.useCallback(() => {
    const Err: any = {};
    if(!state.subject){
      Err.subject = true
    }
    if(!state.popupDescription){
      Err.popupDescription = true
    }
    if(!state.thumbnailImage){
      Err.thumbnailImage = true
    }
    if(_.isEmpty(state.daysOfWeek)){
      Err.daysOfWeek = true
    }
    if(!state.startDate){
      Err.startDate = true
    }
    if(!state.endDate){
      Err.endDate = true
    }
    if(_.isEmpty(state.applicableTiers)){
      Err.applicableTiers = true
    }

    if(state.enableCoinBonus){
      if(!state.silverAmount && !state.bonusGoldAmount){
        Err.silverAmount = true;
        Err.bonusGoldAmount = true;
      }
    }
    if(state.enableCTA){
      if(state.ctaType === "GAME" && !state.gameId){
        Err.gameId = true
      }
      if(state.ctaType === "PRODUCT" && !state.productId){
        Err.productId = true
      }
      if(state.ctaType === "URL" && !state.url){
        Err.url = true
      }
      if(!state.ctaType){
        Err.enableCTA = true
      }
    }

    setError(Err);

    if(_.isEmpty(Err)){

      const params: any = {
        subject: state.subject,
        popupDescription: state.popupDescription,
        contentImage: state.contentImage,
        thumbnailImage: state.thumbnailImage,
        daysOfWeek: state.daysOfWeek,
        applicableTiers: state.applicableTiers,
        time: moment().format("HH:mmZ"),
        startDate: state.startDate.format('YYYY-MM-DD'),
        endDate: state.endDate.format('YYYY-MM-DD'),
        isActionButtonEnabled: state.isActionButtonEnabled,
      };

      if(state.enableCoinBonus){
        params.isActionButtonEnabled = true;
        params.actionButtonType = state.actionButtonType;
        params.enableCoinBonus = state.enableCoinBonus;
        params.silverAmount = state.silverAmount;
        params.bonusGoldAmount = state.bonusGoldAmount;
        params.coinBonusButtonImage = state.coinBonusButtonImage;
        params.coinBonusButtonPosition = state.coinBonusButtonPosition;
        params.ctaButtonName = state.ctaButtonName;
        params.ctaButtonColor = state.ctaButtonColor;
      }else if(state.enableCTA){
        params.isActionButtonEnabled = true;
        if(state.ctaType === "GAME"){
          params.gameId = state.gameId?.id;
        }else if(state.ctaType === "PRODUCT"){
          params.productId = state.productId?.id;
        }else if(state.ctaType === "URL"){
          params.url = state.url;
        }
        params.actionButtonType = state.actionButtonType;
        params.ctaButtonImage = state.ctaButtonImage;
        params.ctaButtonPosition = state.ctaButtonPosition;
        params.ctaButtonName = state.ctaButtonName;
        params.ctaButtonColor = state.ctaButtonColor;
        params.ctaType = state.ctaType;
      }

      console.log("paramsparams", params)

      onCreateInMail.mutate(params,
        {
          onSuccess: () => {
            handleCreateMailDialog();
            onRefreshInMail();
            onSetInitial(initialState);
          }
        }
      );
    }
  }, [state, handleCreateMailDialog, onCreateInMail, onRefreshInMail, onSetInitial]);

  const value = {
    state,
    error,
    onDispatch,
    isCreatingMail: onCreateInMail.isPending,
    onCreatingMail,
  };

  React.useEffect(() => {
    if(!_.isEmpty(error)){
      setError({});
    }
  },[state, error]);

  return (
    <CreateMailContext.Provider value={value}>
      {children}
    </CreateMailContext.Provider>
  );
};

export const useCreateMailContext = () => {
  return useContext(CreateMailContext);
}

export default CreateMailProvider;
