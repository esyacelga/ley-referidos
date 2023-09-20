import {IReporteConfiguracion, ReporteObjComponent} from "../../../../shared/reporte/classes/reporte-obj-component";
import {ReporteSistema} from "../../../../shared/reporte/classes/reporte-sistema";
import {ConfiguracionReporteImpl} from "../../../../shared/reporte/classes/reporte-configuracion";

export class ReporteCargaMasiva  extends ReporteObjComponent implements IReporteConfiguracion{

  constructor() {
    super();
    this.configuracionReporte();
  }

  configuracionReporte(): void {
    let reporte: ReporteSistema = new ReporteSistema('Reporte Pendiente Liquidar Fondos de Vivienda', 'reporte-pendiente-liquidar-fv')
    let filtro01 = new ConfiguracionReporteImpl('fechas', 'TODOS-FECHA-RANGO');
    this.cargarConfiguracion(reporte, filtro01);
  }


}
