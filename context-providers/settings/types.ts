export type Module = "oathsworn" | "none";

export interface SettingsState {
  module: Module;
}

export type ActionTypes = "set-module";

export type TSettingsAction = TAction<"set-module", Module>;

export interface TAction<T extends ActionTypes, U> {
  type: T;
  payload?: U;
}
