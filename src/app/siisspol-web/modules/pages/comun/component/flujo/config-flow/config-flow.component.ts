import {Component, OnInit} from '@angular/core';
import {BarraHerramientaBoton} from "../../../../../../shared/barra-herramientas/barra-herramientas.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {Subscription} from "rxjs";
import {ProcesoFlujoService} from "../../../../documento/services/proceso.flujo.service";
import {PerstConfigFlow} from "../../../classes/perst-config-flow";

@Component({
  selector: 'app-config-flow',
  templateUrl: './config-flow.component.html',
  styleUrls: ['./config-flow.component.css']
})
export class ConfigFlowComponent implements OnInit {
  barraHerramientaBoton: BarraHerramientaBoton = new BarraHerramientaBoton(true);
  private objSubscripcion: Subscription | undefined;
  lstConfiguracion: any[] = [];
  activa: boolean = true;
  objSalida: PerstConfigFlow = new PerstConfigFlow('', '', '', '', '', '', '')

  constructor(public svrComun: ProcesoFlujoService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    //this.intSvr.setWithOutSeccion();
    this.intSvr.setWithOutSeccion();
  }

  public cargarObjeto(objPersistencia: PerstConfigFlow) {
    if (objPersistencia.idProcesoConfiguracion != '') {
      this.barraHerramientaBoton = new BarraHerramientaBoton(true);
      this.barraHerramientaBoton.verNuevo = true;
    }

    this.objSalida = objPersistencia;
  }

  public cancelar() {
    this.activa = false;
    this.objSalida = new PerstConfigFlow('', '', '', '', '', '', '')
  }

  public async cargarArbol() {
    this.lstConfiguracion = [];
    const data = await this.svrComun.obtenerConfiguraciones();
    this.lstConfiguracion = data;
    if (!this.lstConfiguracion) {
      this.barraHerramientaBoton = new BarraHerramientaBoton(true);
    }
  }

  public cargargarMetodosInciales() {
    this.cargarArbol();

  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'CANCELAR') {
        this.cancelar();
      }
      /*   if (data === 'VOID') {
           this.cargarArbol();
         }*/
      if (data === 'NUEVO') {
        this.activa = false;
      }
    });
    this.cargargarMetodosInciales();
  }


}
