import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../redux/store/reducers/app.reducer";
import {setAccionSmall} from "../redux/store/actions/barra-herramientas.actions";
import {botonesBarraHerramientasSmall} from "../redux/types";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-barra-herramientas-modal',
  templateUrl: './barra-herramientas-modal.component.html',
  styleUrls: ['./barra-herramientas-modal.component.css']
})
export class BarraHerramientasModalComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;

  constructor(private store: Store<AppState>,) {


  }

  public registrar(accion: botonesBarraHerramientasSmall) {
    accion = 'VOID';
    this.store.dispatch(setAccionSmall({accion}));
    accion = 'GUARDAR-MODAL';
    this.store.dispatch(setAccionSmall({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccionSmall({accion}));
  }

  public cancelar(accion: botonesBarraHerramientasSmall) {
    accion = 'VOID';
    this.store.dispatch(setAccionSmall({accion}));
    accion = 'CANCELAR-MODAL';
    this.store.dispatch(setAccionSmall({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccionSmall({accion}));
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
