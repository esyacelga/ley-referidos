export class PersonaReferenciaDto {
  idPersonaReferencia: undefined | number;
  idPersonaReferenciaPadre: number;
  cedula: string;
  nombre: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string = '';
  agregarReferido: boolean = false;

  constructor(idPersonaReferencia: undefined | number, idPersonaReferenciaPadre: number, cedula: string, nombre: string, telefono: string, direccion: string, fechaNacimiento?: string) {
    this.idPersonaReferencia = idPersonaReferencia;
    this.idPersonaReferenciaPadre = idPersonaReferenciaPadre;
    this.cedula = cedula;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fechaNacimiento = fechaNacimiento!;
  }
}
