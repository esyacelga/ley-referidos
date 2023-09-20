import {ReporteSistema} from "./reporte-sistema";
import {ConfiguracionReporteImpl} from "./reporte-configuracion";
import {IReporteConfiguracion, ReporteObjComponent} from "./reporte-obj-component";

export class ReporteDenuncia extends ReporteObjComponent implements IReporteConfiguracion {

  constructor() {
    super();
    this.configuracionReporte();
  }

  configuracionReporte() {
    let reporte: ReporteSistema = new ReporteSistema('Acuerdo Pago prestaciones medicas', 'reporte-liquidacion-acuerdo-pago')
    let filtro01 = new ConfiguracionReporteImpl('fechas', 'FECHA-RANGO');
    filtro01 = new ConfiguracionReporteImpl('numeroReferencia', 'TEXTO-BUSQUEDA', 'Ingrese numero de referencia');
    reporte = new ReporteSistema('Reporte denuncias individual', 'reporte-denuncia-individual')
    this.cargarConfiguracion(reporte, filtro01);
    filtro01 = new ConfiguracionReporteImpl('Fecha', 'FECHA-RANGO');
    reporte = new ReporteSistema('Reporte denuncias consolidado', 'reporte-denuncia-consolidado', 'Seleccione rango de fechas')
    this.cargarConfiguracion(reporte, filtro01);
  }

}
