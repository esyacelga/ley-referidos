import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";

@Component({
  selector: 'app-ver-persona-referencia',
  templateUrl: './ver-persona-referencia.component.html',
  styleUrls: ['./ver-persona-referencia.component.css']
})
export class VerPersonaReferenciaComponent {
  @Input("personaReferencia") persona: PersonaReferenciaDto = new PersonaReferenciaDto(undefined, 0, '', '', '', '');

}
