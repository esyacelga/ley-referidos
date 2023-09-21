import {ActionReducerMap} from '@ngrx/store';
import {confirmacionReducer} from './confirmacion.reducer';
import {Confirmacion} from '../../classes/Confirmacion';
import {botonesBarraHerramientas, botonesBarraHerramientasSmall} from '../../types';
import {barraHerramientasReducer, barraHerramientasSmallReducer} from './barra-Herramienta.reducer';
import {AuditoriaClass} from '../../../directives/classes/auditoria.class';
import {seteaValorAuditoria} from './auditoria.reducer';


export interface AppState {
  accionComponenteConfirmacion: Confirmacion,
  accionComponenteBarraHerramientas: botonesBarraHerramientas,
  accionComponenteSmallBarraHerramientas: botonesBarraHerramientasSmall,
  auditoriaComponent: AuditoriaClass,

}


export const appReducers: ActionReducerMap<AppState> = {
  accionComponenteConfirmacion: confirmacionReducer,
  accionComponenteBarraHerramientas: barraHerramientasReducer,
  accionComponenteSmallBarraHerramientas: barraHerramientasSmallReducer,
  auditoriaComponent: seteaValorAuditoria,
};
