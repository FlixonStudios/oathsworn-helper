import { useReducer } from "react";
import {
  DEFAULT_STATE,
  SettingsContext,
  SettingsDispatchContext,
} from "./settings-ctx";
import { settingsReducer } from "./settings-reducer";
import { SettingsState, TSettingsAction } from "./types";

export const SettingsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<
    (state: SettingsState, action: TSettingsAction) => SettingsState
  >(settingsReducer, DEFAULT_STATE);

  return (
    <SettingsContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
};
