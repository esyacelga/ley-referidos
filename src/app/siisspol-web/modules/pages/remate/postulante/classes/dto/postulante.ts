export class Postulante {

    identificacion: string | undefined;
    idRemate: number | undefined;
    idPersonaTipoSubtipo: number | undefined;
    nombreCompleto: string | undefined;
    fechaPostulacion: Date | undefined;
    valorOfertado: number | undefined;
    esGanador: boolean | undefined;
    comprobanteDeposito: string | undefined;
    esDevuelto: boolean | undefined;
    cumpleRequisitos: boolean | undefined;
    numeroJucio: string | undefined;
    tipoBien: string | undefined;
    descripcionBien: string | undefined;
    descripcionUbicacion: string | undefined;
    esEditar: boolean = false;
    valorBien: number = 0;
    valorMinimo: number = 0;
    etapaRemate: string | undefined;
    //Persona
    apellidoPaterno: string | undefined;
    apellidoMaterno: string | undefined;
    nombre: string | undefined;
    fechaNacimiento: Date | undefined;
    idTipoSexo: number | undefined;
    idUbicacionGeografica: number | undefined;
    idTipoIdentificacion: number | undefined;
    direccion: string | undefined;  
    idTipoCliente: number | undefined; 
    celular: string | undefined;
    telefono: string | undefined;
    correo: string | undefined;
    fechaString: string | undefined;
    fechaPostulacionString: string | undefined;
    

    constructor(identificacion: string | undefined, idRemate: number | undefined, idPersonaTipoSubtipo: number | undefined, fechaPostulacion: Date | undefined,
        valorOfertado: number | undefined, esGanador: boolean | undefined, comprobanteDeposito: string | undefined, esDevuelto: boolean | undefined, cumpleRequisitos: boolean | undefined,
        apellidoPaterno: string | undefined, apellidoMaterno: string | undefined, nombre: string | undefined, fechaNacimiento: Date | undefined,
        idTipoSexo: number | undefined, idUbicacionGeografica: number | undefined, idTipoIdentificacion: number | undefined, direccion: string | undefined,
        idTipoCliente: number | undefined, celular: string | undefined, telefono: string | undefined, correo: string | undefined, esEditar: boolean) {
        this.identificacion = identificacion;
        this.idRemate = idRemate;
        this.idPersonaTipoSubtipo = idPersonaTipoSubtipo;
        this.fechaPostulacion = fechaPostulacion;
        this.valorOfertado = valorOfertado;
        this.esGanador = esGanador;
        this.comprobanteDeposito = comprobanteDeposito;
        this.esDevuelto = esDevuelto;
        this.cumpleRequisitos = cumpleRequisitos;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.idTipoSexo = idTipoSexo;
        this.idUbicacionGeografica = idUbicacionGeografica;
        this.idTipoIdentificacion = idTipoIdentificacion;
        this.direccion = direccion;
        this.idTipoCliente = idTipoCliente;
        this.celular = celular;
        this.telefono = telefono;
        this.correo = correo;
        this.esEditar = esEditar;

    }
}
