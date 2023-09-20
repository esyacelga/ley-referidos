export class ActividadProyectoDto {
  idActividadPoa: number;
  idCabeceraPoa: number;
  idGestionResponsable: number;
  idNivel!: number;
  idTipoControl!: number;
  idCumplimiento!: number;
  probabilidad: number;
  impacto: number;
  evaluacion: number;
  trimestre: number;
  actividadesPlanAccion: string;
  amenazaRiesgo: string;
  fechaMaximaEjecucion: string;
  fechaCertificacionPoa: string;
  presupuestoInicial: string;
  nivel: string;
  tipoControl: string;
  cumplimiento: string;
  responsable!: string;


  constructor(
    idActividadPoa: number, idCabeceraPoa: number, idGestionResponsable: number,
    amenazaRiesgo: string, probabilidad: number, impacto: number, evaluacion: number,
    nivel: string, tipoControl: string, actividadesPlanAccion: string, trimestre: number,
    fechaMaximaEjecucion: string, fechaCertificacionPoa: string, cumplimiento: string, presupuestoInicial?: string) {
    this.idActividadPoa = idActividadPoa;
    this.idCabeceraPoa = idCabeceraPoa;
    this.idGestionResponsable = idGestionResponsable;
    this.amenazaRiesgo = amenazaRiesgo;
    this.probabilidad = probabilidad;
    this.impacto = impacto;
    this.evaluacion = evaluacion;
    this.nivel = nivel;
    this.tipoControl = tipoControl;
    this.actividadesPlanAccion = actividadesPlanAccion;
    this.trimestre = trimestre;
    this.fechaMaximaEjecucion = fechaMaximaEjecucion;
    this.fechaCertificacionPoa = fechaCertificacionPoa;
    this.cumplimiento = cumplimiento;
    this.presupuestoInicial = presupuestoInicial!;
  }
}


export class ActividadProyecto extends ActividadProyectoDto {

  nivelColor: string = 'green';
  cumplimientoColor: string = '';

  constructor(idActividadPoa: number, idCabeceraPoa: number, idGestionResponsable: number,
              amenazaRiesgo: string, probabilidad: number, impacto: number, evaluacion: number,
              nivel: string, tipoControl: string, actividadesPlanAccion: string, trimestre: number,
              fechaMaximaEjecucion: string, fechaCertificacionPoa: string, cumplimiento: string, presupuestoInicial?: string) {
    super(idActividadPoa, idCabeceraPoa, idGestionResponsable,
      amenazaRiesgo, probabilidad, impacto, evaluacion,
      nivel, tipoControl, actividadesPlanAccion, trimestre,
      fechaMaximaEjecucion, fechaCertificacionPoa, cumplimiento, presupuestoInicial);

    this.procesarValores();

  }

  procesarValores() {
    this.obtenerEvaluacion();
    this.nivel = this.obtenerNivel(this.evaluacion);
    this.tipoControl = this.obtenerTipoControl(this.evaluacion);
    this.nivelColor = this.obtenerNivelColor(this.evaluacion);
    this.cumplimiento = this.obtenerCumplimiento();
    this.cumplimientoColor = this.obtenerCumplimientoColor();
  }

  private obtenerEvaluacion() {
    this.evaluacion = this.probabilidad * this.impacto
  }

  private obtenerNivel(numero: number): string {
    let resultado: string;
    switch (true) {
      case numero >= 1 && numero < 3:
        this.idNivel = 1;
        resultado = "BAJO";
        break;
      case numero >= 3 && numero < 6:
        this.idNivel = 2;
        resultado = "MODERADO";
        break;
      case numero >= 6 && numero < 12:
        this.idNivel = 3;
        resultado = "MEDIO";
        break;
      case numero >= 12 && numero < 20:
        this.idNivel = 4;
        resultado = "ALTO";
        break;
      case numero >= 12:
        this.idNivel = 5;
        resultado = "MUY ALTO";
        break;
      default:
        resultado = "SIN VALOR";
    }
    return resultado;
  }

  private obtenerNivelColor(numero: number): string {
    let resultado: string;
    switch (true) {
      case numero >= 1 && numero < 3:
        resultado = "verde-claro";
        break;
      case numero >= 3 && numero < 6:
        resultado = "verde-oscuro";
        break;
      case numero >= 6 && numero < 12:
        resultado = "amarillo";
        break;
      case numero >= 12 && numero < 20:
        resultado = "amarillo-oscuro";
        break;
      case numero >= 12:
        resultado = "rojo";
        break;
      default:
        resultado = "campo-vacio";
    }
    return resultado;
  }

  private obtenerTipoControl(valorEvaluacion: number) {
    let resultado: string;
    switch (true) {
      case valorEvaluacion <= 3:
        this.idTipoControl = 1
        resultado = "Acción no prioritaria";
        break;
      case valorEvaluacion > 3 && valorEvaluacion <= 9:
        this.idTipoControl = 2
        resultado = "Acción Preventiva";
        break;
      default:
        this.idTipoControl = 3
        resultado = "Acción Correctiva";
    }
    return resultado;
  }

  private obtenerCumplimiento(): string {
    if (this.fechaMaximaEjecucion >= this.fechaCertificacionPoa && this.fechaCertificacionPoa != ''){
      this.idCumplimiento=1;
      return 'A tiempo'
    }
    else if (this.fechaMaximaEjecucion < this.fechaCertificacionPoa && this.fechaCertificacionPoa != ''){
      this.idCumplimiento=2;
      return 'Fuera de tiempo'
    }
    else{
      this.idCumplimiento=3;
      return 'Pendiente'
    }

  }

  private obtenerCumplimientoColor(): string {
    if (this.fechaMaximaEjecucion >= this.fechaCertificacionPoa && this.fechaCertificacionPoa != '')
      return ''
    else if (this.fechaMaximaEjecucion < this.fechaCertificacionPoa && this.fechaCertificacionPoa != '')
      return 'amarillo-oscuro'
    else
      return 'rojo'
  }
}
