import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {PoaService} from "../services/poa.service";
import {ActivatedRoute} from "@angular/router";
import {PoaDto} from "../classes/PoaDto";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/redux/store/reducers/app.reducer";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-crud-poa',
  templateUrl: './form-crud-poa.component.html',
  styleUrls: ['./form-crud-poa.component.css']
})
export class FormCrudPoaComponent implements OnInit, OnDestroy {
  objPersistencia: PoaDto = new PoaDto('', '', '', '', '', '', '', '');
  private objSubscripcion: Subscription | undefined;

  constructor(private intSvr: ExecuteCallProcedureService,
              private svrPoa: PoaService,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.intSvr.setActiveRoute(route)
  }

  public obtenerAnioActual() {
    const fechaActual = new Date();
    this.objPersistencia.anio = fechaActual.getFullYear();
  }

  public validarFormulario(objPersistencia: PoaDto): boolean {
    if (!objPersistencia.anio) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.poa.ingreso.anio'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }

    if (!objPersistencia.codigoPresupuesto) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.peso'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }

    if (!objPersistencia.presupuestoReformado) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.poa.ingreso.valor.reformado'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if (!objPersistencia.presupuestoDisponible) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.poa.ingreso.valor.disponible'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if (!objPersistencia.presupuestoInicial) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.poa.ingreso.valor.inicial'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    return true;

  }

  public registrarPoa(objPersistencia: PoaDto) {
    if (this.validarFormulario(objPersistencia))
      this.svrPoa.registrarPoa({...objPersistencia});
  }

  ngOnInit(): void {
    this.obtenerAnioActual();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.registrarPoa(this.objPersistencia);
      }
      if (data === 'CANCELAR') {
        //this.objTipoDelito = undefined;
      }
      if (data === 'NUEVO') {
        //this.crearNuevoRegistro();
      }
    });
  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }


}
