import {ReporteSistema} from "./reporte-sistema";
import {ConfiguracionReporteImpl} from "./reporte-configuracion";

export class ReporteConfiguracionUnion {
  reporteSistema: ReporteSistema;
  configuracionReporte: ConfiguracionReporteImpl[];
  seleccionado: boolean = false;

  constructor(reporteSistema: ReporteSistema, configuracionReporte: ConfiguracionReporteImpl[]) {
    this.reporteSistema = reporteSistema;
    this.configuracionReporte = configuracionReporte;
  }
}
