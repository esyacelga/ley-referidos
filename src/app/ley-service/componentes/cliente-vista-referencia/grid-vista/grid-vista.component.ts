import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PersonaReferenciaService} from "../../../services/persona-referencia.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {
  ExecuteCallProcedureService
} from "../../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";

@Component({
  selector: 'app-grid-vista',
  templateUrl: './grid-vista.component.html',
  styleUrls: ['./grid-vista.component.css']
})
export class GridVistaComponent implements OnInit, OnDestroy {
  lstPersonas: PersonaReferenciaDto [] = new Array();
  @Input('intputPersona') intputPersona: number = 0;
  @Output('outPersona') outPersona: EventEmitter<PersonaReferenciaDto> = new EventEmitter<PersonaReferenciaDto>()

  constructor(public svrReferencia: PersonaReferenciaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setActiveRoute(route);
  }

  ngOnDestroy(): void {

  }

  async ngOnInit() {
    if (this.intputPersona==0)
      this.lstPersonas = await this.svrReferencia.obtenerPersonas();
    else
      this.lstPersonas = await this.svrReferencia.obtenerClientePorPadre(this.intputPersona);
  }

  verInforacion(item: PersonaReferenciaDto) {
    this.outPersona.emit(item);
  }
}
