import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {TranslateService} from '@ngx-translate/core';
import {FiltroSpConsultas} from '../../comun/services/feriados.service';
import {TRAMITES_INICIALES_CONSULTAS} from '../../constantes/consulta-constante';
import {RequestOptions} from '../../../system/classes/RequestOptions';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async obtnerPrestadores() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.pmedicas.lista.prestador')
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'PRESTADORCIUDAD'};
    const lstPrestador = await (this.rest.getGenericObjects(filtro, TRAMITES_INICIALES_CONSULTAS));
    return lstPrestador;
  }


}
