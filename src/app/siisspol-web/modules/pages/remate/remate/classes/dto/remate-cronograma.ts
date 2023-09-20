export class RemateCronograma {
    idRemate: number | undefined;
    numeroJucio: string | undefined;
    idEtapaCoactiva: string | undefined;
    desEtapaCoactiva: string | undefined;
    fechaInicial: string | undefined;
    fechaFinal: string | undefined;
    idEstadoCronograma: boolean | undefined;

    constructor(idRemate: number | undefined,numeroJucio: string | undefined, idEtapaCoactiva: string | undefined, fechaInicial: string | undefined,
        fechaFinal: string | undefined, idEstadoCronograma: boolean | undefined) {
        this.idRemate = idRemate;
        this.numeroJucio = numeroJucio;
        this.idEtapaCoactiva = idEtapaCoactiva;    
        this.fechaInicial = fechaInicial;
        this.fechaFinal = fechaFinal;
        this.idEstadoCronograma = idEstadoCronograma;
    }
}
