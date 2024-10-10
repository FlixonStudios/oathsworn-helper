import { SettingsState, TSettingsAction } from "./types";

export function settingsReducer(state: SettingsState, action: TSettingsAction) {
  const { type, payload } = action;
  switch (type) {
    case "set-module": {
      if (!payload) return state;
      return { ...state, module: payload };
    }
    default:
      return state;
  }
}
