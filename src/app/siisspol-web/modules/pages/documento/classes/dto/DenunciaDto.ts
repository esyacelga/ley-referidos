export class DenunciaDto {
  idDenuncia: string | undefined;
  identificacion: string | undefined;
  nombrePesona: string | undefined;
  numeroReferencia: string | undefined;

  constructor(idDenuncia?: string | undefined, identificacion?: string | undefined, nombrePesona?: string | undefined, numeroReferencia?: string | undefined) {
    this.idDenuncia = idDenuncia;
    this.identificacion = identificacion;
    this.nombrePesona = nombrePesona;
    this.numeroReferencia = numeroReferencia;
  }
}
