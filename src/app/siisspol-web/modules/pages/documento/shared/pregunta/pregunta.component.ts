import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CatalogoCompuesto} from "../../classes/dto/CatalogoCompuesto";
import {PreguntaService} from "../../services/pregunta.service";

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  @Output('preguntas') lstPregunta: EventEmitter<CatalogoCompuesto[]> = new EventEmitter();

  lstPreguntas: CatalogoCompuesto[] | undefined;

  /*@Input('pregunta') catalogoCompuesto: CatalogoCompuesto = new CatalogoCompuesto();*/

  constructor(private svrPregunta: PreguntaService,) {
  }

  public cargarDato() {
    this.lstPregunta.emit(this.lstPreguntas);
  }

  async ngOnInit(): Promise<void> {
    this.lstPreguntas = await (this.svrPregunta.obtenerPreguntas()) as CatalogoCompuesto[]
    this.lstPregunta.emit(this.lstPreguntas);
  }

}
