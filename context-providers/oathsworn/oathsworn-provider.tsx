import { useReducer } from "react";
import {
  DEFAULT_STATE,
  OathswornContext,
  OathswornDispatchContext,
} from "./oathsworn-ctx";
import { gameReducer } from "./oathsworn-reducer";
import { GameState, TGameAction } from "./types";

export const OathswornProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<
    (state: GameState, action: TGameAction) => GameState
  >(gameReducer, DEFAULT_STATE);

  return (
    <OathswornContext.Provider value={state}>
      <OathswornDispatchContext.Provider value={dispatch}>
        {children}
      </OathswornDispatchContext.Provider>
    </OathswornContext.Provider>
  );
};
