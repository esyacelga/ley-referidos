import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {TRAMITES_INICIALES_CONSULTAS} from '../../constantes/consulta-constante';
import {FiltroSpConsultas} from '../../comun/services/feriados.service';
import {Feriado} from '../../comun/classes/Feriado';
import {PERSISTENCIA_OBJETO_PRESTADOR_FARMACIA} from '../../constantes/transaccion-constante';
import {FarmaciaPrestador} from '../classes/persistencia/FarmaciaPrestador';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaPmService {

  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }


  public async obtnerTodosFarmaciaPm() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.pmedicas.prestador.farmacia.loading');
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'PRESTADORFARMACIA'};
    const lstPrestadorFeriado = await (this.rest.getGenericObjects(filtro, TRAMITES_INICIALES_CONSULTAS));
    return lstPrestadorFeriado;
  }

  public async regsitrarFarmaciaPm(farmaciaPrestador: FarmaciaPrestador): Promise<Feriado> {
    /*    const opcionesRespuesta = new RequestOptions();
        opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.comun.feriado');*/
    const objeto: Feriado = await (this.rest.servicioRestGenericoPost(farmaciaPrestador, PERSISTENCIA_OBJETO_PRESTADOR_FARMACIA)) as Feriado;
    return objeto;
  }


}
