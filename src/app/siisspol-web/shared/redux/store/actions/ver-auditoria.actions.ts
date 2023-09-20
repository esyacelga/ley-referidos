import {createAction, props} from '@ngrx/store';
import {AuditoriaClass} from '../../../directives/classes/auditoria.class';


export const setAuditoria = createAction(
  '[Auditoria] Set auditoria',
  props<{ auditoria: AuditoriaClass }>()
);

