export class ConfiguracionEstado {
  codigo: string | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;


  constructor(codigo?: string, nombre?: string, descripcion?: string) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}
