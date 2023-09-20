export interface ConfirmacionInterface {
  titulo: string | undefined;
  mensaje: string | undefined;
  opcion: string | undefined;

}


export class Confirmacion implements ConfirmacionInterface {
  titulo: string | undefined;
  mensaje: string | undefined;
  opcion: string | undefined;

  constructor(titulo?: string | undefined, mensaje?: string | undefined, opcion?: string | undefined) {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.opcion = opcion;
  }
}
