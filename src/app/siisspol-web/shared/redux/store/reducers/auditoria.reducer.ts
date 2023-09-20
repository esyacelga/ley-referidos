import {createReducer, on} from '@ngrx/store';
import {AuditoriaClass} from '../../../directives/classes/auditoria.class';
import {setAuditoria} from '../actions/ver-auditoria.actions';


export const auditoriarFirstState: AuditoriaClass = new AuditoriaClass();

const uiAuditoriaReducer = createReducer(auditoriarFirstState,
  on(setAuditoria, (state, {auditoria}) => ({
    ...state,
    modificaEquipo: auditoria.modificaEquipo,
    modificaFecha: auditoria.modificaFecha,
    modificaUsuario: auditoria.modificaUsuario,
    creacionEquipo: auditoria.creacionEquipo,
    creacionFecha: auditoria.creacionFecha,
    creacionUsuario: auditoria.creacionUsuario
  })));

export function seteaValorAuditoria(state: any, action: any) {
  return uiAuditoriaReducer(state, action);
}
