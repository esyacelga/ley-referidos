import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filtro-texto',
  templateUrl: './filtro-texto.component.html',
  styleUrls: ['./filtro-texto.component.css']
})
export class FiltroTextoComponent {
  @Input('nombreCampo') nombreCampo: string = 'nombreCampo';
  @Input('filtroEntrada') filtroEntrada: any = 'filtroEntrada';
  @Output('filtroSalida') filtroSalida: EventEmitter<any> = new EventEmitter<any>()
  @Output('validador') validador: EventEmitter<boolean> = new EventEmitter<boolean>()
  campoEntrada: string = '';


  public setearFiltro(campo: string) {
    const nombrefiltro: string = this.nombreCampo;
    this.filtroEntrada = {...this.filtroEntrada, [nombrefiltro]: campo}
    this.filtroSalida.emit(this.filtroEntrada);
    this.validador.emit(true);
  }

}
