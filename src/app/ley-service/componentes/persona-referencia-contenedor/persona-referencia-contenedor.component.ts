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
import {MatDialog} from "@angular/material/dialog";
import {IsspolDialogObject} from "../../../siisspol-web/shared/confirmacion-modal/classes/isspol-dialog-object";
import {EmergPersonaReferenciaComponent} from "./emerg-persona-referencia/emerg-persona-referencia.component";

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
              public dialog: MatDialog,
              private intSvr: ExecuteCallProcedureService
  ) {
    this.intSvr.setActiveRoute(route)
  }

  public cargarPersona(persona: any) {
    this.objBtn = new BarraHerramientaBoton(true, undefined);
    this.personaReferenciaDto = persona;
    this.objBtn.verAgregar = true;
  }


  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data: botonesBarraHerramientas) => {
      if (data === 'NUEVO') {
        this.personaReferenciaDto = new PersonaReferenciaDto(0, 0, '', '', '', '', '');
      }
      if (data === 'AGREGAR') {
        this.abrirModalRegistro();
      }

    });
  }

  public abrirModalRegistro() {
    const configuracion: IsspolDialogObject = new IsspolDialogObject(this.personaReferenciaDto);
    const dialogRef = this.dialog.open(EmergPersonaReferenciaComponent, configuracion);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      window.scrollTo({top: 0, behavior: 'smooth'});
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
