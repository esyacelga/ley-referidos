import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {SEGURDIDAD_CONSULTAS} from '../../constantes/consulta-constante';
import {PERSISTENCIA_OBJETO_PERMISO} from '../../constantes/transaccion-constante';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {OpcionPermisoObjeto} from '../../prestaciones-medicas/classes/persistencia/OpcionPermisoObjeto';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  constructor(private genericService: ExecuteCallProcedureService) {
  }


  public async obtnerTodosPermiso() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'OPCION'};
    const lstOpcion = await (this.genericService.getGenericObjects(filtro, SEGURDIDAD_CONSULTAS));
    return lstOpcion;
  }

  public async obtnerTodosPermisoOpcion(idOpcion: string) {
    const filtro: FiltroSpConsultas = {filtro: idOpcion, tipoConsulta: 'OPCIONROLLISTA'};
    const lstOpcionRol = await (this.genericService.getGenericObjects(filtro, SEGURDIDAD_CONSULTAS));
    return lstOpcionRol;
  }

  public async registrarOpcionPermiso(opcionPermiso: OpcionPermisoObjeto): Promise<OpcionPermisoObjeto> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = 'Opcion creada exitosamente';
    const objeto: OpcionPermisoObjeto = await (this.genericService.servicioRestGenericoPost(opcionPermiso, PERSISTENCIA_OBJETO_PERMISO, opcionesRespuesta)) as OpcionPermisoObjeto;
    return objeto;
  }

  public async eliminadoOpcionPermiso(opcionPermiso: OpcionPermisoObjeto): Promise<void> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = 'Registro eliminado';
    opcionPermiso.eliminado = 1;
    const objeto = await (this.genericService.servicioRestGenericoPost(opcionPermiso, PERSISTENCIA_OBJETO_PERMISO, opcionesRespuesta));
  }

}

export interface FiltroSpConsultas {
  tipoConsulta: string,
  filtro: string
}
