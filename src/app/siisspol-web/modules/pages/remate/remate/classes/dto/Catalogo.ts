export class Catalogo {
    grupoCodigo: string | undefined;
    idCatalogoGrupo: number | undefined;
    idCatalogoTipo: number | undefined;
    tipoCodigo: string | undefined;
    valor: string | undefined;
    nombre: string | undefined;
    seleccionado: boolean | undefined;
    

    constructor(grupoCodigo: string | undefined, idCatalogoGrupo: number | undefined, idCatalogoTipo: number | undefined,
        tipoCodigo: string | undefined, valor: string | undefined, nombre: string | undefined, seleccionado: boolean | undefined) {
        this.grupoCodigo = grupoCodigo;
        this.idCatalogoGrupo = idCatalogoGrupo;
        this.idCatalogoTipo = idCatalogoTipo;
        this.tipoCodigo = tipoCodigo;
        this.valor = valor;
        this.nombre = nombre;
        this.seleccionado = seleccionado;
    }

}

