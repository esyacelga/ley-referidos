export class PerstFlujoVersion {
  idProcesoFlujo: string;
  idProcesoFlujoVersion: string;
  version: string;
  descripcion: string;
  estado: string;
  flujo: string | undefined;

  constructor(idProcesoFlujo: string, idProcesoFlujoVersion: string, version: string, descripcion: string, estado: string, flujo?: string | undefined) {
    this.idProcesoFlujo = idProcesoFlujo;
    this.idProcesoFlujoVersion = idProcesoFlujoVersion;
    this.version = version;
    this.descripcion = descripcion;
    this.estado = estado;
    this.flujo = flujo;
  }
}
