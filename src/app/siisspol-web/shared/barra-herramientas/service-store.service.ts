import {Injectable} from '@angular/core';
import {botonesBarraHerramientas} from "../redux/types";
import {setAccion} from "../redux/store/actions/barra-herramientas.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../redux/store/reducers/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class ServiceStoreService {

  constructor(private store: Store<AppState>,) {

  }

  accionCancelar(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'CANCELAR';
    this.store.dispatch(setAccion({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
  }
  accionGuardar(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'GUARDAR';
    this.store.dispatch(setAccion({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
  }

}
