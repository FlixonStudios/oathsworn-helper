import React, { createContext } from "react";
import { Module, SettingsState, TSettingsAction } from "./types";

export const DEFAULT_STATE: SettingsState = {
  module: Module.NONE,
};

// Context + Reducer -> Provider -> Hook

export const SettingsContext = createContext<SettingsState>(DEFAULT_STATE);
export const SettingsDispatchContext = createContext<
  React.Dispatch<TSettingsAction>
>(() => null);
