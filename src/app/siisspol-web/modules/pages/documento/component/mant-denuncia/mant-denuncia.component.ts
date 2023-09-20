import {Component, OnInit} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {DenunciaService} from "../../services/denuncia.service";
import {DenunciaPaginacionDto} from "../../classes/dto/DenunciaPaginacionDto";
import {Subscription} from "rxjs";
import {BarraHerramientaBoton} from "../../../../../shared/barra-herramientas/barra-herramientas.component";
import {botonesBarraHerramientas} from "../../../../../shared/redux/types";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../shared/redux/store/reducers/app.reducer";
import {DenunciaDescripcionDto} from "../../classes/dto/DenunciaDescripcionDto";
import {filtrarLista, ordenDesendenteInt} from "../../../../system/funcions/lista.utils";
import {RespuestaPreguntaDto} from "../../classes/dto/RespuestaPreguntaDto";
import {ActivatedRoute} from "@angular/router";
import {DocumentoEstadoDescripcion} from "../../classes/persistencia/documento-estado-descripcion";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {DenunciaDto} from "../../classes/dto/DenunciaDto";
import {ReporteDenuncia} from "../../../../../shared/reporte/classes/reporte-denuncia";

@Component({
  selector: 'app-mant-denuncia',
  templateUrl: './mant-denuncia.component.html',
  styleUrls: ['./mant-denuncia.component.css']
})
export class MantDenunciaComponent implements OnInit {
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined, new ReporteDenuncia());
  // @ts-ignore
  lstDenuncia: DenunciaPaginacionDto[];
  objDenuncia: DenunciaPaginacionDto | undefined;

  lstRespuetas: RespuestaPreguntaDto[] = new Array();

  objEstadoDescripcion: DocumentoEstadoDescripcion = new DocumentoEstadoDescripcion("", "", "", "", "", ",", ",", ",", "")
  cadenaDescripcion: string = "";


  constructor(public svrDenuncia: DenunciaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    //this.intSvr.setWithOutSeccion();
    this.intSvr.setActiveRoute(route)
    this.objBtn.verNuevo = false;
  }


  public cargarDescripcion(dato: string) {
    this.cadenaDescripcion = dato;
  }

  public setearEstadoDescripcion(objAdjunto: DocumentoEstadoDescripcion) {
    this.objEstadoDescripcion = objAdjunto;

  }


  public async registrarNuevoEstado() {
    this.objEstadoDescripcion.descripcionPersistencia = this.cadenaDescripcion;
    this.objEstadoDescripcion = {...this.objEstadoDescripcion, idDenuncia: this.objDenuncia?.idDenuncia}
    if (!this.objEstadoDescripcion.estadoPersinstencia || this.objEstadoDescripcion.estadoPersinstencia == "" || this.objEstadoDescripcion.estadoPersinstencia == ",") {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.label.documento.guardado.seleccion'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return;
    } else {
      const data: DenunciaDto = await this.svrDenuncia.registrarDenunciaCambioEstado(this.objEstadoDescripcion);
      if (data) {
        this.objBtn = new BarraHerramientaBoton();
        this.cargarGrid();
        this.objDenuncia = undefined;
      }

    }
  }

  public async editarRegistro(objBase: DenunciaPaginacionDto) {
    this.objBtn = new BarraHerramientaBoton(true, false, new ReporteDenuncia());
    this.objDenuncia = objBase
    // @ts-ignore
    const idDenuncia: string = objBase.idDenuncia;

    //this.obtenerAdjuntos(idDenuncia)
    this.lstRespuetas = await this.svrDenuncia.obtenerRespuestasPreguntas(idDenuncia) as RespuestaPreguntaDto[];
  }


  public obtenerEstadoRegistrado(lista: DenunciaDescripcionDto[]): DenunciaDescripcionDto {
    if (!lista || lista.length == 0)
      return new DenunciaDescripcionDto();
    const lst: DenunciaDescripcionDto[] = filtrarLista(lista, {estado: 'REG'});
    if (!lst || lst.length == 0)
      return new DenunciaDescripcionDto();
    return lst[0];
  }




  ngOnInit(): void {
    this.cargarGrid();

    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data: botonesBarraHerramientas) => {
      if (data === 'GUARDAR') {
        this.registrarNuevoEstado();
      }
      if (data === 'CANCELAR') {
        this.objDenuncia = undefined;
        this.objBtn = new BarraHerramientaBoton(undefined, undefined, new ReporteDenuncia());
        this.objBtn.verNuevo = false;
      }
      if (data === 'NUEVO') {
        /*this.crearNuevoRegistro();*/
      }
      if (data === 'PROCESAR') {
        /*this.procesarPagoCierreCXP();*/
      }
    });
  }


  public async cargarGrid() {
    const lstData: DenunciaPaginacionDto[] = await this.svrDenuncia.obtenerDenuncias() as DenunciaPaginacionDto[];
    this.lstDenuncia = ordenDesendenteInt(lstData, 'idDenuncia');
  }

  copiarAlPortapapeles(texto: string) {
    const elementoTemporal = document.createElement('textarea');
    elementoTemporal.value = texto;
    document.body.appendChild(elementoTemporal);
    elementoTemporal.select();
    document.execCommand('copy');
    document.body.removeChild(elementoTemporal);
  }
}
