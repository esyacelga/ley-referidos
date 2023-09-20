import {CatalogoDocumento} from "./catalogoDocumento";
import {CatalogoCompuesto} from "./CatalogoCompuesto";

export class FormDenuncia {
  tipoDelito: CatalogoDocumento | undefined;
  tipoDenuncia: CatalogoDocumento | undefined;
  idTipoDelito: string | undefined;
  idTipoDenunciante: string | undefined;
  idTipoDenuncia: string | undefined;
  idOrigen: string | undefined;
  identificacion: string | undefined;
  nombrePersona: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  descripcion: string | undefined;
  idEstadoDenuncia: string | undefined;
  idDenuncia: string | undefined;
  numeroReferencia: string | undefined;
  lstRespuestas: CatalogoCompuesto[] | undefined;
  constructor(tipoDenuncia?: CatalogoDocumento | undefined, tipoDelito?: CatalogoDocumento | undefined, idTipoDelito?: string | undefined, idTipoDenunciante?: string | undefined, idOrigen?: string | undefined, identificacion?: string | undefined, nombrePersona?: string | undefined, telefono?: string | undefined, correo?: string | undefined, descripcion?: string | undefined, idEstadoDenuncia?: string | undefined, lstRespuestas?: CatalogoCompuesto[] | undefined, idTipoDenuncia?: string | undefined) {
    this.tipoDelito = tipoDelito;
    this.tipoDenuncia = tipoDenuncia;
    this.idTipoDelito = idTipoDelito;
    this.idTipoDenunciante = idTipoDenunciante;
    this.idOrigen = idOrigen;
    this.identificacion = identificacion;
    this.nombrePersona = nombrePersona;
    this.telefono = telefono;
    this.correo = correo;
    this.descripcion = descripcion;
    this.idEstadoDenuncia = idEstadoDenuncia;
    this.lstRespuestas = lstRespuestas;
    this.idTipoDenuncia = idTipoDenuncia;
  }

  public cargarObjetoPersistencia() {
    this.idTipoDelito = this.tipoDelito?.idCatalogo;
    this.idTipoDenuncia = this.tipoDenuncia?.idCatalogo;
  }

}
