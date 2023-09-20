export class PermisoObjeto {
  public idObjeto: string | undefined;
  public idGrupo: number | undefined;
  public idRuta: string | undefined;
  public estado: boolean | undefined;
  public ocultar: boolean | undefined;


  constructor(idObjeto?: string, idGrupo?: number, idRuta?: string, estado?: boolean, ocultar?: boolean) {
    this.idObjeto = idObjeto;
    this.idGrupo = idGrupo;
    this.idRuta = idRuta;
    this.estado = estado;
    this.ocultar = ocultar;
  }
}


