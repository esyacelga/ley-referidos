import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";

@Component({
  selector: 'app-formulario-vista',
  templateUrl: './formulario-vista.component.html',
  styleUrls: ['./formulario-vista.component.css']
})
export class FormularioVistaComponent {
  @Input("inputPersona") inputPersona: PersonaReferenciaDto = new PersonaReferenciaDto(undefined, 0, '', '', '', '')
  @Output("outPersona") outPersona: EventEmitter<PersonaReferenciaDto> = new EventEmitter<PersonaReferenciaDto>();

  volver() {
    this.outPersona.emit(new PersonaReferenciaDto(undefined, 0, '', '', '', ''))
  }
}
