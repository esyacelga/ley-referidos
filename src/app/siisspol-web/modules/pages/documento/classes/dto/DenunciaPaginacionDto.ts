export class DenunciaPaginacionDto {
  idDenuncia: string | undefined;
  numeroReferencia: string | undefined;
  tipoDenuncia: string | undefined;
  tipoDelito: string | undefined;
  identificacion: string | undefined;
  nombrePersona: string | undefined;
  correo: string | undefined;
  estado: string | undefined;
  origen: string | undefined;
  telefono: string | undefined;
  tipoDenunciante: string | undefined;


  constructor(idDenuncia?: string | undefined, numeroReferencia?: string | undefined, tipoDenuncia?: string | undefined, tipoDelito?: string | undefined, identificacion?: string | undefined, nombrePersona?: string | undefined, correo?: string | undefined, estado?: string | undefined, origen?: string | undefined, telefono?: string | undefined, tipoDenunciante?: string | undefined) {
    this.idDenuncia = idDenuncia;
    this.numeroReferencia = numeroReferencia;
    this.tipoDenuncia = tipoDenuncia;
    this.tipoDelito = tipoDelito;
    this.identificacion = identificacion;
    this.nombrePersona = nombrePersona;
    this.correo = correo;
    this.estado = estado;
    this.origen = origen;
    this.telefono = telefono;
    this.tipoDenunciante = tipoDenunciante;
  }
}
