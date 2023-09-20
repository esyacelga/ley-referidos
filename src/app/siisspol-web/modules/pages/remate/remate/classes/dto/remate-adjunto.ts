export class RemateAdjunto {
    idRemateAdjunto: number | undefined;
    idRemate: number | undefined;
    nombreArchivo: string | undefined;
    estado: string | undefined;
    imagen: string | undefined;
    tipo: string | undefined;
    peso: string | undefined;
    tipoDocumento: string | undefined;

    constructor(idRemateAdjunto: number | undefined, idRemate: number | undefined, nombreArchivo: string | undefined, estado: string | undefined,
        imagen: string | undefined, tipo: string | undefined, peso: string | undefined, tipoDocumento: string | undefined) {
        this.idRemateAdjunto = idRemateAdjunto;
        this.idRemate = idRemate;
        this.nombreArchivo = nombreArchivo;
        this.estado = estado;
        this.imagen = imagen;
        this.tipo = tipo;
        this.peso = peso;
        this.tipoDocumento = tipoDocumento;

    }
}
