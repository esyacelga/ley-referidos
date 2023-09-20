import {createAction, props} from "@ngrx/store";
import {ConfiguracionEstado} from "../../modules/pages/comun/classes/configuracionEstado";


export const cargarConfiguraciones = createAction('[ConfiguracionEstado] carga configuraciones');

export const cargarConfiguracionesSuccess = createAction('[ConfiguracionEstado] carga configuraciones exitoso',
  props<{ configuraciones: ConfiguracionEstado[] }>()
);

export const cargarConfiguracionesError = createAction('[ConfiguracionEstado] carga configuraciones exitoso',
  props<{ payload: any }>()
);
