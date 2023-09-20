import {createAction, props} from '@ngrx/store';
import {Confirmacion} from '../../classes/Confirmacion';
import {botonesBarraHerramientas} from '../../types';


export const setAccion = createAction(
  '[Accion] Set accion',
  props<{ accion: botonesBarraHerramientas }>()
);

