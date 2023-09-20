import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {TranslateService} from "@ngx-translate/core";
import {FiltroSpConsultas} from "../../seguridad/services/opcion.service";
import {INVERSION_CONSULTAS} from "../../constantes/consulta-constante";
import {PoaDto} from "../classes/PoaDto";
import {RequestOptions} from "../../../system/classes/RequestOptions";
import {PERSISTENCIA_OBJETO_ACTIVIDAD, PERSISTENCIA_OBJETO_POA} from "../../constantes/transaccion-constante";
import {cadenaFormatearFecha} from "../../../system/funcions/fecha.utils";
import {ActividadProyectoDto} from "../classes/ActividadProyectoDto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PoaService {

  constructor(private rest: ExecuteCallProcedureService,
              private svrTrsnslate: TranslateService) {

  }

  public async obtenerGridPrincipalPoa() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'POA-GRID'};
    const lst: PoaDto[] = await (this.rest.getGenericObjects(filtro, INVERSION_CONSULTAS) as unknown as PoaDto[]);
    return lst;
  }

  public async registrarPoa(objPoa: PoaDto): Promise<PoaDto> {
    const opcionesRespuesta = new RequestOptions();
    const fecha = new Date(objPoa.anio, 0, 1);
    objPoa.fechaPoa = cadenaFormatearFecha(fecha.toString());
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.poa.poa');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.poa.poa');
    const objeto: PoaDto = await (this.rest.servicioRestGenericoPost(objPoa, PERSISTENCIA_OBJETO_POA, opcionesRespuesta)) as PoaDto;
    return objeto;
  }

  public async registrarActividadPoa(objActividad: ActividadProyectoDto): Promise<ActividadProyectoDto> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.guardado.poa.poa');
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.poa.poa');
    const objeto: ActividadProyectoDto = await (this.rest.servicioRestGenericoPost(objActividad, PERSISTENCIA_OBJETO_ACTIVIDAD, opcionesRespuesta)) as ActividadProyectoDto;
    return objeto;
  }
}
