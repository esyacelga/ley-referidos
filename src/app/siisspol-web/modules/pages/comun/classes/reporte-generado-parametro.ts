export class ReporteGeneradoParametro {
  parametros: string;
  tituloReporte: string;
  grabarReporte: boolean;
  rutaReporte: string;
  secuencialReporte: string;
  esExcel: boolean;
  parametroSesion: any;

  constructor(parametros: string, tituloReporte: string, grabarReporte: boolean, rutaReporte: string, secuencialReporte: string, esExcel: boolean, parametroSesion?: any) {
    this.parametros = parametros;
    this.tituloReporte = tituloReporte;
    this.grabarReporte = grabarReporte;
    this.rutaReporte = rutaReporte;
    this.secuencialReporte = secuencialReporte;
    this.esExcel = esExcel;
    this.parametroSesion = parametroSesion;
  }


}
