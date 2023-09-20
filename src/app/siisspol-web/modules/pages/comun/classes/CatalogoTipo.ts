export class CatalogoTipo {
  idCatalogoGrupo: string | undefined;
  grupoCodigo: string | undefined;
  idCatalogoTipo: string | undefined;
  tipoCodigo: string | undefined;
  nombre: string | undefined;
  valor: string | undefined;
  estado: string | undefined;

  constructor(idCatalogoGrupo?: string | undefined, grupoCodigo?: string | undefined, idCatalogoTipo?: string | undefined, tipoCodigo?: string | undefined, nombre?: string | undefined, valor?: string | undefined, estado?: string | undefined) {
    this.idCatalogoGrupo = idCatalogoGrupo;
    this.grupoCodigo = grupoCodigo;
    this.idCatalogoTipo = idCatalogoTipo;
    this.tipoCodigo = tipoCodigo;
    this.nombre = nombre;
    this.valor = valor;
    this.estado = estado;
  }
}
