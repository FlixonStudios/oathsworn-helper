import React, { createContext } from "react";
import { SettingsState, TSettingsAction } from "./types";

export const DEFAULT_STATE: SettingsState = {
  module: "none",
};

// Context + Reducer -> Provider -> Hook

export const SettingsContext = createContext<SettingsState>(DEFAULT_STATE);
export const SettingsDispatchContext = createContext<
  React.Dispatch<TSettingsAction>
>(() => null);
