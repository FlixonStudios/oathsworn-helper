import { Deck } from "@/models/Deck";

export enum CalculationSpeed {
  FAST = "FAST",
  SLOW = "SLOW",
}

export interface OathswornConfig {
  calculationSpeed: CalculationSpeed;
}

export interface GameState {
  decks: Deck[];
  config: OathswornConfig;
}

export type ActionTypes = "seek-card" | "revert-card" | "set-calculation-speed";

export type TGameAction =
  | TAction<"seek-card", Deck>
  | TAction<"revert-card", Deck>
  | TAction<"set-calculation-speed", CalculationSpeed>;

export interface TAction<T extends ActionTypes, U> {
  type: T;
  payload?: U;
}
