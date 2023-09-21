import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BarraHerramientaBoton} from "../../../siisspol-web/shared/barra-herramientas/barra-herramientas.component";
import {PersonaReferenciaService} from "../../services/persona-referencia.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {
  ExecuteCallProcedureService
} from "../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {PersonaReferenciaDto} from "../../classes/PersonaReferenciaDto";
import {botonesBarraHerramientas} from "../../../siisspol-web/shared/redux/types";

@Component({
  selector: 'app-persona-referencia-contenedor',
  templateUrl: './persona-referencia-contenedor.component.html',
  styleUrls: ['./persona-referencia-contenedor.component.css']
})
export class PersonaReferenciaContenedorComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined);
  personaReferenciaDto: PersonaReferenciaDto = new PersonaReferenciaDto(undefined, 0, '', '', '', '', '');

  constructor(public svrReferencia: PersonaReferenciaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setActiveRoute(route)
  }

  public cargarPersona(persona: any) {
    this.objBtn = new BarraHerramientaBoton(true, undefined);
    this.personaReferenciaDto = persona;
  }


  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data: botonesBarraHerramientas) => {
      if (data === 'NUEVO') {
        this.personaReferenciaDto = new PersonaReferenciaDto(0, 0, '', '', '', '', '');
      }

    });
  }

  public revisarPersonaRegistrada(personaActual: PersonaReferenciaDto) {
    // @ts-ignore
    if (personaActual && personaActual.idPersonaReferencia) {
      this.personaReferenciaDto.idPersonaReferencia = undefined;
      this.objBtn = new BarraHerramientaBoton(undefined, undefined);
    }
  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }
}
