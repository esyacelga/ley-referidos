export class PaginadorExpedienteDetalle {
  idExpedienteDetalle: string;
  codigoItem: string;
  codigoProducto: string;
  descripcion: string;
  cantidad: string;
  valorUnitario: string;
  porcentajeValorUnitario: string;
  iva: string;
  esObjetadoMedico: string;
  edObjetadoLiquidador: string;

  constructor(idExpedienteDetalle: string, codigoItem: string, codigoProducto: string, descripcion: string, cantidad: string, valorUnitario: string, porcentajeValorUnitario: string, iva: string, esObjetadoMedico: string, edObjetadoLiquidador: string) {
    this.idExpedienteDetalle = idExpedienteDetalle;
    this.codigoItem = codigoItem;
    this.codigoProducto = codigoProducto;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.valorUnitario = valorUnitario;
    this.porcentajeValorUnitario = porcentajeValorUnitario;
    this.iva = iva;
    this.esObjetadoMedico = esObjetadoMedico;
    this.edObjetadoLiquidador = edObjetadoLiquidador;
  }
}
