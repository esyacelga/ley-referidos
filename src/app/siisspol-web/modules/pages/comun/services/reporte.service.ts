import {Inject, Injectable} from '@angular/core';
import {ReporteDto} from "../classes/reporte-dto";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {obtenerUrlConnRest} from "../../../system/funcions/texto.utils";
import {DOCUMENT} from "@angular/common";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ReporteGeneradoParametro} from "../classes/reporte-generado-parametro";

const ROOT_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  // @ts-ignore
  @BlockUI() blockUI: NgBlockUI;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any) {
  }

  private _proPostParams(parametros: ReporteGeneradoParametro): Observable<any> {
    const url = `${obtenerUrlConnRest(ROOT_URL, this.document.location.href)}/generarReporteRst`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //return this.http.put<string>(url, {params: parametros, headers});
    return this.http.put(url, parametros);
  }

  private _proPostParamsOBS(parametros: ReporteGeneradoParametro) {
    this.blockUI.start('Generando reporte ('+parametros.tituloReporte+')...');
    return new Promise(async (resolve, reject) => {
      this._proPostParams(parametros).subscribe(async resp => {
        this.blockUI.stop();
        resolve(resp);
      }, async httpError => {
        this.blockUI.stop();
        reject(httpError);
      });
    });
  }

  public async generarReporte(parametros: ReporteGeneradoParametro) {
    const data = await (this._proPostParamsOBS(parametros) as unknown as string);
    return data;
  }


  private _obtenerPlantillaReporte(identificador: string): Observable<ReporteDto> {
    const url = `${obtenerUrlConnRest(ROOT_URL, this.document.location.href)}/obtenerPantillaReporte`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ReporteDto>(url, {params: {identificador}, headers});
  }

  private obtenerPlantillaReporte(identificador: string) {
    this.blockUI.start();
    return new Promise(async (resolve, reject) => {
      this._obtenerPlantillaReporte(identificador).subscribe(async resp => {
        this.blockUI.stop();
        resolve(resp);
      }, async httpError => {
        this.blockUI.stop();
        reject('Error al ejecutar la solicitud');
      });
    });
  }

  public async buscarReporteIdentificador(identificador: string) {
    const data = await (this.obtenerPlantillaReporte(identificador) as unknown as ReporteDto);
    return data;
  }

}
