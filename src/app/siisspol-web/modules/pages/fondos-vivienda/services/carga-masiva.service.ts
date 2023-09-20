import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {APORTES_FONDOS_CONSULTAS} from "../../constantes/consulta-constante";
import {AporteFondos} from "../classes/dto/aporte-fondos";
import {MigracionFondos} from "../classes/dto/migracion-fondos";
import {PERSISTENCIA_FONDOS_CABECERA, PERSISTENCIA_FONDOS_DATOS} from "../../constantes/transaccion-constante";
import {ProcesoFondos} from "../classes/dto/proceso-fondos";
import {DetalleAporte} from "../classes/dto/detalle-aporte";

@Injectable({
  providedIn: 'root'
})
export class CargaMasivaService {

  constructor(private rest: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) {
  }

  public async obtenerAportesFondos() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'CARGAAPORTE'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "LISTAENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const lstFondo = await (this.rest.getGenericObjects(filtro, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as AporteFondos[]);
    return lstFondo;
  }

  public async obtenerAportesInfoFondos(filtro: string | undefined) {
    const filt = {filtro, tipoConsulta: 'CARGAINFOAPORTE'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "LISTAENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const lstFondo = await (this.rest.getGenericObjects(filt, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as AporteFondos[]);
    return lstFondo;
  }

  public async obtenerTotalesAportesRegistrados() {
    const fil = {filtro: '', tipoConsulta: 'TOTALAPORTEREGISTRADO'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "ENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const totalAportes: MigracionFondos = await (this.rest.getGenericObjects(fil, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as MigracionFondos);
    return totalAportes;
  }

  public async obtenerTotalesAportes(filtro: string | undefined) {
    const fil = {filtro, tipoConsulta: 'TOTALCARGAAPORTE'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "ENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const totalAportes: MigracionFondos = await (this.rest.getGenericObjects(fil, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as MigracionFondos);
    return totalAportes;
  }

  public async obtenerAportesInfoFondosReg(filtro: string | undefined) {
    const filt = {filtro, tipoConsulta: 'CARGAINFOAPORTEREG'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "LISTAENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const lstFondo = await (this.rest.getGenericObjects(filt, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as AporteFondos[]);
    return lstFondo;
  }

  public async obtenerTotalesAportesReg(filtro: string | undefined) {
    const filt = {filtro, tipoConsulta: 'TOTALCARGAAPORTEREG'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "ENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const totalAportes: MigracionFondos = await (this.rest.getGenericObjects(filt, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as MigracionFondos);
    return totalAportes;
  }

  public async obtenerDetalleAportes(filtro: string) {
    const filt = {filtro, tipoConsulta: 'DETALLEAPORTES'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "LISTAENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const lstDetalleAportes = await (this.rest.getGenericObjects(filt, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as DetalleAporte[]);
    return lstDetalleAportes;
  }

  public async obtenerMigracionFondos() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'CARGAGRUPOMIGRADO'};
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.responseType = "LISTAENTIDAD"
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.prestacion.lista.aportes.fondos');
    const lstMigracionFondo = await (this.rest.getGenericObjects(filtro, APORTES_FONDOS_CONSULTAS, objPeticion) as unknown as MigracionFondos[]);
    return lstMigracionFondo;
  }

  public async registrarCabecera(cabecera: MigracionFondos): Promise<MigracionFondos> {
    const opcionesRespuesta = new RequestOptions();

    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.fondosv.guardado.cabecera');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.fondos.cabecera');
    opcionesRespuesta.presentarToast = true;
    const objeto: MigracionFondos = await (this.rest.servicioRestGenericoPost(cabecera, PERSISTENCIA_FONDOS_CABECERA, opcionesRespuesta)) as MigracionFondos;
    return objeto;
  }

  public async registrarDatosTemp(): Promise<ProcesoFondos> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.fondosv.aportes.cargados');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.fondos.carga');
    opcionesRespuesta.responseType = "ENTIDAD";
    opcionesRespuesta.presentarToast = false;
    const objeto: ProcesoFondos = await (this.rest.servicioRestGenericoPost({}, PERSISTENCIA_FONDOS_DATOS, opcionesRespuesta)) as ProcesoFondos;
    return objeto;
  }


}
