export interface PermisoObjetoInterface {
  estado: boolean,
  idObjeto: string,
  idOpcionPermisoObjeto: string,
  idPermiso: number,
  idx: number,
  opcion: string,
  rol: string,
  ocultar: boolean,
}


export interface SelectorOpcion {
  idOpcion: number,
  descripcion: string
}


export interface OpcionRolPermiso {
  idPermiso: number,
  objeto: string,
  rol: string,
  idOpcion: number,
  nombreOpcion: string
}
