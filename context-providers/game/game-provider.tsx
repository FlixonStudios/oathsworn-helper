import { useReducer } from "react";
import { DEFAULT_STATE, GameContext, GameDispatchContext } from "./game-ctx";
import { gameReducer } from "./game-reducer";
import { GameState, TGameAction } from "./types";

export const GameProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer<
      (state: GameState, action: TGameAction) => GameState
    >(gameReducer, DEFAULT_STATE);

    return (
      <GameContext.Provider value={state}>
        <GameDispatchContext.Provider value={dispatch}>
          {children}
        </GameDispatchContext.Provider>
      </GameContext.Provider>
    );
  };
  