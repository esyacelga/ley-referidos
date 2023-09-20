import {PermisoObjetoInterface} from '../interface/PermisoObjetoInterface';

export class PermisoObjetoRol implements PermisoObjetoInterface {
  estado: boolean;
  idObjeto: string;
  idOpcionPermisoObjeto: string;
  idPermiso: number;
  idx: number;
  ocultar: boolean;
  opcion: string;
  rol: string;

  constructor(estado: boolean, idObjeto: string, idOpcionPermisoObjeto: string, idPermiso: number, idx: number, ocultar: boolean, opcion: string, rol: string) {
    this.estado = estado;
    this.idObjeto = idObjeto;
    this.idOpcionPermisoObjeto = idOpcionPermisoObjeto;
    this.idPermiso = idPermiso;
    this.idx = idx;
    this.ocultar = ocultar;
    this.opcion = opcion;
    this.rol = rol;
  }
}
