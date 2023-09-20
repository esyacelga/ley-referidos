import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {CatalogoValorNegativo} from "../classes/dto/CatalogoValorNegativo";
import {RequestOptions} from "../../../../system/classes/RequestOptions";
import {
  PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_VALOR_NEGATIVO
} from "../../../constantes/transaccion-constante";
import {CatalogoInformacionUsuario} from "../classes/CatalogoInformacionUsuario";

@Injectable({
  providedIn: 'root'
})
export class ServicioValoresNegativos {
  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async validarIngresoValoresNegativos(objValorNegativo: CatalogoValorNegativo | undefined) {
    const opciones: RequestOptions = new RequestOptions();
    opciones.mostrarLoading = true;
    opciones.successMessaje = this.svrTrsnslate.instant('Objeto verificado.');

    // objeto procesar
    var obj = {
      boletin: objValorNegativo?.boletin,
      cuentaContable: objValorNegativo?.cuentaContable,
      valor: objValorNegativo?.valor,
      tipoMovimento: objValorNegativo?.tipoMovimento,
      tipo: 0
    };

    return await this.rest.servicioRestGenericoPost(obj, PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_VALOR_NEGATIVO, opciones) as CatalogoValorNegativo;
  }

  public async registrarValoresNegativos(usuario: CatalogoInformacionUsuario,lstValorNegativos: CatalogoValorNegativo[],) {
    const opciones: RequestOptions = new RequestOptions();
    opciones.mostrarLoading = true;
    opciones.successMessaje = this.svrTrsnslate.instant('Compromisos presupuestarios en negativo, generados correctamente.');

    // objeto a procesar
    var obj = {
      usuario: usuario.idUsuario,
      lstValorNegativos: lstValorNegativos,
      tipo: 1
    };

    return await this.rest.servicioRestGenericoPost(obj, PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_VALOR_NEGATIVO, opciones) as CatalogoValorNegativo;
  }

}
