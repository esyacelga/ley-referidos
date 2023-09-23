import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
import {Subscription} from "rxjs";

@Component({
  selector: 'app-grid-persona-referencia',
  templateUrl: './grid-persona-referencia.component.html',
  styleUrls: ['./grid-persona-referencia.component.css']
})
export class GridPersonaReferenciaComponent implements OnInit, OnDestroy {
  lstPersonas: PersonaReferenciaDto [] = new Array();
  private objSubscripcion: Subscription | undefined;
  @Input("idPadreCliente") idPadreCliente: number = 0;
  @Output('personaCliente') personaCliente: EventEmitter<PersonaReferenciaDto> = new EventEmitter();

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
    if (this.idPadreCliente === 0)
      this.lstPersonas = await this.svrReferencia.obtenerPersonas();
    else
      this.lstPersonas = await this.svrReferencia.obtenerClientePorPadre(this.idPadreCliente);
  }

  public editarRegistro(objeto: PersonaReferenciaDto) {
    this.personaCliente.emit(objeto)
  }

  ngOnInit(): void {

    this.cargarGrid();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'VOID') {
        this.cargarGrid();
      }
    });

  }

  ngOnDestroy(): void {
  }

  agregarReferidos(item: PersonaReferenciaDto) {
    item.agregarReferido = true;
    this.personaCliente.emit(item)
  }

  agregarNuevoViaje(item: PersonaReferenciaDto) {
    item.incrementar= true;
    this.svrReferencia.registrarPersona(item);
  }
}
