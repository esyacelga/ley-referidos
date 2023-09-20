import {Injectable} from '@angular/core';
import {RequestOptions} from '../../classes/RequestOptions';
import {
  COLOR_TOAST_PRIMARY,
  ERROR_MESSAGE,
  LOAD_MESSAGE,
  PROC_GET_XML_GENERICO,
  PROC_POST_XML_GENERICO,
  SUCCESS_MESSAGE
} from '../../classes/toast-constant';
import {UtilCoreSystem} from '../../classes/util-core-system';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {ToastrService} from 'ngx-toastr';
import {RestConnectionService} from './rest-connection.service';
import {tipoLLamada} from '../../classes/page-type';
import {ActivatedRoute} from '@angular/router';
import {SessionData} from '../../classes/session-data';
import {StorageAppService} from './storage-app.service';
import {isNull} from '../../funcions/texto.utils';


@Injectable({
  providedIn: 'root'
})
export class ExecuteCallProcedureService {
  // @ts-ignore
  @BlockUI() blockUI: NgBlockUI;
  identificadorUsuario: string = "";

  constructor(private utilService: UtilCoreSystem,
              private toastr: ToastrService,
              private svrStore: StorageAppService,
              private restConnection: RestConnectionService) {
  }

  private sessionId: string | undefined;
  private tipoUsuario: string | undefined;
  private idPersona: number | undefined;


  public getSessionId() {

    return this.sessionId;

  }

  public setSessionId(value: string) {
    this.sessionId = value;
  }

  public getTipoUsuario() {

    return this.tipoUsuario;

  }

  public setTipoUsuario(value: string) {
    this.tipoUsuario = value;
  } 

  public getIdPersona() {

    return this.idPersona;

  }

  public setIdPersona(value: number) {
    this.idPersona = value;
  } 

  public decodificarInformacionSecion(route: ActivatedRoute): any {
    const informacionCodificada = (route.snapshot.paramMap.get('informacionSesion') as string);
    const objJson: any = this.decodeBase64AndParseJson(informacionCodificada);
    return objJson;
  }

  private decodeBase64AndParseJson(encodedData: string) {
    try {
      // Decodificamos la cadena base64 utilizando atob()
      const decodedString = atob(encodedData);

      // Convertimos la cadena JSON decodificada a un objeto JSON
      const jsonData = JSON.parse(decodedString);

      return jsonData;
    } catch (error) {
      console.error("Error al decodificar y analizar el JSON:", error);
      return null;
    }
  }


  public setActiveRoute(route: ActivatedRoute) {
    if (!this.identificadorUsuario) {
      const data = this.decodificarInformacionSecion(route);
      const idSesion: string = data.idSesion;
      const idUsuario: string = data.idUsuario;
      const tipoUsuario: string = data.tipoUsuario;
      const idPersona: number = data.idPersona;
      this.svrStore.setStorageObject(data, 'sessionData')
      this.identificadorUsuario = idUsuario;
      this.setSessionId(idSesion);
      this.setTipoUsuario(tipoUsuario);
      this.setIdPersona(idPersona);
    }

  }

  public setWithOutSeccion() {
    const objSession = new SessionData('xxx', 'invitado', '0');
    this.svrStore.setStorageObject(objSession, 'sessionData')
    this.identificadorUsuario = 'invitado';
    this.setSessionId('xxx');
  }

  private modificaObjetoPeticion(esPeticionPost: tipoLLamada, peticionObjeto?: RequestOptions) {
    if (!peticionObjeto) {
      peticionObjeto = new RequestOptions();
    }
    if (peticionObjeto.successMessaje === undefined || peticionObjeto.successMessaje === '') {
      peticionObjeto.successMessaje = SUCCESS_MESSAGE;
    }
    if (peticionObjeto.errorMessage === undefined || peticionObjeto.errorMessage === '') {
      peticionObjeto.errorMessage = ERROR_MESSAGE;
    }
    if (peticionObjeto.loadingMessage === undefined || peticionObjeto.loadingMessage === '') {
      peticionObjeto.loadingMessage = LOAD_MESSAGE;
    }
    if (peticionObjeto.toastColor === undefined || peticionObjeto.toastColor === '') {
      peticionObjeto.toastColor = COLOR_TOAST_PRIMARY;
    }
    if ((peticionObjeto.restUrlTransacciones === undefined || peticionObjeto.restUrlTransacciones === '') && (esPeticionPost === 'TRANSACCIONAL')) {
      peticionObjeto.restUrlTransacciones = PROC_POST_XML_GENERICO;
    }

    if ((peticionObjeto.restUrlConsultas === undefined || peticionObjeto.restUrlConsultas === '') && (esPeticionPost === 'CONSULTAS')) {
      peticionObjeto.restUrlConsultas = PROC_GET_XML_GENERICO;
    }

    if ((peticionObjeto.responseType === undefined || peticionObjeto.responseType === null) && (esPeticionPost === 'CONSULTAS')) {
      peticionObjeto.responseType = 'LISTAENTIDAD';
    }
    return peticionObjeto;
  }

