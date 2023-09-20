import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {convertirFecha} from "../../../../modules/system/funcions/texto.utils";


@Component({
  selector: 'app-filtro-fecha-todos',
  templateUrl: './filtro-fecha-todos.component.html',
  styleUrls: ['./filtro-fecha-todos.component.css'],
  providers: []
})
export class FiltroFechaTodosComponent implements OnInit {
  initDate: Date | undefined;
  endDate: Date | undefined;

  @Output('validador') validador: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input('filtroEntrada') filtroEntrada: any = 'filtroEntrada';
  @Output('filtroSalida') filtroSalida: EventEmitter<any> = new EventEmitter<any>()

  initDateValid: boolean = false;
  endDateValid: boolean = false;
  bandera: boolean = false;
  sinCobrar: boolean = false;

  private formValid(): boolean {
    if ((this.initDateValid && this.endDateValid) || this.bandera)
      return true
    else false;
    return false;
  }

  public setearFechaInicial(campo: any) {
    const nombrefiltro: string = 'fechaInicio';
    const sinCobrar: string = 'sinCobrar';
    campo = convertirFecha(campo);
    this.initDateValid = true;
    this.sinCobrar = true;
    this.filtroEntrada = {...this.filtroEntrada, [nombrefiltro]: campo, [sinCobrar]: this.sinCobrar}
    this.filtroSalida.emit(this.filtroEntrada);
    this.validador.emit(this.formValid())
  }

  public setearFechaFinal(campo: any) {
    const nombrefiltro: string = 'fechaFin';
    const sinCobrar: string = 'sinCobrar';
    this.endDateValid = true;
    this.sinCobrar = true;
    campo = convertirFecha(campo);
    this.filtroEntrada = {...this.filtroEntrada, [nombrefiltro]: campo, [sinCobrar]: this.sinCobrar}
    this.filtroSalida.emit(this.filtroEntrada);
    this.validador.emit(this.formValid())
  }

  ngOnInit(): void {


  }

  selecionarTodos() {
    if (this.bandera) {
      this.bandera = false;
      this.sinCobrar = true;
    } else {
      this.bandera = true;
      this.endDate = undefined;
      this.initDate = undefined;
      this.sinCobrar = false;
    }
    this.validador.emit(this.formValid())
    const sinCobrar: string = 'sinCobrar';
    this.filtroEntrada = {...this.filtroEntrada, [sinCobrar]: this.sinCobrar}
    this.filtroSalida.emit(this.filtroEntrada);
  }
}
