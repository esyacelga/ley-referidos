export class PaginadoPermisoAnticipo {
  ticket: string | undefined;
  anio: string | undefined;
  codigo: string | undefined;
  codigosPms: string | undefined;
  valorTotalPms: string | undefined;
  esProcesado: string | undefined;
  idPermisoPagoContabilidad: string | undefined;
  codigoCpag: string | undefined;
  idInstancia: string | undefined;

  anioAds: string | undefined;


  constructor(ticket: string | undefined, anio: string | undefined, codigo: string | undefined, codigosPms: string | undefined, valorTotalPms: string | undefined, esProcesado: string | undefined, anioAds?: string | undefined) {
    this.ticket = ticket;
    this.anio = anio;
    this.codigo = codigo;
    this.codigosPms = codigosPms;
    this.valorTotalPms = valorTotalPms;
    this.esProcesado = esProcesado;
    this.anioAds = anioAds;
  }
}


export class PermisoPagoContabilidadPersistencia {
  idPermisoPagoContabilidad: string | undefined | null;
  idInstancia: string | undefined;
  anio: string | undefined;
  idAsientoAds: string | undefined;
  codigoPms: string | undefined;
  esProcesado: string | undefined;
  codigoCpag: string | undefined;
  anioAds: string | undefined;

  constructor(idPermisoPagoContabilidad: string | undefined | null, idInstancia: string | undefined, anio: string | undefined, idAsientoAds?: string | undefined, codigoPms?: string | undefined, esProcesado?: string | undefined, anioAds?: string) {
    this.idPermisoPagoContabilidad = idPermisoPagoContabilidad;
    this.idInstancia = idInstancia;
    this.anio = anio;
    this.idAsientoAds = idAsientoAds;
    this.codigoPms = codigoPms;
    this.esProcesado = esProcesado;
    this.anioAds = anioAds;
  }
}
