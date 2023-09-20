import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestOptions } from 'src/app/siisspol-web/modules/system/classes/RequestOptions';
import { toBoolean } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';
import { ExecuteCallProcedureService } from 'src/app/siisspol-web/modules/system/services/system/execute-call-procedure.service';
import * as _ from 'underscore';
import { FiltroSpConsultas } from '../../remate/services/remate.service';
import { PROC_OBTENER_LISTA_CARACTERISTICA } from '../../../constantes/consulta-constante';
import { Caracteristica } from '../classes/dto/caracteristica';
import { PERSISTENCIA_PROC_XML_CRUD_CARACTERISTICA } from '../../../constantes/transaccion-constante';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) { }
  

  public async obtnerListaCaracteristica() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.caracteristica.lista');
    const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
    const lstCaracteristica = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_CARACTERISTICA, objPeticion));
    _.forEach(lstCaracteristica, function (caracteristica) {
      caracteristica.estado = toBoolean(caracteristica.estado);
    })

    return lstCaracteristica;
  }

  public async registrarCaracteristica(caracteristica: Caracteristica): Promise<Caracteristica> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
    const objeto: Caracteristica = await (this.genericService.servicioRestGenericoPost(caracteristica, PERSISTENCIA_PROC_XML_CRUD_CARACTERISTICA, opcionesRespuesta)) as Caracteristica;
    return objeto;
}

}
