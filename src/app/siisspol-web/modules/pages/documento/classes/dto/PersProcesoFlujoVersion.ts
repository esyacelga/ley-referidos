export interface PersProcesoFlujoVersionI {
  idProcesoFlujoVersion: string;
  idProcesoFlujo: string;
  version: string;
  descripcion: string;
  estado: string;


}

export class PersProcesoFlujoVersion implements PersProcesoFlujoVersionI {
  idProcesoFlujoVersion: string;
  idProcesoFlujo: string;
  version: string;
  descripcion: string;
  estado: string;

  constructor(idProcesoFlujoVersion: string, idProcesoFlujo: string, version: string, descripcion: string, estado: string) {
    this.idProcesoFlujoVersion = idProcesoFlujoVersion;
    this.idProcesoFlujo = idProcesoFlujo;
    this.version = version;
    this.descripcion = descripcion;
    this.estado = estado;
  }




}
