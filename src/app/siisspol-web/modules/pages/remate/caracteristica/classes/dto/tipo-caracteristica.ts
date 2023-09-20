export class TipoCaracteristica {
    idRemateTipoCaracteristica: number | undefined;
    tipoBien: string | undefined;
    codValorBien: string | undefined;
    tipoCaracteristica: string | undefined;
    codValorCaracteristica: string | undefined;
    estado: boolean | undefined;
    elimina: boolean | undefined;
    descripcionCaracteristica: string | undefined;

    constructor(idRemateTipoCaracteristica: number | undefined, codValorBien: string | undefined, codValorCaracteristica: string | undefined, 
        estado: boolean | undefined, elimina: boolean | undefined) {
        this.idRemateTipoCaracteristica = idRemateTipoCaracteristica;
        this.codValorBien = codValorBien;
        this.codValorCaracteristica = codValorCaracteristica;
        this.estado = estado;
        this.elimina = elimina;

    }
}
