import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PerstFlujoVersion} from "../../../classes/perst-flujo-version";
import {ProcesoFlujoService} from "../../../../documento/services/proceso.flujo.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {Subscription} from "rxjs";
import {BarraHerramientaBoton} from "../../../../../../shared/barra-herramientas/barra-herramientas.component";
import {PersProcesoFlujoVersion} from "../../../../documento/classes/dto/PersProcesoFlujoVersion";
import {PersProcesoFlujo} from "../../../../documento/classes/dto/PersProcesoFlujo";

@Component({
  selector: 'app-form-flujo-version',
  templateUrl: './form-flujo-version.component.html',
  styleUrls: ['./form-flujo-version.component.css']
})
export class FormFlujoVersionComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input('flujoVersion') objFlujoVersion: PerstFlujoVersion = new PerstFlujoVersion('', '', '', '', '');
  @Output('objBarraHerramientas') objBarraHerramientas: EventEmitter<BarraHerramientaBoton> = new EventEmitter();
  @Output('perstFlujoVersion') perstFlujoVersion: EventEmitter<PerstFlujoVersion> = new EventEmitter();
  lstFlujo: PersProcesoFlujo[] = new Array();

  constructor(private svrFlujo: ProcesoFlujoService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route)
  }

  ngOnInit(): void {
    this.subscription = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.registrarFlujo();
      }
    });
    this.cargarLista();
  }

  public async cargarLista() {
    this.lstFlujo = await this.svrFlujo.obtenerTodosFlujo();
  }

  public async registrarFlujo() {
    const objeto: PersProcesoFlujoVersion = await this.svrFlujo.registrarFlujoVersion(this.objFlujoVersion);
    if (objeto) {
      this.objFlujoVersion = new PerstFlujoVersion('', '', '', '', '');
      this.perstFlujoVersion.emit(this.objFlujoVersion);
    }

  }

  ngAfterViewInit(): void {
    this.objBarraHerramientas.emit(new BarraHerramientaBoton(true))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

