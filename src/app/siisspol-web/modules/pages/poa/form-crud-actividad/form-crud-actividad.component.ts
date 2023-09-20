import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActividadProyecto} from "../classes/ActividadProyectoDto";
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {PoaService} from "../services/poa.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-crud-actividad',
  templateUrl: './form-crud-actividad.component.html',
  styleUrls: ['./form-crud-actividad.component.css']
})
export class FormCrudActividadComponent implements OnInit, OnDestroy {
  objetoPantalla: ActividadProyecto = new ActividadProyecto(0, 0, 0, '', 0, 0, 0, '', '', '', 0, '', '', '', '');
  CALENDER_CONFIG_EN: any;
  private objSubscripcion: Subscription | undefined;

  constructor(private intSvr: ExecuteCallProcedureService,
              private svrPoa: PoaService,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.intSvr.setActiveRoute(route)
  }


  private registrarActividad(objetoPersistencia: ActividadProyecto) {
    this.svrPoa.registrarActividadPoa(objetoPersistencia);
  }

  ngOnDestroy(): void {
  }


  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.registrarActividad(this.objetoPantalla);
      }
      if (data === 'CANCELAR') {
        //this.objTipoDelito = undefined;
      }
      if (data === 'NUEVO') {
        //this.crearNuevoRegistro();
      }
    });
  }

  detectarCambio() {
    setTimeout(() => {
      this.objetoPantalla.procesarValores();
    }, 250);

  }


}
