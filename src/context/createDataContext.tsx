import React, { useReducer } from 'react';
import { AppState, PlaylistReducer } from './PlaylistContext';

// export default (reducer: PlaylistReducer, actions, initialState: AppState) => {
//     const Context = React.createContext<AppState | null>(null);

//     const Provider = ({ children }) => {
//         const [ state, dispatch ] = useReducer(reducer, initialState);

//         const boundActions = {};
//         for (let key in actions) {
//             boundActions[key] = actions[key](dispatch);
//         }

//         return <Context.Provider value={ state }>{ children }</Context.Provider>

//     }

//     return { Context, Provider }
// }

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