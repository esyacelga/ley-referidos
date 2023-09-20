import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProcesoFlujoService} from "../../../../documento/services/proceso.flujo.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {PersProcesoFlujo} from "../../../../documento/classes/dto/PersProcesoFlujo";
import {Subscription} from 'rxjs';
import {RemoteEjecutionFlow} from "../../../services/remote-ejecution-flow";
import {BarraHerramientaBoton} from "../../../../../../shared/barra-herramientas/barra-herramientas.component";

@Component({
  selector: 'app-form-flujo',
  templateUrl: './form-flujo.component.html',
  styleUrls: ['./form-flujo.component.css']
})
export class FormFlujoComponent implements OnInit, OnDestroy {

  @Input("idFlujo") idFlujo: string = "";
  @Output('barraHerramientas') barraHerramientas: EventEmitter<BarraHerramientaBoton> = new EventEmitter();
  formFlujo: PersProcesoFlujo = new PersProcesoFlujo("", "", "", '','');
  seleccionadoA = false;

  private subscription: Subscription = new Subscription();

  constructor(private svrFlujo: ProcesoFlujoService, private store: Store<AppState>,
              private route: ActivatedRoute,
              private externalSvr: RemoteEjecutionFlow,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route);

  }


  public async registrarNuevoFlujo(obj: PersProcesoFlujo) {
    const data: PersProcesoFlujo = await this.svrFlujo.registrarFlujo(obj);
    if (data) {
      this.formFlujo = data;
    }
  }

  async ngOnInit() {
    if (this.formFlujo.idProcesoFlujo == "" && this.idFlujo != "0")
      this.formFlujo = await this.svrFlujo.obtenerFlujoPorId(this.idFlujo);
    if (this.formFlujo.idProcesoFlujo == "" && this.idFlujo == "0")
      this.formFlujo = new PersProcesoFlujo("", "", "", '','');
    this.subscription = this.externalSvr.ejecutarMetodoHijo$.subscribe(() => {
      this.registrarNuevoFlujo(this.formFlujo);
    });
    this.barraHerramientas.emit(new BarraHerramientaBoton(true));
    this.seleccionadoA = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
