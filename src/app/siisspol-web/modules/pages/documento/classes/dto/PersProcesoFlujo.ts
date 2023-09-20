export interface PersProcesoFlujoI {
  idProcesoFlujo: string;
  nombre: string;
  descripcion: string;
  estado: string;

}

export class PersProcesoFlujo implements PersProcesoFlujoI {
  idProcesoFlujo: string;
  nombre: string;
  descripcion: string;
  estado: string;
  codigo: string;

  constructor(idProcesoFlujo: string, nombre: string, descripcion: string, estado: string, codigo: string) {
    this.idProcesoFlujo = idProcesoFlujo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
    this.codigo = codigo;
  }
}
