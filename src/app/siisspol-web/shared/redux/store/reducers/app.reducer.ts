import {ActionReducerMap} from '@ngrx/store';
import {confirmacionReducer} from './confirmacion.reducer';
import {Confirmacion} from '../../classes/Confirmacion';
import {botonesBarraHerramientas} from '../../types';
import {barraHerramientasReducer} from './barra-Herramienta.reducer';
import {AuditoriaClass} from '../../../directives/classes/auditoria.class';
import {seteaValorAuditoria} from './auditoria.reducer';


export interface AppState {
  accionComponenteConfirmacion: Confirmacion,
  accionComponenteBarraHerramientas: botonesBarraHerramientas,
  auditoriaComponent: AuditoriaClass,

}


export const appReducers: ActionReducerMap<AppState> = {
  accionComponenteConfirmacion: confirmacionReducer,
  accionComponenteBarraHerramientas: barraHerramientasReducer,
  auditoriaComponent: seteaValorAuditoria,
};
