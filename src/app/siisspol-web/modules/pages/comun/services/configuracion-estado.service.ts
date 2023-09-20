import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {COMUN_CONSULTAS} from '../../constantes/consulta-constante';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {TranslateService} from '@ngx-translate/core';
import {ConfiguracionEstado} from "../classes/configuracionEstado";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionEstadoService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService,
  ) {

  }

  public async obtnerSiguienteConfiguracion(codigoProceso: string, codigoEstadoActual: string | undefined) {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.comun.auditoria.cargando');
    objPeticion.responseType = "LISTAENTIDAD"
    const filtro = {tipoConsulta: 'OBTENERCONFIGURACION', filtro: codigoEstadoActual , valorId:codigoProceso };
    const objAditorial: ConfiguracionEstado[] = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion)) as ConfiguracionEstado[];
    return objAditorial;
  }
}

