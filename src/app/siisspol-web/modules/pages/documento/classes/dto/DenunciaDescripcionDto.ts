export class DenunciaDescripcionDto {
  idDenunciaDescripcion: string | undefined;
  idDenuncia: string | undefined;
  estado: string | undefined;
  descripcion: string | undefined;


  constructor(idDenunciaDescripcion?: string | undefined, idDenuncia?: string | undefined, estado?: string | undefined, descripcion?: string | undefined) {
    this.idDenunciaDescripcion = idDenunciaDescripcion;
    this.idDenuncia = idDenuncia;
    this.estado = estado;
    this.descripcion = descripcion;
  }
}
