export class PersonaDto {
  idPersona: number | undefined;
  apellidoPaterno: string | undefined;
  apellidoMaterno: string | undefined;
  nombre: string | undefined;
  identificacion: string | undefined;
  fechaNacimiento: number=0;

  constructor(idPersona: number | undefined, apellidoPaterno: string | undefined, apellidoMaterno: string | undefined, nombre: string | undefined, identificacion: string | undefined) {
    this.idPersona = idPersona;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.nombre = nombre;
    this.identificacion = identificacion;
  }
}
