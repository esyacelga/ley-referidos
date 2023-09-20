import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {COMUN_CONSULTAS} from '../../constantes/consulta-constante';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {PERSISTENCIA_OBJETO_FERIADO} from '../../constantes/transaccion-constante';
import {Feriado} from '../classes/Feriado';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService,
  ) {

  }

  public async regsitrarFeriado(feriado: Feriado): Promise<Feriado> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.comun.feriado');
    const objeto: Feriado = await (this.genericService.servicioRestGenericoPost(feriado, PERSISTENCIA_OBJETO_FERIADO, opcionesRespuesta)) as Feriado;
    return objeto;
  }


  public async obtnerTodosFeriado() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.feriado');
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'TODOSFERIADOS'};
    const lstFeriados = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion));
    return lstFeriados;
  }


}


export interface FiltroSpConsultas {
  tipoConsulta: string,
  filtro: any
}
