import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilCoreSystem} from '../../classes/util-core-system';
import {RequestDto} from '../../classes/request-dto';
import {Observable} from 'rxjs';
import {ParamFilter} from '../../classes/ParamFilter';
import {environment} from '../../../../../../environments/environment';
import {convertitJsonAXml} from '../../funcions/lista.utils';
import {DOCUMENT} from "@angular/common";
import {obtenerUrlConnRest} from "../../funcions/texto.utils";


const ROOT_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RestConnectionService {

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: any,
              private utilitario: UtilCoreSystem,
  ) {
  }


  public procConsultaPaginacionGenerica = (genericObject: ParamFilter, nombreSP: string, urlRestService: string | undefined): Observable<any> => {
    genericObject.storeProcedure = nombreSP;
    const url = obtenerUrlConnRest(ROOT_URL, this.document.location.href) + '/' + urlRestService;
    return this.http.put(url, genericObject);
  };

  public procConsultaGenerica = (genericObject: any, nombreSP: string, urlRestService: string | undefined, sessionId: string | undefined, usuarioId: string | undefined): Observable<any> => {
    const data = convertitJsonAXml(genericObject, '');
    const obj = new RequestDto();
    obj.valorXml = data;
    obj.storeProcedure = nombreSP;
    obj.sessionId = sessionId;
    obj.usuario = usuarioId;
    const url = obtenerUrlConnRest(ROOT_URL, this.document.location.href) + '/' + urlRestService;
    return this.http.put(url, obj);
  };


  public procTransaccionalGenerica = (genericObject: any, nombreSP: string, urlRestService: string | undefined, sessionId: string | undefined, usuarioId: string | undefined): Observable<any> => {
    const data = convertitJsonAXml(genericObject, '');
    const obj = new RequestDto();
    obj.valorXml = data;
    obj.storeProcedure = nombreSP;
    obj.sessionId = sessionId;
    obj.usuario = usuarioId;
    const url = obtenerUrlConnRest(ROOT_URL, this.document.location.href) + '/' + urlRestService;
    return this.http.put(url, obj);
  };




}
