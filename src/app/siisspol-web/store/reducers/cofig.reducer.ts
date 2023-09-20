import {createReducer, on} from "@ngrx/store";
import {cargarConfiguraciones, cargarConfiguracionesError, cargarConfiguracionesSuccess} from "../actions";
import {ConfiguracionEstado} from "../../modules/pages/comun/classes/configuracionEstado";

export interface ConfigState {
  configs: ConfiguracionEstado[],
  loaded: boolean,
  loading: boolean,
  error: any
}

export const configInitialState: ConfigState =
  {
    configs: [],
    loaded: false,
    loading: false,
    error: null
  }


const _configsReducer = createReducer(configInitialState,
  on(cargarConfiguraciones, state => ({...state, loading: true})),
  on(cargarConfiguracionesSuccess, (state, {configuraciones}) => ({
    ...state,
    configs: [...configuraciones],
    loaded: true,
    loading: false
  })),
  on(cargarConfiguracionesError, (state, {payload}) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  }))
)

export function configsReducer(state: any, action: any) {
  return _configsReducer(state, action)
}
