import { CreateMissionContextStateType, MissionProviderProps, UpdateMissionContextValueType } from '@src/lib/types/missions-portal';
import { useInputHelper } from '@src/utils/inputs-helper';
import _ from 'lodash';
import React, { createContext, useContext } from 'react';
import { useMissionsService } from '../hooks';
import { useMissionContext } from '../provider';

const initialState: CreateMissionContextStateType = {
  game: null,
  gameCategory: null,
  requiredTimes: "",
  requiredAmount: "",
  rewardedAmount: "",
} as CreateMissionContextStateType

export const UpdateMailContext = createContext<UpdateMissionContextValueType>({} as UpdateMissionContextValueType);

const UpdateMissionProvider = ({ children }: MissionProviderProps) => {
  const { state, onDispatch, onSetInitial } = useInputHelper(initialState);
  const [enableEdit, setEnableEdit ] = React.useState(false);
  const { handleMissionDetails } = useMissionContext();
  const [error] = React.useState({});
  const { getMissionDetails, games, gameCategories,
    updateMissionStatus, updateMissionDetails, 
    onRefreshMission } = useMissionsService();

  const onUpdateMissionDetails = React.useCallback((name: string) => {
    const params = {...state};
    params.name = name;
    if(!_.isEmpty(state.gameCategory)){
      params.gameCategoryId = state.gameCategory.id;
    }
    if(!_.isEmpty(state.game)){
      params.gameId = state.game.id;
    }

    updateMissionDetails.mutate(params);
  }, [state, updateMissionDetails]);

  const onUpdateMissionStatus = React.useCallback(() => {
    updateMissionStatus.mutate({
      id: state.id,
      isActive: !state.isActive,
    });
  }, [state, updateMissionStatus]);

  const value = {
    state,
    error,
    enableEdit,
    setEnableEdit,
    onDispatch,
    onUpdateMissionDetails,
    onUpdateMissionStatus,
  };


  React.useEffect(() => {
    if(updateMissionStatus.isSuccess || updateMissionDetails.isSuccess){
      onRefreshMission();
      handleMissionDetails({});
    }
  },[updateMissionStatus.isSuccess, updateMissionDetails.isSuccess, handleMissionDetails, onRefreshMission]);

  React.useEffect(() => {
    if(!_.isEmpty(getMissionDetails)){
      const params = { ...getMissionDetails };

      if(!_.isEmpty(params.gameCategory)){
        params.gameCategory = _.find(gameCategories, { 'id': getMissionDetails.gameCategory.id });
      }else if(!_.isEmpty(params.game)){
        params.game = _.find(games, { 'gameName': getMissionDetails.game.gameName });
      }
      onSetInitial(params);
    }
  },[getMissionDetails, gameCategories, games, onSetInitial]);

  return (
    <UpdateMailContext.Provider value={value}>
      {children}
    </UpdateMailContext.Provider>
  );
};

export const useUpdateMissionContext = () => {
  return useContext(UpdateMailContext);
}

export default UpdateMissionProvider;
