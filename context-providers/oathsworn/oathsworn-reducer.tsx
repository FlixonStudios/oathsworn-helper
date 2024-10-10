import { GameState, TGameAction } from "./types";

export function gameReducer(state: GameState, action: TGameAction) {
  const { type, payload } = action;
  switch (type) {
    case "seek-card": 
    case "revert-card":
    {
      if (!payload) return state;
      return { ...state };
    }
    default:
      return state;
  }
}
