import {createAction, props} from '@ngrx/store';
import {Confirmacion} from '../../classes/Confirmacion';
import {botonesBarraHerramientas, botonesBarraHerramientasSmall} from '../../types';


export const setAccion = createAction(
  '[Accion] Set accion',
  props<{ accion: botonesBarraHerramientas }>()
);

export const setAccionSmall = createAction(
  '[Accion] Set accion',
  props<{ accion: botonesBarraHerramientasSmall }>()
);
