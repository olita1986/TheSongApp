import React from 'react';

export function createCtx<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType,
  ) {
    const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
    const Context = React.createContext({
      state: initialState,
      dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
    })
    function Provider({children} : React.PropsWithChildren<{}>) {
      const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
    return <Context.Provider value={{ state, dispatch }}>{ children }</Context.Provider>
    }
    return {Context , Provider}
  }