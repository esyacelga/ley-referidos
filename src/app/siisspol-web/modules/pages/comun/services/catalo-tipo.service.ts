import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {COMUN_CONSULTAS} from "../../constantes/consulta-constante";
import {CatalogoTipo} from "../classes/CatalogoTipo";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {ordenAsendente} from "../../../system/funcions/lista.utils";

@Injectable({
  providedIn: 'root'
})
export class CataloTipoService {

  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {

  }

  public async obtenerCatalogoPorGrupo(codigoGrupo: string) {
    const filtro: FiltroSpConsultas = {filtro: codigoGrupo, tipoConsulta: 'OBTENERCATALOGOTIPO'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.catalogo.generico');
    let lstFondo = await (this.rest.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion) as unknown as CatalogoTipo[]);
    lstFondo = ordenAsendente(lstFondo, 'nombre');
    return lstFondo;
  }


}
