export class FarmaciaPrestador {
  idPrestadorFarmaciaPm: number | undefined;
  eliminado: number | undefined;
  observacion: string | undefined;
  fecha: string | undefined;
  idPrestador: number | undefined;

  constructor(idPrestadorFarmaciaPm?: number, eliminado?: number, observacion?: string, fecha?: string, idPrestador?: number) {
    this.idPrestadorFarmaciaPm = idPrestadorFarmaciaPm;
    this.eliminado = eliminado;
    this.observacion = observacion;
    this.fecha = fecha;
    this.idPrestador = idPrestador;
  }
}

export class PrestadorCiudad {
  idPrestador: number | undefined;
  prestador: string | undefined;

  constructor(idPrestador?: number, prestador?: string) {
    this.idPrestador = idPrestador;
    this.prestador = prestador;
  }
}

export class FarmaciaPrestadorDto {
  idPrestadorFarmaciaPm: number | undefined;
  nombrePrestador: string | undefined;
  observacion: string | undefined;
  fecha: string | undefined;
  eliminado: number | undefined;
  idPrestador: number | undefined;
  fechaObj: Date | undefined;

  constructor(idPrestadorFarmaciaPm?: number | undefined, nombrePrestador?: string | undefined, fecha?: string | undefined
    , eliminado?: number | undefined, observacion?: string, idPrestador?: number | undefined
    , fechaObj?: Date | undefined) {
    this.idPrestadorFarmaciaPm = idPrestadorFarmaciaPm;
    this.nombrePrestador = nombrePrestador;
    this.fecha = fecha;
    this.eliminado = eliminado;
    this.observacion = observacion;
    this.idPrestador = idPrestador;
    this.fechaObj = fechaObj;
  }
}
