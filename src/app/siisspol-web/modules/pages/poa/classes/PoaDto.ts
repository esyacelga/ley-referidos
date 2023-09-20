export class PoaDto {
  idPoa: string;
  detalle: string;
  fechaPoa: string;
  codigoPresupuesto: string;
  presupuestoInicial: string;
  presupuestoDisponible: string;
  presupuestoReformado: string;
  estado: string;
  anio: number = 0;

  constructor(idPoa: string, detalle: string, fechaPoa: string, codigoPresupuesto: string, presupuestoInicial: string, presupuestoDisponible: string, presupuestoReformado: string, estado: string) {
    this.idPoa = idPoa;
    this.detalle = detalle;
    this.fechaPoa = fechaPoa;
    this.codigoPresupuesto = codigoPresupuesto;
    this.presupuestoInicial = presupuestoInicial;
    this.presupuestoDisponible = presupuestoDisponible;
    this.presupuestoReformado = presupuestoReformado;
    this.estado = estado;
    //this.obtenerAnioActual();
  }


}
