import React, { createContext } from "react";
import { GameState, TGameAction } from "./types";
import { whiteDeck, yellowDeck, redDeck, blackDeck } from "@/constants/decks";

export const DEFAULT_STATE: GameState = {
  decks: [whiteDeck, yellowDeck, redDeck, blackDeck],
};

// Context + Reducer -> Provider -> Hook

export const OathswornContext = createContext<GameState>(DEFAULT_STATE);
export const OathswornDispatchContext = createContext<
  React.Dispatch<TGameAction>
>(() => null);
