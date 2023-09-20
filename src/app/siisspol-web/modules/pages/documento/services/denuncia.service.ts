import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {FormDenuncia} from "../classes/dto/FormDenuncia";
import {
  PERSISTENCIA_CAMBIO_ESTADO_DENUNCIA,
  PERSISTENCIA_OBJETO_DENUNCIA
} from "../../constantes/transaccion-constante";
import {DenunciaDto} from "../classes/dto/DenunciaDto";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {DOCUMENTO_CONSULTAS} from "../../constantes/consulta-constante";
import {DenunciaPaginacionDto} from "../classes/dto/DenunciaPaginacionDto";
import {DenunciaDescripcionDto} from "../classes/dto/DenunciaDescripcionDto";
import {DenunciaAdjuntoDto} from "../classes/dto/DenunciaAdjuntoDto";
import {RespuestaPreguntaDto} from "../classes/dto/RespuestaPreguntaDto";
import {UploadService} from "../../../system/services/system/upload.service";
import {DocumentoEstadoDescripcion} from "../classes/persistencia/documento-estado-descripcion";

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  constructor(private rest: ExecuteCallProcedureService,
              private upload: UploadService,
              private svrTrsnslate: TranslateService) {
  }

  public async registrarDenunciaCambioEstado (objetoPersistencia:DocumentoEstadoDescripcion){
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.documento.denuncia');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.denuncia');
    opcionesRespuesta.presentarToast = false;
    const objeto: DenunciaDto = await (this.rest.servicioRestGenericoPost(objetoPersistencia, PERSISTENCIA_CAMBIO_ESTADO_DENUNCIA, opcionesRespuesta)) as DenunciaDto;
    return objeto;
  }
  public async obtenerRespuestasPreguntas(idDuncia: string) {
    const filtro: FiltroSpConsultas = {filtro: idDuncia, tipoConsulta: 'RESPUESTA-PREGUNTA'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.tipo.denuncia');
    const lstDenuncias = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS, objPeticion) as unknown as RespuestaPreguntaDto[]);
    return lstDenuncias;
  }

  public async obtenerDenuncias() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'GRID-DENUNCIAS'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.lista.denuncia');
    const lstDenuncias = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS, objPeticion) as unknown as DenunciaPaginacionDto[]);
    return lstDenuncias;
  }

  public async obtenerDescripcion(idDenuncia: string) {
    const filtro: FiltroSpConsultas = {filtro: idDenuncia, tipoConsulta: 'DENUNCIAS-DESCRIPCION'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.tipo.denuncia');
    const lstDenuncias = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS, objPeticion) as unknown as DenunciaDescripcionDto[]);
    return lstDenuncias;
  }

  public async obtenerAdjuntos(idDenuncia: string) {
    const filtro: FiltroSpConsultas = {filtro: idDenuncia, tipoConsulta: 'DENUNCIAS-ADJUNTO'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.tipo.denuncia');
    const lstDenuncias = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS, objPeticion) as unknown as DenunciaAdjuntoDto[]);
    return lstDenuncias;
  }

  public async obtenerImagen(obj?: DenunciaAdjuntoDto) {
    if (!obj?.idDenunciaAdjunto)
      return;
    // @ts-ignore
    const filtro: FiltroSpConsultas = {filtro: obj.idDenunciaAdjunto, tipoConsulta: 'OBTENER-ADJUNTO'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.imagen');
    objPeticion.responseType = "ENTIDAD";
    const adjuntoDto: DenunciaAdjuntoDto = await (this.rest.getGenericObjects(filtro, DOCUMENTO_CONSULTAS, objPeticion) as unknown as DenunciaAdjuntoDto);
    if (adjuntoDto) {
      // @ts-ignore
      return this.upload.abrirUrl(adjuntoDto.imagen, obj.nombreArchivo, obj.tipo, obj.peso)
    }

  }

  public async registrarDenuncia(denuncia: FormDenuncia): Promise<DenunciaDto> {
    const opcionesRespuesta = new RequestOptions();
    denuncia.cargarObjetoPersistencia();
    denuncia.idEstadoDenuncia = '21'
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.documento.denuncia');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.denuncia');
    opcionesRespuesta.presentarToast = false;
    const objeto: DenunciaDto = await (this.rest.servicioRestGenericoPost(denuncia, PERSISTENCIA_OBJETO_DENUNCIA, opcionesRespuesta)) as DenunciaDto;
    return objeto;
  }
}
