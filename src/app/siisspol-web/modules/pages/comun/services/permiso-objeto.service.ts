import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {ParamFilter} from '../../../system/classes/ParamFilter';
import {PageResult} from '../../interfaces/PageResult';
import {PAGINACION_OBEJETO_PERMISO} from '../../constantes/paginacion-constante';
import {PaginacionPrestacionObjeto} from '../../prestaciones-medicas/classes/PaginacionPrestacionObjeto';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {COMUN_CONSULTAS} from '../../constantes/consulta-constante';

@Injectable({
  providedIn: 'root'
})
export class PermisoObjetoService {

  constructor(private genericService: ExecuteCallProcedureService) {
  }

  public async paginarTabla(filterParams: ParamFilter) {
    const lstRubroPrestacion = await (this.genericService.getGenericPaginate<PaginacionPrestacionObjeto>(filterParams, PAGINACION_OBEJETO_PERMISO)) as PageResult;
    return lstRubroPrestacion;
  }

  public async obtnerTodosPermisoObjeto() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = 'Cargando Pantalla Inicial';
    const filtro: FiltroSpConsultas = {filtro: 'TODOSPERMISOOBJETO', tipoConsulta: 'TODOSPERMISOOBJETO'};
    const lstPermisoObjeto = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion));
    return lstPermisoObjeto;
  }


}

export interface FiltroSpConsultas {
  tipoConsulta: string,
  filtro: string
}
