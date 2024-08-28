import React, { createContext } from "react";
import { GameState, TGameAction } from "./types";
import { whiteDeck, yellowDeck, redDeck, blackDeck } from "@/constants/decks";

export const DEFAULT_STATE: GameState = {
  decks: [whiteDeck, yellowDeck, redDeck, blackDeck],
};

// Context + Reducer -> Provider -> Hook

export const GameContext = createContext<GameState>(DEFAULT_STATE);
export const GameDispatchContext = createContext<React.Dispatch<TGameAction>>(
  () => null
);
