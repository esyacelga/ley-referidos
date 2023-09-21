import {Component, OnInit} from '@angular/core';
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";
import {PersonaReferenciaService} from "../../../services/persona-referencia.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {
  ExecuteCallProcedureService
} from "../../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-grid-persona-referencia',
  templateUrl: './grid-persona-referencia.component.html',
  styleUrls: ['./grid-persona-referencia.component.css']
})
export class GridPersonaReferenciaComponent implements OnInit {
  lstPersonas: PersonaReferenciaDto [] = new Array();

  constructor(public svrReferencia: PersonaReferenciaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setActiveRoute(route);
  }

  private async cargarGrid() {
    this.lstPersonas = await this.svrReferencia.obtenerPersonas();
  }

  ngOnInit(): void {
    this.cargarGrid();
  }
}
