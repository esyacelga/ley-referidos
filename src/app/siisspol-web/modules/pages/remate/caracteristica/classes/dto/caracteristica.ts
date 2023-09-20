import { TipoCaracteristica } from "./tipo-caracteristica";

export class Caracteristica {

    idRemateTipoCaracteristica: number | undefined;
    idRemate: number | undefined;
    numeroJucio: string | undefined;
    remateBien: string | undefined;
    remateDescripcion: string | undefined;
    tipoCarBien: string | undefined;
    tipoCaracteristica: string | undefined;
    descripcion: string | undefined;
    estado: boolean | undefined;
    elimina: boolean | undefined;
    lstTipoCaracteristica: TipoCaracteristica[] = [];

    constructor(idRemate: number | undefined, idRemateTipoCaracteristica: number | undefined, descripcion: string | undefined, estado: boolean | undefined, 
        elimina: boolean | undefined, lstTipoCaracteristica: TipoCaracteristica[] = []) {
        this.idRemate = idRemate;
        this.idRemateTipoCaracteristica = idRemateTipoCaracteristica;
        this.descripcion = descripcion;
        this.estado = estado;
        this.elimina = elimina;
        this.lstTipoCaracteristica = lstTipoCaracteristica;

    }
}
