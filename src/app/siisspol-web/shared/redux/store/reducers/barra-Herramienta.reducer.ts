import {createReducer, on} from '@ngrx/store';
import {botonesBarraHerramientas} from '../../types';
import {setAccion} from '../actions/barra-herramientas.actions';


export const initialState: botonesBarraHerramientas = 'VOID';

const accionPresionarBoton = createReducer(initialState,
// @ts-ignore
  on(setAccion, (state, {accion}) => {
    const objCadena: string = String(accion);
    return objCadena;
  }),
);

export function barraHerramientasReducer(state: any, action: any) {
  return accionPresionarBoton(state, action);
}
