import {createReducer, on} from '@ngrx/store';
import {botonesBarraHerramientas} from '../../types';
import {setAccion, setAccionSmall} from '../actions/barra-herramientas.actions';


export const initialState: botonesBarraHerramientas = 'VOID';

const accionPresionarBoton = createReducer(initialState,
// @ts-ignore
  on(setAccion, (state, {accion}) => {
    const objCadena: string = String(accion);
    return objCadena;
  }),
);

const accionPresionarSmallBoton = createReducer(initialState,
// @ts-ignore
  on(setAccionSmall, (state, {accion}) => {
    const objCadena: string = String(accion);
    return objCadena;
  }),
);

export function barraHerramientasReducer(state: any, action: any) {
  return accionPresionarBoton(state, action);
}

export function barraHerramientasSmallReducer(state: any, action: any) {
  return accionPresionarSmallBoton(state, action);
}
