export class RematePostulanteAdjunto {

    idRematePostulanteAdjunto: number | undefined;
    idRemate: number | undefined;
    idPersonaTipoSubtipoPostulante: number | undefined;
    nombreArchivo: string | undefined;
    estado: string | undefined;
    imagen: string | undefined;
    tipo: string | undefined;
    peso: string | undefined;
    tipoDocumento: string | undefined;

    constructor(idRematePostulanteAdjunto: number | undefined, idRemate: number | undefined, idPersonaTipoSubtipoPostulante: number | undefined, nombreArchivo: string | undefined, estado: string | undefined,
        imagen: string | undefined, tipo: string | undefined, peso: string | undefined, tipoDocumento: string | undefined) {
        this.idRematePostulanteAdjunto = idRematePostulanteAdjunto;
        this.idRemate = idRemate;
        this.idPersonaTipoSubtipoPostulante = idPersonaTipoSubtipoPostulante;
        this.nombreArchivo = nombreArchivo;
        this.estado = estado;
        this.imagen = imagen;
        this.tipo = tipo;
        this.peso = peso;
        this.tipoDocumento = tipoDocumento;

    }
}
