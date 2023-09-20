import {ReporteSistema} from "./reporte-sistema";
import {ReporteConfiguracionUnion} from "./reporte-configuracion-union";
import {ConfiguracionReporteImpl} from "./reporte-configuracion";

export class ReporteObjComponent {

  reporteDenuncia: ReporteConfiguracionUnion[] = new Array();

  public cargarConfiguracion(reporte: ReporteSistema, ...configs: ConfiguracionReporteImpl[]) {
    try {
      this.reporteDenuncia.push(new ReporteConfiguracionUnion(reporte, configs));
    } catch (error) {
      console.error("Error al cargar la configuración:", error);
    }
  }

  getReporteDenuncia() {
    return {...this.reporteDenuncia};
  }
}

export interface IReporteConfiguracion {

  configuracionReporte(): void;


}
