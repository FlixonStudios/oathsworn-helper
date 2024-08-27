import { Card } from "@/models/Card";

export interface GameState {
  deck: Card[];
}

export type ActionTypes = "add-card";

export type TGameAction = TAction<"add-card", Card>;

export interface TAction<T extends ActionTypes, U> {
  type: T;
  payload?: U;
}
