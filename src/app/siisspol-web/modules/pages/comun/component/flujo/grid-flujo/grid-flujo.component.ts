import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProcesoFlujoService} from "../../../../documento/services/proceso.flujo.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {RemoteEjecutionFlow} from "../../../services/remote-ejecution-flow";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {PersProcesoFlujo} from "../../../../documento/classes/dto/PersProcesoFlujo";

@Component({
  selector: 'app-grid-flujo',
  templateUrl: './grid-flujo.component.html',
  styleUrls: ['./grid-flujo.component.css']
})
export class GridFlujoComponent implements OnInit {

  @Output("idProcesoFlujo") idProcesoFlujo: EventEmitter<string> = new EventEmitter();

  lstFlujoProceso: PersProcesoFlujo[] = new Array();

  constructor(private svrFlujo: ProcesoFlujoService, private store: Store<AppState>,
              private route: ActivatedRoute,
              private externalSvr: RemoteEjecutionFlow,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route);
  }

  public async cargarGrid() {
    this.lstFlujoProceso = await this.svrFlujo.obtenerTodosFlujo();
  }

  ngOnInit(): void {
    this.cargarGrid();
  }

  public editarRegistro(objeto: PersProcesoFlujo) {
    this.idProcesoFlujo.emit(objeto.idProcesoFlujo);
  }


}
