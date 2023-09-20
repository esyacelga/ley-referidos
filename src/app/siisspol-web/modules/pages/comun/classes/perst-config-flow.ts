export class PerstConfigFlow{
  idProcesoConfiguracion:string;
  idProcesoConfiguracionPadre:string;
  idProcesoFlujoVersion:string;
  nombre:string;
  descripcion:string;
  codigo:string;
  estado:string;
  constructor(idProcesoConfiguracion: string, idProcesoConfiguracionPadre: string, idProcesoFlujoVersion: string, nombre: string, descripcion: string, codigo: string, estado: string) {
    this.idProcesoConfiguracion = idProcesoConfiguracion;
    this.idProcesoConfiguracionPadre = idProcesoConfiguracionPadre;
    this.idProcesoFlujoVersion = idProcesoFlujoVersion;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.estado = estado;
  }
}
