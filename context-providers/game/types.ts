import { Card } from "@/models/Card";
import { Deck } from "@/models/Deck";

export interface GameState {
  decks: Deck[];
}

export type ActionTypes = "add-card";

export type TGameAction = TAction<"add-card", Card>;

export interface TAction<T extends ActionTypes, U> {
  type: T;
  payload?: U;
}
