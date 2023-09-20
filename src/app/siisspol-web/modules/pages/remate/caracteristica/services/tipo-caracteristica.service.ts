import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestOptions } from 'src/app/siisspol-web/modules/system/classes/RequestOptions';
import { toBoolean } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';
import { ExecuteCallProcedureService } from 'src/app/siisspol-web/modules/system/services/system/execute-call-procedure.service';
import * as _ from 'underscore';
import { PROC_OBTENER_LISTA_CATALOGO_CARACTERISTICA_TIPO_BIEN, PROC_OBTENER_LISTA_CATALOGO_TIPO_BIEN, PROC_OBTENER_LISTA_TIPO_CARACTERISTICA, PROC_OBTENER_LISTA_TIPO_CARACTERISTICA_MODAL } from '../../../constantes/consulta-constante';
import { PERSISTENCIA_PROC_XML_CRUD_TIPO_CARACTERISTICA } from '../../../constantes/transaccion-constante';
import { FiltroSpConsultas } from '../../remate/services/remate.service';
import { TipoCaracteristica } from '../classes/dto/tipo-caracteristica';

@Injectable({
  providedIn: 'root'
})
export class TipoCaracteristicaService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService) { }

  public async obtnerListaTipoCaracteristica() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.tipoCaracteristica.lista');
    const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
    const lstTipoCaracteristica = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_TIPO_CARACTERISTICA, objPeticion));
    _.forEach(lstTipoCaracteristica, function (tipo) {
      tipo.estado = toBoolean(tipo.estado);
    })

    return lstTipoCaracteristica;
  }

  public async obtnerListaCatalogo() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.catalogo');
    const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
    const lstTipoBien = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_CATALOGO_TIPO_BIEN, objPeticion));

    return lstTipoBien;
  }

  public async obtnerListaCatalogoCaracteristica() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.catalogo');
    const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
    const lstCaracteristicaTipo = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_CATALOGO_CARACTERISTICA_TIPO_BIEN, objPeticion));

    return lstCaracteristicaTipo;
  }

  public async registrarTipoCaracteristica(tipoCaracteristica: TipoCaracteristica): Promise<TipoCaracteristica> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
    const objeto: TipoCaracteristica = await (this.genericService.servicioRestGenericoPost(tipoCaracteristica, PERSISTENCIA_PROC_XML_CRUD_TIPO_CARACTERISTICA, opcionesRespuesta)) as TipoCaracteristica;
    return objeto;
  }

  public async obtnerListaTipoCaracteristicaModal(idTipoBien: string | undefined) {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.tipoCaracteristica.lista');
    const filtro: FiltroSpConsultas = { filtro: idTipoBien, tipoConsulta: '' };
    const lstTipoCaracteristicaModal = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_TIPO_CARACTERISTICA_MODAL, objPeticion));
    _.forEach(lstTipoCaracteristicaModal, function (tipo) {
      tipo.estado = toBoolean(tipo.estado);
    })

    return lstTipoCaracteristicaModal;
  }
}
