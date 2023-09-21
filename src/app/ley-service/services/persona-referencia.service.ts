import {Injectable} from '@angular/core';
import {
  ExecuteCallProcedureService
} from "../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {UploadService} from "../../siisspol-web/modules/system/services/system/upload.service";
import {TranslateService} from "@ngx-translate/core";
import {PersonaReferenciaDto} from "../classes/PersonaReferenciaDto";
import {RequestOptions} from "../../siisspol-web/modules/system/classes/RequestOptions";
import {
  PERSISTENCIA_PROC_XML_CRUD_PERSONA_REFERENCIA
} from "../../siisspol-web/modules/pages/constantes/transaccion-constante";
import {
  PROC_GET_XML_GENERICO_INTRANET,
  PROC_POST_XML_GENERICO_INTRANET
} from "../../siisspol-web/modules/system/classes/toast-constant";
import {FiltroSpConsultas} from "../../siisspol-web/modules/pages/seguridad/services/opcion.service";
import {LEY_CONSULTAS} from "../../siisspol-web/modules/pages/constantes/consulta-constante";

@Injectable({
  providedIn: 'root'
})
export class PersonaReferenciaService {

  constructor(private rest: ExecuteCallProcedureService,
              private upload: UploadService,
              private svrTrsnslate: TranslateService) {
  }

  public async registrarPersona(personaDto: PersonaReferenciaDto) {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.documento.denuncia');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.denuncia');
    opcionesRespuesta.restUrlTransacciones = PROC_POST_XML_GENERICO_INTRANET;
    opcionesRespuesta.responseType = "ENTIDAD";
    const objeto: PersonaReferenciaDto = await (this.rest.servicioRestGenericoPost(personaDto, PERSISTENCIA_PROC_XML_CRUD_PERSONA_REFERENCIA, opcionesRespuesta)) as PersonaReferenciaDto;
    return objeto;
  }

  public async obtenerPersonas() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'OBTENER-PERSONAS'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.lista.denuncia');
    objPeticion.restUrlConsultas = PROC_GET_XML_GENERICO_INTRANET;
    const lst = await (this.rest.getGenericObjects(filtro, LEY_CONSULTAS, objPeticion) as unknown as PersonaReferenciaDto[]);
    return lst;
  }

}
