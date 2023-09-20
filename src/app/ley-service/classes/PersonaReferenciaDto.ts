export class PersonaReferenciaDto {
  idPesonaReferencia: number;
  idPesonaReferenciaPadre: number;
  cedula: string;
  nombre: string;
  telefono: string;
  direccion: string;

  constructor(idPesonaReferencia: number, idPesonaReferenciaPadre: number, cedula: string, nombre: string, telefono: string, direccion: string) {
    this.idPesonaReferencia = idPesonaReferencia;
    this.idPesonaReferenciaPadre = idPesonaReferenciaPadre;
    this.cedula = cedula;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}
