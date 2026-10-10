import { useReducer, useCallback } from 'react';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { ...state, [action.name]: action.value };
    case "SET_INITIAL":
      return action.value;
    case 'RESET':
      return action.value;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const useInputHelper = (initialState: any = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onDispatch = useCallback(
    (name: string) => (value: any) => {
      dispatch({ type: 'INPUT_CHANGE', name, value });
    }, []
  );
  const onSetInitial = useCallback((value: any) => {
    dispatch({ type: "SET_INITIAL", value });
  },[]);
  const handleFormReset = useCallback(() => {
    dispatch({ type: 'RESET', value: initialState });
  }, [initialState]);

  return { state, onDispatch, onSetInitial, handleFormReset };
};
