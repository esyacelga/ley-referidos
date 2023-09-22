import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonaReferenciaService} from "../../services/persona-referencia.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {
  ExecuteCallProcedureService
} from "../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {PersonaReferenciaDto} from "../../classes/PersonaReferenciaDto";

@Component({
  selector: 'app-cliente-vista-referencia',
  templateUrl: './cliente-vista-referencia.component.html',
  styleUrls: ['./cliente-vista-referencia.component.css']
})
export class ClienteVistaReferenciaComponent implements OnInit, OnDestroy {
  lstPersonas: PersonaReferenciaDto [] = new Array();
  personaReferenciaDto: PersonaReferenciaDto = new PersonaReferenciaDto(undefined, 0, '', '', '', '');

  constructor(public svrReferencia: PersonaReferenciaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setWithOutSeccion();
  }

  ngOnDestroy(): void {
  }

  async ngOnInit() {
    this.lstPersonas = await this.svrReferencia.obtenerPersonas();
  }

}
