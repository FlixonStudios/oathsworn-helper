import React, { createContext } from "react";
import { GameState, TGameAction } from "./types";

export const DEFAULT_STATE: GameState = { deck: [] };

// Context + Reducer -> Provider -> Hook

export const GameContext = createContext<GameState>(DEFAULT_STATE);
export const GameDispatchContext = createContext<React.Dispatch<TGameAction>>(
  () => null
);
