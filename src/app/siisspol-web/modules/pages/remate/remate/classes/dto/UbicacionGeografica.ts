export class UbicacionGeografica {
    idUbicacion: number;
    descripcion: string | undefined;
    idUbicacionPadre: number | undefined;
    codUbicacion: string | undefined;
    children?: UbicacionGeografica[];

    constructor(idUbicacion: number, descripcion: string | undefined,
        idUbicacionPadre: number | undefined,codUbicacion: string | undefined) {

        this.idUbicacion = idUbicacion;
        this.descripcion = descripcion;
        this.idUbicacionPadre = idUbicacionPadre;
        this.codUbicacion = codUbicacion; 
    }

}

