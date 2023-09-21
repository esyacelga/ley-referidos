import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BarraHerramientaBoton} from "../../../siisspol-web/shared/barra-herramientas/barra-herramientas.component";
import {PersonaReferenciaService} from "../../services/persona-referencia.service";
import {PersonaService} from "../../../siisspol-web/modules/pages/persona/services/persona.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {
  ExecuteCallProcedureService
} from "../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";

@Component({
  selector: 'app-persona-referencia-contenedor',
  templateUrl: './persona-referencia-contenedor.component.html',
  styleUrls: ['./persona-referencia-contenedor.component.css']
})
export class PersonaReferenciaContenedorComponent implements OnInit{
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined);
  constructor(public svrReferencia: PersonaReferenciaService,
              private svrPersona: PersonaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setActiveRoute(route)
  }
  ngOnInit(): void {
  }

}
