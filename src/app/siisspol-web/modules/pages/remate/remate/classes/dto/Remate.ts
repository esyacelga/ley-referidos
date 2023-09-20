export class Remate {
    idRemate: number | undefined;
    numeroJucio: string | undefined;
    tipoBien: string | undefined;
    codValorBien: string | undefined;
    descripcionBien: string | undefined;
    valorBien: number | undefined;
    valorMinPostulado: number | undefined;
    estado: boolean | undefined;
    codValorEstado: string | undefined;
    idUbicacion : number | undefined;
    desUbicacion: string | undefined;
    etapaCoactiva: string | undefined;
    codEtapaCoactiva: string | undefined;
    direccion: string | undefined;
    

    constructor(idRemate: number | undefined,numeroJucio: string | undefined, tipoBien: string | undefined,
        descripcionBien: string | undefined, valorBien: number | undefined, valorMinPostulado: number | undefined,
        estado: boolean | undefined, idUbicacion : number | undefined, etapaCoactiva: string | undefined, direccion: string | undefined) {
        this.idRemate = idRemate;
        this.numeroJucio = numeroJucio;
        this.tipoBien = tipoBien;
        this.descripcionBien = descripcionBien;
        this.valorBien = valorBien;
        this.valorMinPostulado = valorMinPostulado;
        this.estado = estado;
        this.idUbicacion = idUbicacion;
        this.etapaCoactiva = etapaCoactiva;
        this.direccion = direccion;
    }

}

