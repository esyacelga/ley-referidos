import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {TranslateService} from '@ngx-translate/core';
import {FiltroSpConsultas} from '../../comun/services/feriados.service';
import {TRAMITES_INICIALES_CONSULTAS} from '../../constantes/consulta-constante';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {PaginadorExpedienteDetalle} from '../classes/Paginador';

@Injectable({
  providedIn: 'root'
})
export class DetalleExpedienteService {

  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService,) {
  }


  public async obtenerItemsDetalle(idExpediente: number) {
    if (idExpediente === 0)
      return;
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.pmedicas.lista.detalle.expediente');
    const filtro: FiltroSpConsultas = {filtro: idExpediente, tipoConsulta: 'OBTENCIONEXPEDIENTEDETALLE'};
    const lstPrestador = (await (this.rest.getGenericObjects(filtro, TRAMITES_INICIALES_CONSULTAS))) as PaginadorExpedienteDetalle[];
    return lstPrestador;
  }

}
