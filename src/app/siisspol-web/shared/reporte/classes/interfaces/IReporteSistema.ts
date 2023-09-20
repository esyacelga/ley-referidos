import {ConfiguracionReporteImpl} from "../reporte-configuracion";

export interface IReporteSistema {
  cargarConfiguracion(...objetos: ConfiguracionReporteImpl[]): ConfiguracionReporteImpl[];
}