  public servicioRestGenericoPost = (genericObject: any, storeProcedure: string, peticionObjeto?: RequestOptions) => {
    return new Promise(async (resolve, reject) => {
      if (this.validarSessionId() === false) {
        return;
      }
      const tipoLlamada: tipoLLamada = 'TRANSACCIONAL';
      peticionObjeto = this.modificaObjetoPeticion(tipoLlamada, peticionObjeto);
      this.blockUI.start(peticionObjeto.loadingMessage);
      this.restConnection.procTransaccionalGenerica(genericObject, storeProcedure, peticionObjeto.restUrlTransacciones, this.getSessionId(), this.identificadorUsuario).subscribe(async resp => {
        this.blockUI.stop();
        let obj = null;
        // @ts-ignore
        if (resp.RETURN_VALUE === 1) {
          // @ts-ignore
          if (peticionObjeto.presentarToast) {
            // @ts-ignore
            this.toastr.success(peticionObjeto.successMessaje, 'Proceso ejecutado exitosamente');
          }
          obj = this.utilService.entidadDesdeXML(resp.AS_XML);
        } else {
          this.toastr.error(isNull(resp.AS_MSJ, 'Informacion no enviada desde base'), 'Validacion ejecutada');
        }
        resolve(obj);
      }, async httpError => {
        this.blockUI.stop();
        const objError = this.lectorError(httpError);
        if (objError.description == null || objError.error === null) {
          this.toastr.error(httpError.message, httpError.name);
        } else
          this.toastr.error(objError.description, objError.error);

        /*this.toastr.error(isNull(httpError.message, 'Ocurrio un error al ejecutar la peticion al servicio rest'), 'Error !!!!!!');*/
        reject('Error al ejecutar la solicitud');
      });

    });
  };

  private validarSessionId(): boolean {
    let bandera = false;
    if (this.getSessionId() !== '' && this.getSessionId() !== null) {
      bandera = true;
    } else {
      this.toastr.error('No se ha poddio obtener el id de sesion de la aplicacion padre', 'Error de configuracion de la aplicacion');
      bandera = false;
    }
    return bandera;
  }

  public async getGenericObjects(genericObject: any, storeProcedure: string, peticionObjeto?: RequestOptions): Promise<any> {
    if (this.validarSessionId() === false) {
      return;
    }
    const promesa = new Promise(async (resolve, reject) => {
      const tipoLlamada: tipoLLamada = 'CONSULTAS';
      peticionObjeto = this.modificaObjetoPeticion(tipoLlamada, peticionObjeto);
      this.blockUI.start(peticionObjeto.loadingMessage);
      this.restConnection.procConsultaGenerica(genericObject, storeProcedure, peticionObjeto.restUrlConsultas, this.getSessionId(), this.identificadorUsuario).subscribe(async resp => {
        this.blockUI.stop();
        if (resp.RETURN_VALUE !== 1) {
          this.toastr.error('Error', resp.AS_MSJ);
          reject(resp.AS_MSJ);
        } else {
          let obj = null;
          // @ts-ignore
          if (peticionObjeto.responseType === 'LISTAENTIDAD') {
            obj = this.utilService.listaDesdeXML(resp.AS_XML);
          } else {
            obj = this.utilService.entidadDesdeXML(resp.AS_XML);
          }
          resolve(obj);
        }
      }, async error => {
        this.blockUI.stop();
        // @ts-ignore
        const objError = this.lectorError(error);
        if (objError.description == null || objError.error === null) {
          this.toastr.error(error.message, error.name);
        } else
          this.toastr.error(objError.description, objError.error);
        reject(error);
      });
    });
    return promesa;
  }

  private lectorError = function (error: any): HttpError {
    if (!error.error) {
      const objetoErr = new HttpError('Error de llamada a servicio REST ', 'Error NG2');
      return objetoErr;
    }
    const objetoError = new HttpError(error.error.description, error.error.error);
    return objetoError;

  };

  public async getGenericPaginate<T>(genericObject: any, storeProcedure: string, peticionObjeto?: RequestOptions) {
    if (this.validarSessionId() === false) {
      return;
    }
    const promesa = new Promise(async (resolve, reject) => {
      const tipoLlamada: tipoLLamada = 'PAGINACION';
      peticionObjeto = this.modificaObjetoPeticion(tipoLlamada, peticionObjeto);
      this.blockUI.start('Procesando...');
      this.restConnection.procConsultaPaginacionGenerica(genericObject, storeProcedure, peticionObjeto.restUrlConsultas).subscribe(async resp => {
        this.blockUI.stop();
        if (resp.RETURN_VALUE !== 1) {
          this.toastr.error(resp.AS_MSJ, 'Error');
          // await this.presentToast(resp.AS_MSJ, COLOR_TOAST_ERROR);
          reject(resp.AS_MSJ);
        } else {
          const obj = {items: [], totalItems: 0};
          obj.items = this.utilService.listaDesdeXML(resp.XMLVARCHAR);
          obj.totalItems = resp.AI_TOTAL_ITEMS;
          // @ts-ignore
          obj.items = this.utilService.genericCastList<T>(obj.items);
          resolve(obj);
        }
      }, async error => {
        this.blockUI.stop();
        console.error(error);
        console.error(storeProcedure);
        // @ts-ignore
        this.toastr.error(options.errorMessage, 'Error');
        reject(error);
      });
    });
    return promesa;
  }


}

export class HttpError {
  description: string | undefined;
  error: string | undefined;

  constructor(description: string | undefined, error: string | undefined) {
    this.description = description;
    this.error = error;
  }
}
