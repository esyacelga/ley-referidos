import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {ProcesoFlujoService} from "../../../../documento/services/proceso.flujo.service";
import {PerstFlujoVersion} from "../../../classes/perst-flujo-version";
import {ordenDesendenteInt} from "../../../../../system/funcions/lista.utils";

@Component({
  selector: 'app-grid-flujo-version',
  templateUrl: './grid-flujo-version.component.html',
  styleUrls: ['./grid-flujo-version.component.css']
})
export class GridFlujoVersionComponent implements OnInit {

  @Output('objFVersion') objFVersion: EventEmitter<PerstFlujoVersion> = new EventEmitter();
  lstFlujoVersion: PerstFlujoVersion[] = new Array();

  constructor(private svrFlujo: ProcesoFlujoService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route)
  }

  public async cargarGrid() {
    const data: PerstFlujoVersion[] = await this.svrFlujo.obtenerTodosFlujoVersion();
    this.lstFlujoVersion = ordenDesendenteInt(data, 'idProcesoFlujoVersion');

  }

  ngOnInit(): void {
    this.cargarGrid();
  }

  public editarRegistro(data: PerstFlujoVersion) {
    this.objFVersion.emit(data);
  }


}
