import { GameState, TGameAction } from "./types";

export function gameReducer(state: GameState, action: TGameAction) {
  const { type, payload } = action;
  switch (type) {
    case "add-card": {
      if (!payload) return state;
      return { ...state, deck: [...state.deck, payload] };
    }
    default:
      return state;
  }
}
