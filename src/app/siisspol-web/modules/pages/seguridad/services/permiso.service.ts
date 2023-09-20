import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {FiltroSpConsultas} from './opcion.service';
import {StorageAppService} from '../../../system/services/system/storage-app.service';
import {PermisoObjeto} from '../classes/PermisoObjeto';
import {TokenPesona} from "../classes/TokenPesona";
import {SEGURDIDAD_CONSULTAS} from "../../constantes/consulta-constante";
import {PERSISTENCIA_SEGURIDAD_TOKEN} from "../../constantes/transaccion-constante";

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private genericService: ExecuteCallProcedureService, private svrLs: StorageAppService) {
  }

  public async obtenerPermisoObjetos() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'PERMISOSOBJETOS'};
    const lstOpcion = await (this.genericService.getGenericObjects(filtro, SEGURDIDAD_CONSULTAS));
    return lstOpcion;
  }

  public async actualizarToken(tocken: TokenPesona) {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'PERMISOSOBJETOS'};
    const token = await (this.genericService.servicioRestGenericoPost(tocken, PERSISTENCIA_SEGURIDAD_TOKEN) as unknown as TokenPesona);
    return token;
  }

  public async obtenerTokensActivos() {
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'TOKENPERSONA'};
    const lstTocken = await (this.genericService.getGenericObjects(filtro, 'seguridad.proc_xml_opcion_consultas') as unknown as TokenPesona[]);
    return lstTocken;
  }

  public async cargarPermisos() {
    let lstPermisos: PermisoObjeto[] = await (this.svrLs.loadStorageObject('permisoObjeto') as unknown as PermisoObjeto[]);
    if (!lstPermisos) {
      lstPermisos = (await this.obtenerPermisoObjetos() as unknown as PermisoObjeto[]);
      this.svrLs.setStorageObject(lstPermisos, 'permisoObjeto');

    }
    return lstPermisos;
  }
}
