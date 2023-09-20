import {formatearFecha} from '../../../system/funcions/fecha.utils';

export class Feriado {
  fecha: Date | undefined;
  descripcion: string | undefined;
  nacional: number | undefined;
  esNacional: boolean | undefined;
  fechaPersistencia: string | undefined;

  constructor(fecha?: Date | undefined, descripcion?: string | undefined, nacional?: number | undefined, esNacional?: boolean | undefined) {
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.nacional = nacional;
    this.esNacional = esNacional;
    if (fecha != null) {
      this.fechaPersistencia = formatearFecha(fecha);
    }
    if (esNacional === undefined) {
      if (this.nacional === undefined || this.nacional === null || this.nacional === 0) {
        this.esNacional = false;
      } else {
        this.esNacional = true;
      }
    }

    if (this.esNacional === null || this.esNacional === false) {
      this.nacional = 0;
    } else {
      this.nacional = 1;
    }
  }

}
