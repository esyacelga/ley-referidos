import {ConfiguracionReporteImpl} from "./reporte-configuracion";
import {IReporteSistema} from "./interfaces/IReporteSistema";

export class ReporteSistema implements IReporteSistema {

  identificadorReporte: string;
  nombreReporte: string;
  parametroGenerado: string = '';
  parametroAdicional: any;

  constructor(nombreReporte: string, identificadorReporte: string, parametroAdicional?: any) {
    this.identificadorReporte = identificadorReporte;
    this.nombreReporte = nombreReporte;
    this.parametroAdicional = parametroAdicional;
  }


  public cargarConfiguracion(...objetos: ConfiguracionReporteImpl[]): ConfiguracionReporteImpl[] {
    try {
      return objetos;
    } catch (error) {
      console.error("Error al cargar la configuración:", error);
      return [];
    }
  }
}
