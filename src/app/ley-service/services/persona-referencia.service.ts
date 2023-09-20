import {Injectable} from '@angular/core';
import {
  ExecuteCallProcedureService
} from "../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {UploadService} from "../../siisspol-web/modules/system/services/system/upload.service";
import {TranslateService} from "@ngx-translate/core";
import {PersonaReferenciaDto} from "../classes/PersonaReferenciaDto";
import {RequestOptions} from "../../siisspol-web/modules/system/classes/RequestOptions";
import {DenunciaDto} from "../../siisspol-web/modules/pages/documento/classes/dto/DenunciaDto";
import {
  PERSISTENCIA_CAMBIO_ESTADO_DENUNCIA,
  PERSISTENCIA_PROC_XML_CRUD_PERSONA_REFERENCIA
} from "../../siisspol-web/modules/pages/constantes/transaccion-constante";
import {PROC_POST_XML_GENERICO_INTRANET} from "../../siisspol-web/modules/system/classes/toast-constant";

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
    opcionesRespuesta.presentarToast = false;
    const objeto: DenunciaDto = await (this.rest.servicioRestGenericoPost(personaDto, PERSISTENCIA_PROC_XML_CRUD_PERSONA_REFERENCIA, opcionesRespuesta)) as DenunciaDto;
    return objeto;
  }

}
