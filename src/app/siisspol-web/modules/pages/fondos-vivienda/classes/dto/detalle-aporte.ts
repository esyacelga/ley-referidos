export class DetalleAporte{
  cedula: string | undefined;
  fechacapitalizacion: string | undefined;
  tipoafiliado: string | undefined;
  periodo: string | undefined;
  fechadeposito: string | undefined;
  porcentaje: string | undefined;
  aporte: string | undefined;
  interes: string | undefined;
  tiposubtipo: string | undefined;
  fechaproceso: string | undefined;
  anioalta: string | undefined;
  fechacarga: string | undefined;
  estado: string | undefined;
  grupo: string | undefined;
  imposiciones: string | undefined;
  constructor(cedula?: string,
  fechacapitalizacion?: string,
  tipoafiliado?: string,
  periodo?: string,
  fechadeposito?: string,
  porcentaje?: string,
  aporte?: string,
  interes?: string,
  tiposubtipo?: string,
  fechaproceso?: string,
  anioalta?: string,
  fechacarga?: string,
  estado?: string,
  grupo?: string,
  imposiciones?: string) {
    this.cedula=cedula;
    this.fechacapitalizacion=fechacapitalizacion;
    this.tipoafiliado=tipoafiliado;
    this.periodo=periodo;
    this.fechadeposito=fechadeposito;
    this.porcentaje=porcentaje;
    this.aporte=aporte;
    this.interes=interes;
    this.tiposubtipo=tiposubtipo;
    this.fechaproceso=fechaproceso;
    this.anioalta=anioalta;
    this.fechacarga=fechacarga;
    this.estado=estado;
    this.grupo=grupo;
    this.imposiciones=imposiciones;
  }

}
