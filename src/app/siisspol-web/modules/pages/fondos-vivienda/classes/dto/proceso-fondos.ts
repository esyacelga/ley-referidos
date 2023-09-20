export class ProcesoFondos{
  idLog: string | undefined;
  mensaje: string | undefined;
  fechaActual: string | undefined;


  constructor(idLog: string | undefined, mensaje: string | undefined, fechaActual: string | undefined) {
    this.idLog = idLog;
    this.mensaje = mensaje;
    this.fechaActual = fechaActual;
  }
}
