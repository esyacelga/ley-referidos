import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as configAction from "../actions";


import {ConfiguracionEstadoService} from "../../modules/pages/comun/services/configuracion-estado.service";
import {tap} from "rxjs";
import {mergeMap} from "rxjs-compat/operator/mergeMap";

@Injectable()
export class ConfigEffects {
  constructor(private actions$: Actions, private svrConfig: ConfiguracionEstadoService) {
  }

/*  cargarConfig$ = createEffect(
    () => this.actions$.pipe(
      ofType(configAction.cargarConfiguraciones),
      tap(data=>console.log("****",data)),
      mergeMap(
        ()=>this.svrConfig.obtenerConfiguracion()
      )


    )
  );*/

}
