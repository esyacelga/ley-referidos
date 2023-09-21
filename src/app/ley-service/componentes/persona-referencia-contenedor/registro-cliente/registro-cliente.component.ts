import {Component, OnInit} from '@angular/core';
import {BarraHerramientaBoton} from "../../../../siisspol-web/shared/barra-herramientas/barra-herramientas.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {
  ExecuteCallProcedureService
} from "../../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {Subscription} from "rxjs";
import {botonesBarraHerramientas} from "../../../../siisspol-web/shared/redux/types";
import {PersonaReferenciaService} from "../../../services/persona-referencia.service";
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";
import {PersonaService} from "../../../../siisspol-web/modules/pages/persona/services/persona.service";
import {PersonaDto} from "../../../../siisspol-web/modules/pages/persona/PersonaDto";

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined);
  lstPersonas: PersonaReferenciaDto [] = new Array();
  persona: PersonaReferenciaDto = new PersonaReferenciaDto(undefined, 0, '', '', '', '');
  CALENDER_CONFIG_EN: any;

  constructor(public svrReferencia: PersonaReferenciaService,
              private svrPersona: PersonaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    //this.intSvr.setWithOutSeccion();
    this.intSvr.setActiveRoute(route)
  }

  public async registrarPesona(objeto: PersonaReferenciaDto) {
    const data: PersonaReferenciaDto = await this.svrReferencia.registrarPersona(objeto);
    if (data) {
      this.persona = new PersonaReferenciaDto(undefined, 0, '', '', '', '');
      this.cargarGrid();
      this.objBtn = new BarraHerramientaBoton(undefined, undefined);
    }
  }


  public async cargarPersona(cedula: string) {
    const objPersona: PersonaDto = (await this.svrPersona.buscarPersona(cedula) as PersonaDto);
    this.persona.nombre = objPersona.nombre!;
    this.persona.fechaNacimiento = this.milisegundosAFechaString(objPersona.fechaNacimiento);

  }

  public milisegundosAFechaString(milisegundos: number) {
    const fecha = new Date(milisegundos);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses se indexan desde 0 (enero) hasta 11 (diciembre)
    const año = fecha.getFullYear();

    // Formatear el día y el mes para que tengan siempre dos dígitos
    const diaFormateado = (dia < 10) ? `0${dia}` : dia;
    const mesFormateado = (mes < 10) ? `0${mes}` : mes;

    // Crear la cadena de fecha en formato dd/mm/yyyy
    const fechaString = `${diaFormateado}/${mesFormateado}/${año}`;

    return fechaString;
  }

  private async cargarGrid() {
    this.lstPersonas = await this.svrReferencia.obtenerPersonas();
  }

  ngOnInit(): void {
    this.cargarGrid();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data: botonesBarraHerramientas) => {
      if (data === 'GUARDAR') {
        this.registrarPesona(this.persona);
      }
      if (data === 'CANCELAR') {
        this.persona.idPersonaReferencia = undefined;
        this.objBtn = new BarraHerramientaBoton(undefined, undefined);
        this.cargarGrid();
      }
      if (data === 'NUEVO') {
        this.persona.idPersonaReferencia = 0
      }
      if (data === 'PROCESAR') {
        /*this.procesarPagoCierreCXP();*/
      }
    });
  }

  editarRegistro(objeto: PersonaReferenciaDto) {
    this.persona = objeto;
    this.objBtn = new BarraHerramientaBoton(true, undefined);
  }
}
