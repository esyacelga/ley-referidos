import {Component, OnDestroy, OnInit} from '@angular/core';
import {PerstFlujoVersion} from "../../../classes/perst-flujo-version";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {BarraHerramientaBoton} from "../../../../../../shared/barra-herramientas/barra-herramientas.component";

@Component({
  selector: 'app-cont-flujo-version',
  templateUrl: './cont-flujo-version.component.html',
  styleUrls: ['./cont-flujo-version.component.css']
})
export class ContFlujoVersionComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  objFlujoVersion: PerstFlujoVersion = new PerstFlujoVersion('', '', '', '', '');
  private objSubscripcion: Subscription | undefined;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setWithOutSeccion();

  }


  public nuevoRegistro() {
    this.objFlujoVersion = new PerstFlujoVersion('0', '', '', '', '');
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'CANCELAR') {
        this.objFlujoVersion = new PerstFlujoVersion('', '', '', '', '');
      }
      if (data === 'NUEVO') {
        this.nuevoRegistro();
      }
    });
  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }


}
