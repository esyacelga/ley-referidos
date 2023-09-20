import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestOptions } from 'src/app/siisspol-web/modules/system/classes/RequestOptions';
import { toBoolean } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';
import { ExecuteCallProcedureService } from 'src/app/siisspol-web/modules/system/services/system/execute-call-procedure.service';
import * as _ from 'underscore';
import { PROC_OBTENER_DOCUMENTO_ADJUNTO_REMATE_POSTULANTE, PROC_OBTENER_LISTA_CATALOGO_REQUISITOS, PROC_OBTENER_LISTA_POSTULANTE, PROC_OBTENER_LISTA_POSTULANTE_PERSONA, PROC_OBTENER_LISTA_POSTULANTE_POR_REMATE, PROC_OBTENER_LISTA_REMATE_REQUISITOS } from '../../../constantes/consulta-constante';
import { PERSISTENCIA_PROC_XML_CRUD_POSTULANTE, PERSISTENCIA_PROC_XML_INSERTAR_DOCUMENTO_ADJUNTO_REMATE_POSTULANTE } from '../../../constantes/transaccion-constante';
import { Postulante } from '../classes/dto/postulante';
import { RematePostulanteAdjunto } from '../classes/dto/remate-postulante-adjunto';
import { UploadService } from 'src/app/siisspol-web/modules/system/services/system/upload.service';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {
  private lstAdjuntoDto: RematePostulanteAdjunto[] = [];
  private objImgSel: RematePostulanteAdjunto | undefined;
  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService, private upload: UploadService) { }

  public async obtnerListaPostulante(idPersona : number, tipoUsuario : string) {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.postulante.lista');
    const filtro: FiltroSpConsultas = { filtro: idPersona, tipoConsulta: tipoUsuario };
    const lstPostulante= await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_POSTULANTE, objPeticion));
    _.forEach(lstPostulante, function (postulante) {
      postulante.esGanador = toBoolean(postulante.esGanador);
      postulante.esDevuelto = toBoolean(postulante.esDevuelto);
      postulante.cumpleRequisitos = toBoolean(postulante.cumpleRequisitos);
    })

    return lstPostulante;
  }

  public async obtnerListaCatalogo() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.catalogo');
    const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
    const lstRequerimientos = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_CATALOGO_REQUISITOS, objPeticion));
    _.forEach(lstRequerimientos, function (requerimiento) {
      requerimiento.seleccionado = toBoolean(requerimiento.seleccionado);
  })

    return lstRequerimientos;
  }

  public async obtnerListaRemateRequisitos() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.catalogo');
    const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
    const lstRequerimientos = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_REMATE_REQUISITOS, objPeticion));
    _.forEach(lstRequerimientos, function (requerimiento) {
      requerimiento.juridico = toBoolean(requerimiento.juridico);
      requerimiento.natural = toBoolean(requerimiento.natural);
      requerimiento.seleccionado = false;
  })

    return lstRequerimientos;
  } 

  public async obtnerPersona(identificacion : string | undefined) {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.postulante.lista');
    const filtro: FiltroSpConsultas = { filtro: identificacion, tipoConsulta: '' };
    const lstPostulantePersona= await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_POSTULANTE_PERSONA, objPeticion));

    return lstPostulantePersona;
  }

  public async registrarPostulante(remate: Postulante): Promise<Postulante> {
    const opcionesRespuesta = new RequestOptions();
    opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
    const objeto: Postulante = await (this.genericService.servicioRestGenericoPost(remate, PERSISTENCIA_PROC_XML_CRUD_POSTULANTE, opcionesRespuesta)) as Postulante;
    return objeto;
}

public async obtnerListaPostulantePorRemate(idRemate : number) {
  const objPeticion: RequestOptions = new RequestOptions();
  objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.postulante.lista');
  const filtro: FiltroSpConsultas = { filtro: idRemate, tipoConsulta: '' };
  const lstPostulante= await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_POSTULANTE_POR_REMATE, objPeticion));
  _.forEach(lstPostulante, function (postulante) {
    postulante.esGanador = toBoolean(postulante.esGanador);
})
  return lstPostulante;
}

public async insertarActualizarAdjunto(adjuntoPersistence: RematePostulanteAdjunto) {
  const opciones: RequestOptions = new RequestOptions();
  opciones.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.adjujnto');
  opciones.presentarToast = false;
  const objDocumento: RematePostulanteAdjunto = await this.genericService.servicioRestGenericoPost(adjuntoPersistence, 
    PERSISTENCIA_PROC_XML_INSERTAR_DOCUMENTO_ADJUNTO_REMATE_POSTULANTE, opciones) as RematePostulanteAdjunto;
  return objDocumento;
}

public async obtenerImagen(obj?: Postulante) {
  if (!obj?.idRemate)
      return;
  // @ts-ignore
  const filtro: FiltroSpConsultas = { filtro: obj.idRemate, tipoConsulta: obj.idPersonaTipoSubtipo };
  const objPeticion: RequestOptions = new RequestOptions();
  objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.imagen');

  this.lstAdjuntoDto = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_DOCUMENTO_ADJUNTO_REMATE_POSTULANTE, objPeticion) as unknown as RematePostulanteAdjunto[]);
  if (this.lstAdjuntoDto) {
      // @ts-ignore
      for (var i = 0; i< this.lstAdjuntoDto.length; i++){
          this.objImgSel = this.lstAdjuntoDto[i];

          if (this.objImgSel){
              this.upload.abrirUrl(this.objImgSel.imagen!, this.objImgSel.nombreArchivo!, this.objImgSel.tipo!, this.objImgSel.peso!)
          }                
      }
     
  }else{
      objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.imagen');
  }

}

public async cargarImagen(obj?: Postulante) {
  if (!obj?.idRemate)
      return;
  // @ts-ignore
  const filtro: FiltroSpConsultas = { filtro: obj.idRemate, tipoConsulta: obj.idPersonaTipoSubtipo };
  const objPeticion: RequestOptions = new RequestOptions();
  objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.imagen');

  this.lstAdjuntoDto = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_DOCUMENTO_ADJUNTO_REMATE_POSTULANTE, objPeticion) as unknown as RematePostulanteAdjunto[]);
  return this.lstAdjuntoDto;
}

}

export interface FiltroSpConsultas {
  tipoConsulta: string,
  filtro: any
}
