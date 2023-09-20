import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {ExecuteCallProcedureService} from "../../../../../../system/services/system/execute-call-procedure.service";
import {PerstConfigFlow} from "../../../../classes/perst-config-flow";
import {PerstFlujoVersion} from "../../../../classes/perst-flujo-version";
import {ProcesoFlujoService} from "../../../../../documento/services/proceso.flujo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-config',
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.css']
})
export class FormConfigComponent implements OnInit {
  @Input('objConfig') objPersistencia: PerstConfigFlow = new PerstConfigFlow('', '', '', '', '', '', '');
  lstVersiones: PerstFlujoVersion[] = new Array();
  private objSubscripcion: Subscription | undefined;

  constructor(public svrVersion: ProcesoFlujoService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setWithOutSeccion()
  }

  public cargarNuevoRegistro() {
    if (this.objPersistencia.idProcesoConfiguracion != '') {
      this.objPersistencia = new PerstConfigFlow('', this.objPersistencia.idProcesoConfiguracion, this.objPersistencia.idProcesoFlujoVersion, '', '', '', '')
    }
  }

  ngOnInit(): void {
    this.cargarVersiones();
    this.metodosIniciales();

  }

  public metodosIniciales() {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      /*   if (data === 'CANCELAR') {
           this.objFlujoVersion = new PerstFlujoVersion('', '', '', '', '');
         }
         if (data === 'NUEVO') {
           this.nuevoRegistro();
         }
         */
      if (data === 'NUEVO') {
        this.cargarNuevoRegistro();
      }
      if (data === 'GUARDAR') {
        this.registrarConfiguracion(this.objPersistencia);
      }
    });
  }

  public registrarConfiguracion(data: PerstConfigFlow) {
    this.svrVersion.registrarConfiguracion(data);
  }

  public async cargarVersiones() {
    this.lstVersiones = await this.svrVersion.obtenerTodosFlujoVersion();
  }

}
