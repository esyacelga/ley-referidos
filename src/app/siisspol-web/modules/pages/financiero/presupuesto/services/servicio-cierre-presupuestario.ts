import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {CatalogoCierrePresupuestario} from "../classes/dto/CatalogoCierrePresupuestario";
import {RequestOptions} from "../../../../system/classes/RequestOptions";
import {
  PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_CIERRE_PRESUPUESTARIO
} from "../../../constantes/transaccion-constante";
import {CatalogoInformacionUsuario} from "../classes/CatalogoInformacionUsuario";

@Injectable({
  providedIn: 'root'
})
export class ServicioCierrePresupuestario {
  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async validarIngresoCierrePresupuestario(objCierrePresupuestario: CatalogoCierrePresupuestario | undefined) {
    const opciones: RequestOptions = new RequestOptions();
    opciones.mostrarLoading = true;
    opciones.successMessaje = this.svrTrsnslate.instant('Objeto verificado.');

    // objeto procesar
    var obj = {
      boletinNegocio: objCierrePresupuestario?.boletinCierre,
      boletinCierre: objCierrePresupuestario?.boletinCierre,
      tipoMovimento: objCierrePresupuestario?.tipoMovimento,
      tipo: 0
    };
    return await this.rest.servicioRestGenericoPost(obj, PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_CIERRE_PRESUPUESTARIO, opciones) as CatalogoCierrePresupuestario;
  }

  public async registrarCierrePresupuestario(usuario: CatalogoInformacionUsuario, lstCierrePresupuestario: CatalogoCierrePresupuestario[]) {
    const opciones: RequestOptions = new RequestOptions();
    opciones.mostrarLoading = true;
    opciones.successMessaje = this.svrTrsnslate.instant('Cierre presupuestario, generados correctamente.');

    // objeto a procesar
    var obj = {
      usuario: usuario.idUsuario,
      lstCierrePresupuestario: lstCierrePresupuestario,
      tipo: 1
    };
    return await this.rest.servicioRestGenericoPost(obj, PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_CIERRE_PRESUPUESTARIO, opciones) as CatalogoCierrePresupuestario;
  }

}
