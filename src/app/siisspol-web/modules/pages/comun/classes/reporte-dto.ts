export class ReporteDto {
  idReporte: string;
  identificador: string;
  nombre: string;
  descripcion: string;
  nombrePlantillaExcel: string;
  firmaImprime: string;
  categoriaDescripcion: string;
  codigoIso: string;
  numeroRevisionIso: string;
  fechaIso: string;
  idArea: string;
  departamentoImprime: string;
  areaImprime: string;
  idDepartamento: string;
  nombreImprime: string;
  fechaImprime: string;
  qrImprime: string;


  constructor(idReporte: string, identificador: string, nombre: string, descripcion: string, nombrePlantillaExcel: string, firmaImprime: string, categoriaDescripcion: string, codigoIso: string, numeroRevisionIso: string, fechaIso: string, idArea: string, departamentoImprime: string, areaImprime: string, idDepartamento: string, nombreImprime: string, fechaImprime: string, qrImprime: string) {
    this.idReporte = idReporte;
    this.identificador = identificador;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.nombrePlantillaExcel = nombrePlantillaExcel;
    this.firmaImprime = firmaImprime;
    this.categoriaDescripcion = categoriaDescripcion;
    this.codigoIso = codigoIso;
    this.numeroRevisionIso = numeroRevisionIso;
    this.fechaIso = fechaIso;
    this.idArea = idArea;
    this.departamentoImprime = departamentoImprime;
    this.areaImprime = areaImprime;
    this.idDepartamento = idDepartamento;
    this.nombreImprime = nombreImprime;
    this.fechaImprime = fechaImprime;
    this.qrImprime = qrImprime;
  }
}
