import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {PersonaDto} from "../PersonaDto";
import {BlockUI, NgBlockUI} from "ng-block-ui";

const ROOT_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  // @ts-ignore
  @BlockUI() blockUI: NgBlockUI;

  constructor(private http: HttpClient) {
  }

  private obtenerPersonaRestClient(cedula: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {cedula: cedula};
    return this.http.get<PersonaDto>("https://siisspolweb.isspol.org.ec" + "/getPersona", {
      headers: headers,
      params: params
    });
  }

  private obtenerPersonaObservable = (cedula: string) => {
    return new Promise(async (resolve, reject) => {
      this.obtenerPersonaRestClient(cedula).subscribe(async resp => {
        resolve(resp);
      }, async httpError => {
        reject('Error al ejecutar la solicitud');
      });
    })
  }

  public async buscarPersona(cedula: string) {
    let personaDto: PersonaDto;
    try {
      this.blockUI.start("Procesando..");
      personaDto = await (this.obtenerPersonaObservable(cedula)) as PersonaDto;
      this.blockUI.stop();
    } catch (error) {
      // @ts-ignore
      personaDto = undefined;
      this.blockUI.stop();
    }

    return personaDto;
  }


}
