import {Injectable} from '@angular/core';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {COMUN_CONSULTAS} from '../../constantes/consulta-constante';
import {FiltroSpConsultas} from './feriados.service';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {TranslateService} from '@ngx-translate/core';
import {PaginadoPermisoAnticipo, PermisoPagoContabilidadPersistencia} from '../classes/PaginadoPermisoAnticipo';
import {PERSISTENCIA_OBJETO_TRAMITE_INSTANCIA} from '../../constantes/transaccion-constante';
import {AsientoPrestador} from '../../prestaciones-medicas/modal/lista-pms/lista-pms.component';

@Injectable({
  providedIn: 'root'
})
export class PermisoPagoPrestacionesService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService,
  ) {

  }

  public async regsitrarPermisoPagoCpag(objPersitencia: PermisoPagoContabilidadPersistencia | undefined): Promise<PermisoPagoContabilidadPersistencia> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.loadingMessage = this.svrTrsnslate.instant('siisspolweb.comun.loading.guardar');
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
    const objeto: PermisoPagoContabilidadPersistencia = await (this.genericService.servicioRestGenericoPost(objPersitencia, PERSISTENCIA_OBJETO_TRAMITE_INSTANCIA, opcionesRespuesta)) as PermisoPagoContabilidadPersistencia;
    return objeto;
  }

  public async obtnerTodosPermisosAnticipo() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.feriado');
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'GRIDPAGOSANTICIPOS'};
    const lstPermisoAnticipo = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion)) as PaginadoPermisoAnticipo[];
    return lstPermisoAnticipo;
  }

  public async obtenerListaPMS(idInstancia: string) {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.comun.lista.feriado');
    const filtro: FiltroSpConsultas = {filtro: idInstancia, tipoConsulta: 'PMSPORINSTANCIA'};
    const lstPermisoAnticipo = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion)) as AsientoPrestador[];
    return lstPermisoAnticipo;
  }

}
