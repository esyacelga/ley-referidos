export class AdjuntoPersistencia {
  idDenuncia: string | undefined;
  estado: string | undefined;
  nombreArchivo: string | undefined;
  tipo: string | undefined;
  peso: string | undefined;
  imagen: string | undefined;
  idDenunciaAdjunto: string | undefined;

  constructor(idDenuncia?: string | undefined, estado?: string | undefined, nombreArchivo?: string | undefined, tipo?: string | undefined, peso?: string | undefined, imagen?: string | undefined, idDenunciaAdjunto?: string | undefined) {
    this.idDenuncia = idDenuncia;
    this.estado = estado;
    this.nombreArchivo = nombreArchivo;
    this.tipo = tipo;
    this.peso = peso;
    this.imagen = imagen;
    this.idDenunciaAdjunto = idDenunciaAdjunto;
  }
}
