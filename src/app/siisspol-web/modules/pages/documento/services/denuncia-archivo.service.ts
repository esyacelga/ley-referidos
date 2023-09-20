import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {AdjuntoPersistencia} from "../classes/persistencia/AdjuntoPersistencia";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {PERSISTENCIA_OBJETO_DOCUMENTO_ADJUNTO} from "../../constantes/transaccion-constante";

@Injectable({
  providedIn: 'root'
})
export class DenunciaArchivoService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async insertarActualizarAdjunto(adjuntoPersistence: AdjuntoPersistencia) {
    const opciones: RequestOptions = new RequestOptions();
    opciones.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.adjujnto');
    opciones.presentarToast = false;
    const objTicket: AdjuntoPersistencia = await this.genericService.servicioRestGenericoPost(adjuntoPersistence, PERSISTENCIA_OBJETO_DOCUMENTO_ADJUNTO, opciones) as AdjuntoPersistencia;
    return objTicket;
  }

  public async eliminarAdjunto(idDenunciaAdjunto: string) {
    const opciones: RequestOptions = new RequestOptions();
    opciones.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.adjujnto');
    opciones.presentarToast = false;
    const data = {
      idDenunciaAdjunto, eliminado: 1
    }
    const objTicket: AdjuntoPersistencia = await this.genericService.servicioRestGenericoPost(data, PERSISTENCIA_OBJETO_DOCUMENTO_ADJUNTO, opciones) as AdjuntoPersistencia;
    return objTicket;
  }
}
