export class PersonaReferenciaDto {
  idPesonaReferencia: undefined | number;
  idPesonaReferenciaPadre: number;
  cedula: string;
  nombre: string;
  telefono: string;
  direccion: string;
  fechaNaciminento: string = '';

  constructor(idPesonaReferencia: undefined | number, idPesonaReferenciaPadre: number, cedula: string, nombre: string, telefono: string, direccion: string, fechaNacimiento?: string) {
    this.idPesonaReferencia = idPesonaReferencia;
    this.idPesonaReferenciaPadre = idPesonaReferenciaPadre;
    this.cedula = cedula;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fechaNaciminento = fechaNacimiento!;
  }
}
