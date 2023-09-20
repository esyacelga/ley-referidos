import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { toBoolean } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';
import * as _ from 'underscore';
import { RequestOptions } from '../../../../system/classes/RequestOptions';
import { ExecuteCallProcedureService } from '../../../../system/services/system/execute-call-procedure.service';
import { PROC_OBTENER_DOCUMENTO_ADJUNTO_REMATE, PROC_OBTENER_LISTA_CATALOGOS, PROC_OBTENER_LISTA_REMATES, PROC_OBTENER_LISTA_REMATE_CRONOGRAMA, PROC_OBTENER_UBICACION_GEOGRAFICA } from '../../../constantes/consulta-constante';
import { PERSISTENCIA_PROC_XML_CRUD_REMATE, PERSISTENCIA_PROC_XML_CRUD_REMATE_CRONOGRAMA, PERSISTENCIA_PROC_XML_INSERTAR_DOCUMENTO_ADJUNTO_REMATE, PERSISTENCIA_PROC_XML_SELECCIONAR_GANADOR } from '../../../constantes/transaccion-constante';
import { Remate } from '../classes/dto/Remate';
import { RemateCronograma } from '../classes/dto/remate-cronograma';
import { RemateAdjunto } from '../classes/dto/remate-adjunto';
import { UploadService } from 'src/app/siisspol-web/modules/system/services/system/upload.service';


@Injectable({
    providedIn: 'root'
})

export class RemateService {
    private lstAdjuntoDto: RemateAdjunto[] = [];
    private objImgSel: RemateAdjunto | undefined;
    
    constructor(private genericService: ExecuteCallProcedureService, 
        private svrTrsnslate: TranslateService,
        private upload: UploadService
    ) {
        
    }

    public async obtnerListaRemate() {
        const objPeticion: RequestOptions = new RequestOptions();
        objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.remate');
        const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
        const lstRemates = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_REMATES, objPeticion));
        _.forEach(lstRemates, function (remate) {
            remate.estado = toBoolean(remate.estado);
        })

        return lstRemates;
    }

    public async obtnerListaCatalogo() {
        const objPeticion: RequestOptions = new RequestOptions();
        objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.catalogo');
        const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
        const lstCatalogos = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_CATALOGOS, objPeticion));
        return lstCatalogos;
    }

    public async obtenerListaUbicacion() {
        const objPeticion: RequestOptions = new RequestOptions();
        objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.remate.lista.catalogo');
        const filtro: FiltroSpConsultas = { filtro: '', tipoConsulta: '' };
        const lstUbicacion = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_UBICACION_GEOGRAFICA, objPeticion));
        return lstUbicacion;
    }

    public async registrarRemate(remate: Remate): Promise<Remate> {
        const opcionesRespuesta = new RequestOptions();
        opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
        const objeto: Remate = await (this.genericService.servicioRestGenericoPost(remate, PERSISTENCIA_PROC_XML_CRUD_REMATE, opcionesRespuesta)) as Remate;
        return objeto;
    }

    public async obtenerListaRemateCronograma(idRemate: number | undefined) {
        const objPeticion: RequestOptions = new RequestOptions();
        objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.remate.cronograma.lista.cronograma');
        const filtro: FiltroSpConsultas = { filtro: idRemate, tipoConsulta: '' };
        const lstRemateCronograma = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_LISTA_REMATE_CRONOGRAMA, objPeticion));
        _.forEach(lstRemateCronograma, function (remate) {
            remate.idEstadoCronograma = toBoolean(remate.idEstadoCronograma);
        })
        return lstRemateCronograma;
    }

    public async registrarRemateCronograma(remateCronograma: RemateCronograma): Promise<RemateCronograma> {
        const opcionesRespuesta = new RequestOptions();
        opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
        const objeto: RemateCronograma = await (this.genericService.servicioRestGenericoPost(remateCronograma, PERSISTENCIA_PROC_XML_CRUD_REMATE_CRONOGRAMA, opcionesRespuesta)) as RemateCronograma;
        return objeto;
    }

    public async insertarActualizarAdjunto(adjuntoPersistence: RemateAdjunto) {
        const opciones: RequestOptions = new RequestOptions();
        opciones.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.adjujnto');
        opciones.presentarToast = false;
        const objDocumento: RemateAdjunto = await this.genericService.servicioRestGenericoPost(adjuntoPersistence, PERSISTENCIA_PROC_XML_INSERTAR_DOCUMENTO_ADJUNTO_REMATE, opciones) as RemateAdjunto;
        return objDocumento;
    }

    public async obtenerImagen(obj?: Remate, tipoArchivo?: string) {
        if (!obj?.idRemate)
            return;
        // @ts-ignore
        const filtro: FiltroSpConsultas = { filtro: obj.idRemate, tipoConsulta: tipoArchivo };
        const objPeticion: RequestOptions = new RequestOptions();
        objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.imagen');

        this.lstAdjuntoDto = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_DOCUMENTO_ADJUNTO_REMATE, objPeticion) as unknown as RemateAdjunto[]);
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

    public async cargarImagenes(obj?: Remate, tipoArchivo?: string) {
        if (!obj?.idRemate)
            return;
        // @ts-ignore
        const filtro: FiltroSpConsultas = { filtro: obj.idRemate, tipoConsulta: tipoArchivo };
        const objPeticion: RequestOptions = new RequestOptions();
        objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.documento.imagen');

        this.lstAdjuntoDto = await (this.genericService.getGenericObjects(filtro, PROC_OBTENER_DOCUMENTO_ADJUNTO_REMATE, objPeticion) as unknown as RemateAdjunto[]);
        return this.lstAdjuntoDto;

    }

    public async seleccionarGanador(remate: Remate): Promise<Remate> {
        const opcionesRespuesta = new RequestOptions();
        opcionesRespuesta.successMessaje = this.svrTrsnslate.instant('siisspolweb.comun.registro.guardado');
        const objeto: Remate = await (this.genericService.servicioRestGenericoPost(remate, PERSISTENCIA_PROC_XML_SELECCIONAR_GANADOR, opcionesRespuesta)) as Remate;
        return objeto;
    }

}

export interface FiltroSpConsultas {
    tipoConsulta: string,
    filtro: any
}
