import { Deck } from "@/models/Deck";

export interface GameState {
  decks: Deck[];
}

export type ActionTypes = "seek-card" | "revert-card";

export type TGameAction =
  | TAction<"seek-card", Deck>
  | TAction<"revert-card", Deck>;

export interface TAction<T extends ActionTypes, U> {
  type: T;
  payload?: U;
}
