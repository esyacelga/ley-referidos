import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {COMUN_CONSULTAS} from '../../constantes/consulta-constante';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {AuditoriaClass, AuditoriaConfig} from '../../../../shared/directives/classes/auditoria.class';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService,
  ) {

  }

  public async obtnerInformacionAuditoria(objAdutoria: AuditoriaConfig) {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.comun.auditoria.cargando');
    objPeticion.responseType = 'ENTIDAD';
    const filtro: FiltroConsultaAuditoria = new FiltroConsultaAuditoria(objAdutoria.tabla, objAdutoria.columnaPrimanaria, objAdutoria.valorId, 'AUDITORIA');
    const objAditorial: AuditoriaClass = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion));
    return objAditorial;
  }
}

export class FiltroConsultaAuditoria extends AuditoriaConfig {
  tipoConsulta: string | undefined;

  constructor(tabla: string | undefined, columnaPrimanaria: string | undefined, valorId: string | undefined, tipoConsulta: string | undefined) {
    super(tabla, columnaPrimanaria, valorId);
    this.tipoConsulta = tipoConsulta;
  }
}
