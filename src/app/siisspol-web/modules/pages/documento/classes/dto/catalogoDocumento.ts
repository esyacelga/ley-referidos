export class CatalogoDocumento {
  nombre: string | undefined;
  descripcion: string | undefined;
  codigo: string | undefined;
  idCatalogo: string | undefined;
  estado: string | undefined;
  npEstado: boolean | undefined = true;


  constructor(nombre?: string, descripcion?: string, codigo?: string, idCatalogo?: string, estado?: string, npEstado?: boolean) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.idCatalogo = idCatalogo;
    this.estado = estado;
    this.npEstado = npEstado;
  }

  public convertirEstado() {
    if (this.npEstado) {
      this.estado = "1";
    } else this.estado = "0";
  }

  public toBoolean() {
    if (this.estado === "1") {
      this.npEstado = true;
    } else this.npEstado = false;
  }

}
