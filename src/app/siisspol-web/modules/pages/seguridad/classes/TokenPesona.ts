export class TokenPesona {
  public idToken: string | undefined;
  public apellidoPaterno: string | undefined;
  public identificacion: string | undefined;
  public apellidoMaterno: string | undefined;
  public nombrePersona: string | undefined;
  public tipoToken: string | undefined;
  public eliminado: string | undefined;


  constructor(idToken: string | undefined, apellidoPaterno: string | undefined, identificacion: string | undefined, apellidoMaterno: string | undefined, nombrePersona: string | undefined, tipoToken: string | undefined, eliminado: string | undefined) {
    this.idToken = idToken;
    this.apellidoPaterno = apellidoPaterno;
    this.identificacion = identificacion;
    this.apellidoMaterno = apellidoMaterno;
    this.nombrePersona = nombrePersona;
    this.tipoToken = tipoToken;
    this.eliminado = eliminado;
  }
}
