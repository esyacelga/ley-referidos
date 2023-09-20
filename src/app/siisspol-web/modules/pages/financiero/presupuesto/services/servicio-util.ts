import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_CIERRE_PRESUPUESTARIO} from "../../../constantes/transaccion-constante";
import {CatalogoInformacionUsuario} from "../classes/CatalogoInformacionUsuario";

@Injectable({
  providedIn: 'root'
})
export class ServicioUtil {
  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async obtenerInformacionUsuario() {
    // objeto procesar
    var obj = {
      tipo: 2
    };

    // ejecutar
    return await (this.rest.getGenericObjects(obj, PERSISTENCIA_PROC_XML_CRUD_PRESUPUESTO_CIERRE_PRESUPUESTARIO)) as unknown as CatalogoInformacionUsuario[];
  }
}
