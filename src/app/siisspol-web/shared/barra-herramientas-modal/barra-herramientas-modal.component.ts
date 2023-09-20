import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../redux/store/reducers/app.reducer";
import {setAccion} from "../redux/store/actions/barra-herramientas.actions";
import {botonesBarraHerramientas} from "../redux/types";

@Component({
  selector: 'app-barra-herramientas-modal',
  templateUrl: './barra-herramientas-modal.component.html',
  styleUrls: ['./barra-herramientas-modal.component.css']
})
export class BarraHerramientasModalComponent {
  constructor(private store: Store<AppState>,) {


  }

  public registrar(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'GUARDAR';
    this.store.dispatch(setAccion({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
  }

  public cancelar(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'CANCELAR';
    this.store.dispatch(setAccion({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
  }

}
