import * as reducers from './reducers'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  configs: reducers.ConfigState
}


export const appReducers: ActionReducerMap<AppState> = {
  configs: reducers.configsReducer
}
