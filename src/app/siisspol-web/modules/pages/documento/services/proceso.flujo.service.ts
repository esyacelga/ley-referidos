import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {
  PERSISTENCIA_PROCESO_CONFIGURACION,
  PERSISTENCIA_PROCESO_FLUJO,
  PERSISTENCIA_PROCESO_FLUJO_VERSION
} from "../../constantes/transaccion-constante";
import {UploadService} from "../../../system/services/system/upload.service";
import {PersProcesoFlujo} from "../classes/dto/PersProcesoFlujo";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {COMUN_CONSULTAS} from "../../constantes/consulta-constante";
import {toBitStr} from "../../../system/funcions/texto.utils";
import {PerstFlujoVersion} from "../../comun/classes/perst-flujo-version";
import {PersProcesoFlujoVersion} from "../classes/dto/PersProcesoFlujoVersion";
import {PerstConfigFlow} from "../../comun/classes/perst-config-flow";

@Injectable({
  providedIn: 'root'
})
export class ProcesoFlujoService {

  constructor(private rest: ExecuteCallProcedureService,
              private upload: UploadService,
              private svrTrsnslate: TranslateService) {
  }

  public async registrarFlujo(objetoPersistencia: PersProcesoFlujo) {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.comun.flujo');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.flujo');
    objetoPersistencia.estado = toBitStr(objetoPersistencia.estado);
    opcionesRespuesta.responseType = "ENTIDAD";
    const objeto: PersProcesoFlujo = await (this.rest.servicioRestGenericoPost(objetoPersistencia, PERSISTENCIA_PROCESO_FLUJO, opcionesRespuesta)) as PersProcesoFlujo;
    //objeto.estado = toBoolean(objeto.estado);
    return objeto;
  }

  public async registrarFlujoVersion(objetoPersistencia: PersProcesoFlujoVersion) {
    const opcionesRespuesta = new RequestOptions();
    if (objetoPersistencia.idProcesoFlujo == '0')
      objetoPersistencia.idProcesoFlujo = '';

    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.comun.flujo');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.flujo');
    objetoPersistencia.estado = toBitStr(objetoPersistencia.estado);
    opcionesRespuesta.responseType = "ENTIDAD";
    const objeto: PersProcesoFlujoVersion = await (this.rest.servicioRestGenericoPost(objetoPersistencia, PERSISTENCIA_PROCESO_FLUJO_VERSION, opcionesRespuesta)) as PersProcesoFlujoVersion;
    return objeto;
  }

  public async obtenerFlujoPorId(filtro: string) {
    const filDato: FiltroSpConsultas = {filtro, tipoConsulta: 'FLUJOPROCESO'};
    const objPeticion: RequestOptions = new RequestOptions();
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.responseType = "ENTIDAD";
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.preguntas');
    const data: PersProcesoFlujo = await (this.rest.getGenericObjects(filDato, COMUN_CONSULTAS, opcionesRespuesta) as unknown as PersProcesoFlujo);
    return data;
  }


  public async obtenerTodosFlujo() {
    const filDato: FiltroSpConsultas = {filtro: '', tipoConsulta: 'FLUJOPROCESOTODOS'};
    const objPeticion: RequestOptions = new RequestOptions();
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.responseType = "LISTAENTIDAD";
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.preguntas');
    const data: PersProcesoFlujo[] = await (this.rest.getGenericObjects(filDato, COMUN_CONSULTAS, opcionesRespuesta) as unknown as PersProcesoFlujo[]);
    return data;
  }

  public async obtenerTodosFlujoVersion() {
    const filDato: FiltroSpConsultas = {filtro: '', tipoConsulta: 'FLUJOPROCESOVERSIONTODOS'};
    const objPeticion: RequestOptions = new RequestOptions();
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.responseType = "LISTAENTIDAD";
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.preguntas');
    const data: PerstFlujoVersion[] = await (this.rest.getGenericObjects(filDato, COMUN_CONSULTAS, opcionesRespuesta) as unknown as PerstFlujoVersion[]);
    return data;
  }

  public async obtenerPorIdFlujoVersion(filtro: string) {
    const filDato: FiltroSpConsultas = {filtro, tipoConsulta: 'FLUJOVERSION'};
    const objPeticion: RequestOptions = new RequestOptions();
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.responseType = "LISTAENTIDAD";
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.preguntas');
    const data: PerstFlujoVersion[] = await (this.rest.getGenericObjects(filDato, COMUN_CONSULTAS, opcionesRespuesta) as unknown as PerstFlujoVersion[]);
    return data;
  }

  public async registrarConfiguracion(objetoPersistencia: PerstConfigFlow) {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.comun.flujo.configuracion');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.flujo.configuracion');
    objetoPersistencia.estado = toBitStr(objetoPersistencia.estado);
    opcionesRespuesta.responseType = "ENTIDAD";
    const objeto: PerstConfigFlow = await (this.rest.servicioRestGenericoPost(objetoPersistencia, PERSISTENCIA_PROCESO_CONFIGURACION, opcionesRespuesta)) as PerstConfigFlow;
    return objeto;
  }

  public async obtenerConfiguraciones() {
    const filDato: FiltroSpConsultas = {filtro: '', tipoConsulta: 'GRIDCONFIGURACIONTODOS'};
    const objPeticion: RequestOptions = new RequestOptions();
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.responseType = "LISTAENTIDAD";
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.configuraciones');
    const data: PerstConfigFlow[] = await (this.rest.getGenericObjects(filDato, COMUN_CONSULTAS, opcionesRespuesta) as unknown as PerstConfigFlow[]);
    return data;
  }
}
