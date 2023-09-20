import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarraHerramientaBoton} from "../../../../../shared/barra-herramientas/barra-herramientas.component";
import {RemoteEjecutionFlow} from "../../services/remote-ejecution-flow";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../shared/redux/store/reducers/app.reducer";

@Component({
  selector: 'app-flujo',
  templateUrl: './flujo.component.html',
  styleUrls: ['./flujo.component.css'],

})
export class FlujoComponent implements OnInit, OnDestroy {
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  idProcesoFlujo: string = "";
  private objSubscripcion: Subscription | undefined;

  constructor(private miServicio: RemoteEjecutionFlow, private store: Store<AppState>,) {

  }

  private registarFlujo() {
    this.miServicio.registarFlujo();
  }

  private registarVersionFlujo() {
    this.miServicio.registratVersionFlujo();
    this.objBtn = new BarraHerramientaBoton();
  }

  private generaNuevoRegistro() {
    if (this.idProcesoFlujo == '') {
      this.idProcesoFlujo = "0";
    } else {
      this.miServicio.nuevoVersionFlujo();
    }
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        /*this.insertar(this.objPregunta);*/
        this.registarFlujo();
        //this.registarVersionFlujo();
      }
      if (data === 'CANCELAR') {
        //this.objPregunta = undefined;
        this.idProcesoFlujo = '';
      }
      if (data === 'NUEVO') {
        this.generaNuevoRegistro();
      }
    });

  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }


}
