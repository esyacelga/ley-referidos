import {createAction, props} from '@ngrx/store';
import {Confirmacion} from '../../classes/Confirmacion';


export const setConfirmacion = createAction(
  '[Confirmacion] Set confirmacion',
  props<{ confirmacion: Confirmacion }>()
);


