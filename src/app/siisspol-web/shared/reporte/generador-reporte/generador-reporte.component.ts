import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {ReporteSistema} from "../classes/reporte-sistema";
import {ReporteService} from "../../../modules/pages/comun/services/reporte.service";
import {ReporteConfiguracionUnion} from "../classes/reporte-configuracion-union";
import {ReporteObjComponent} from "../classes/reporte-obj-component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConfiguracionReporteImpl} from "../classes/reporte-configuracion";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {StorageAppService} from "../../../modules/system/services/system/storage-app.service";

@Component({
  selector: 'app-generador-reporte',
  templateUrl: './generador-reporte.component.html',
  styleUrls: ['./generador-reporte.component.css']
})
export class GeneradorReporteComponent implements OnInit, OnDestroy {
  // @ts-ignore
  reporteSelccionado: ReporteConfiguracionUnion;
  reporteConfiguracion: ReporteObjComponent = new ReporteObjComponent();
  lstReportes: ReporteConfiguracionUnion[] = new Array();
  reporte: ReporteSistema = new ReporteSistema('', '');
  base64ImageData: string = "";
  contadorSiguiente: number = -1;
  mostrarPrimerFiLtro: boolean = true;
  // @ts-ignore
  filtroActivo: ConfiguracionReporteImpl;
  esUltimoFiltro: boolean = false;

  filtrosGenerado: any = {}

  filtroValidado: boolean = true;

  /*

    private trans: TranslateService,
  */

  constructor(private generador: ReporteService, @Optional() @Inject(MAT_DIALOG_DATA)
              public reporteObjComponent: ReporteObjComponent,
              private toastr: ToastrService,
              private svrLs: StorageAppService,
              private trans: TranslateService,
  ) {
    this.reporteConfiguracion = this.reporteObjComponent;
  }


  public async setearParametros(objetoFiltro: any) {
    this.filtrosGenerado = objetoFiltro;
  }

  public siguienteProceso() {
    if (this.contadorSiguiente == -1) {
      if (!this.reporteSelccionado) {
        this.toastr.warning(this.trans.instant('siisspolweb.label.comun.reporte.no.seleccionado'), this.trans.instant('siisspolweb.comun.advetencia'));
        return;
      }
    }
    this.contadorSiguiente = this.contadorSiguiente + 1;
    if (this.contadorSiguiente < this.reporteSelccionado.configuracionReporte.length) {
      this.filtroActivo = this.reporteSelccionado.configuracionReporte[this.contadorSiguiente];
      this.mostrarPrimerFiLtro = false;
      this.filtroValidado = false;
    }

    if (this.contadorSiguiente >= (this.reporteSelccionado.configuracionReporte.length - 1)) {
      this.esUltimoFiltro = true;
    }

  }

  public objetoSelccionado(dato: ReporteConfiguracionUnion) {
    //dato.seleccionado = true;
    for (let i = 0; i < this.lstReportes.length; i++) {
      if (this.lstReportes[i] === dato) {
        this.lstReportes[i].seleccionado = true;
      } else
        this.lstReportes[i].seleccionado = false;
    }
    this.reporteSelccionado = dato;
  }


  public generarListaReporte() {
    if (this.reporteConfiguracion) {
      this.lstReportes = this.reporteConfiguracion.reporteDenuncia;
    }
  }

  public revertirSeleccion() {
    for (let i = 0; i < this.lstReportes.length; i++) {
      this.lstReportes[i].seleccionado = false;
    }
  }

  ngOnInit(): void {
    this.generarListaReporte();
  }

  ngOnDestroy(): void {
    this.revertirSeleccion();
  }

}
