import {createReducer, on} from '@ngrx/store';
import {setConfirmacion} from '../actions/confirmacion.actions';
import {ConfirmacionInterface} from '../../classes/Confirmacion';


export const confirmacionState: ConfirmacionInterface = {
    titulo: undefined,
    mensaje: undefined,
    opcion: undefined
  }
;

const uiConfirmacionReducer = createReducer(confirmacionState,
  on(setConfirmacion, (state, {confirmacion}) => ({
    ...state,
    titulo: confirmacion.titulo,
    mensaje: confirmacion.mensaje,
    opcion: confirmacion.opcion
  })));

export function confirmacionReducer(state: any, action: any) {
  return uiConfirmacionReducer(state, action);
}
