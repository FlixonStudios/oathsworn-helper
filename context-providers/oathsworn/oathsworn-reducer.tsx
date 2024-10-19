import { GameState, OathswornConfig, TGameAction } from "./types";

export function gameReducer(state: GameState, action: TGameAction) {
  const { type, payload } = action;
  switch (type) {
    case "set-calculation-speed": {
      if (!payload) return state;
      const newConfig: OathswornConfig = { ...state.config, calculationSpeed: payload }
      return { ...state, config: newConfig }
    }
    case "seek-card":
    case "revert-card": {
      if (!payload) return state;
      return { ...state };
    }
    default:
      return state;
  }
}
