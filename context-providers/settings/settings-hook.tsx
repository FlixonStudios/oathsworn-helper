import { useCallback, useContext } from "react";
import { SettingsContext, SettingsDispatchContext } from "./settings-ctx";
import { Module } from "./types";

export const useSettings = () => {
  const settingsState = useContext(SettingsContext);
  const dispatch = useContext(SettingsDispatchContext);

  const setModule = useCallback(
    (moduleName: Module) => {
      dispatch({
        type: "set-module",
        payload: moduleName,
      });
    },
    [dispatch]
  );

  return {
    settingsState,
    setModule
  };
};
