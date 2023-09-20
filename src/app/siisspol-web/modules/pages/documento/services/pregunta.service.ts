import { Injectable } from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {DOCUMENTO_CONSULTAS} from "../../constantes/consulta-constante";
import {CatalogoDocumento} from "../classes/dto/catalogoDocumento";
import {
  PERSISTENCIA_OBJETO_DOCUMENTO_TIPO_DELITO,
  PERSISTENCIA_OBJETO_PREGUNTA
} from "../../constantes/transaccion-constante";

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async obtenerPreguntas() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'PREGUNTAS'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.preguntas');
    const lstFondo = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS) as unknown as CatalogoDocumento[]);
    return lstFondo;
  }

  public async insertarPregunta(tipodoDenuncia: CatalogoDocumento | undefined) {
    const opciones: RequestOptions = new RequestOptions();
    const tipo:CatalogoDocumento= new CatalogoDocumento(tipodoDenuncia?.nombre,tipodoDenuncia?.descripcion,tipodoDenuncia?.codigo,tipodoDenuncia?.idCatalogo,tipodoDenuncia?.estado,tipodoDenuncia?.npEstado)
    tipo?.convertirEstado();
    const objTicket: CatalogoDocumento = await this.rest.servicioRestGenericoPost(tipo, PERSISTENCIA_OBJETO_PREGUNTA, opciones) as CatalogoDocumento;
    return objTicket;
  }
}
