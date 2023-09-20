export class OpcionPermisoObjeto {
  idOpcionPermisoObjeto: string;
  idPermiso: number;
  estado: number;
  ocultar: number;
  idObjeto: string;
  eliminado: number | undefined;

  constructor(idOpcionPermisoObjeto: string, idPermiso: number, estado: number, ocultar: number, idObjeto: string) {
    this.idOpcionPermisoObjeto = idOpcionPermisoObjeto;
    this.idPermiso = idPermiso;
    this.estado = estado;
    this.ocultar = ocultar;
    this.idObjeto = idObjeto;
  }
}
