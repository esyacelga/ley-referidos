export class DenunciaAdjuntoDto {
  idDenunciaAdjunto: string | undefined;
  idDenuncia: string | undefined;
  nombreArchivo: string | undefined;
  tipo: string | undefined;
  imagen: string | undefined;
  estado: string | undefined;
  peso: string | undefined;

  constructor(idDenunciaAdjunto?: string | undefined, idDenuncia?: string | undefined, nombreArchivo?: string | undefined, tipo?: string | undefined, imagen?: string | undefined, estado?: string | undefined, peso?: string | undefined) {
    this.idDenunciaAdjunto = idDenunciaAdjunto;
    this.idDenuncia = idDenuncia;
    this.nombreArchivo = nombreArchivo;
    this.tipo = tipo;
    this.imagen = imagen;
    this.estado = estado;
    this.peso = peso;
  }
}
