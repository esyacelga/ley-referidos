export class AuditoriaConfig {
  tabla: string | undefined;
  columnaPrimanaria: string | undefined;
  valorId: string | undefined;


  constructor(tabla?: string | undefined, columnaPrimanaria?: string | undefined, valorId?: string | undefined) {
    this.tabla = tabla;
    this.columnaPrimanaria = columnaPrimanaria;
    this.valorId = valorId;
  }
}


export class AuditoriaClass {
  creacionFecha: string | undefined;
  creacionUsuario: string | undefined;
  creacionEquipo: string | undefined;

  modificaFecha: string | undefined;
  modificaUsuario: string | undefined;
  modificaEquipo: string | undefined;


  constructor(creacionFecha?: string | undefined, creacionUsuario?: string | undefined, creacionEquipo?: string | undefined, modificaFecha?: string | undefined, modificaUsuario?: string | undefined, modificaEquipo?: string | undefined) {
    this.creacionFecha = creacionFecha;
    this.creacionUsuario = creacionUsuario;
    this.creacionEquipo = creacionEquipo;
    this.modificaFecha = modificaFecha;
    this.modificaUsuario = modificaUsuario;
    this.modificaEquipo = modificaEquipo;
  }
}
