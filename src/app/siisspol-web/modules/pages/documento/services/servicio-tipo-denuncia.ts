import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {DOCUMENTO_CONSULTAS} from "../../constantes/consulta-constante";
import {CatalogoDocumento} from "../classes/dto/catalogoDocumento";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {PERSISTENCIA_OBJETO_DOCUMENTO_TIPO_DENUNCIA} from "../../constantes/transaccion-constante";
import {ordenAsendente} from "../../../system/funcions/lista.utils";

@Injectable({
  providedIn: 'root'
})
export class ServicioTipoDenuncia {
  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }


  public async obtenerTipoDenuncia() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'TIPO-DENUNCIA'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.tipo.denuncia');
    let lstFondo = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS, objPeticion) as unknown as CatalogoDocumento[]);
    lstFondo = ordenAsendente(lstFondo, 'nombre');
    return lstFondo;
  }


  public async insertarTipoDenuncia(tipodoDenuncia: CatalogoDocumento | undefined) {
    const opciones: RequestOptions = new RequestOptions();
    const tipo: CatalogoDocumento = new CatalogoDocumento(tipodoDenuncia?.nombre, tipodoDenuncia?.descripcion, tipodoDenuncia?.codigo, tipodoDenuncia?.idCatalogo, tipodoDenuncia?.estado, tipodoDenuncia?.npEstado)
    tipo?.convertirEstado();
    const objTicket: CatalogoDocumento = await this.rest.servicioRestGenericoPost(tipo, PERSISTENCIA_OBJETO_DOCUMENTO_TIPO_DENUNCIA, opciones) as CatalogoDocumento;
    return objTicket;
  }

}
