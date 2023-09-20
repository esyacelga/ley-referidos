import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {convertirFecha} from "../../../../modules/system/funcions/texto.utils";


@Component({
  selector: 'app-filtro-fecha',
  templateUrl: './filtro-fecha.component.html',
  styleUrls: ['./filtro-fecha.component.css'],
  providers: []
})
export class FiltroFechaComponent implements OnInit {
  initDate!: Date;
  endDate!: Date;

  @Output('validador') validador: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input('filtroEntrada') filtroEntrada: any = 'filtroEntrada';
  @Output('filtroSalida') filtroSalida: EventEmitter<any> = new EventEmitter<any>()

  initDateValid: boolean = false;
  endDateValid: boolean = false;

  private formValid(): boolean {
    if (this.initDateValid && this.endDateValid)
      return true
    else false;
    return false;
  }

  public setearFechaInicial(campo: any) {
    const nombrefiltro: string = 'fechaInicial';
    campo = convertirFecha(campo);
    this.initDateValid = true;
    this.filtroEntrada = {...this.filtroEntrada, [nombrefiltro]: campo}
    this.filtroSalida.emit(this.filtroEntrada);
    this.validador.emit(this.formValid())
  }

  public setearFechaFinal(campo: any) {
    const nombrefiltro: string = 'fechaFinal';
    this.endDateValid = true;
    campo = convertirFecha(campo);
    this.filtroEntrada = {...this.filtroEntrada, [nombrefiltro]: campo}
    this.filtroSalida.emit(this.filtroEntrada);
    this.validador.emit(this.formValid())
  }

  ngOnInit(): void {


  }
}
