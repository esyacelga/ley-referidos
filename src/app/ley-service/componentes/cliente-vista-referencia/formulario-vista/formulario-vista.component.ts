import {Component, Input} from '@angular/core';
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";

@Component({
  selector: 'app-formulario-vista',
  templateUrl: './formulario-vista.component.html',
  styleUrls: ['./formulario-vista.component.css']
})
export class FormularioVistaComponent {
  @Input("inputPesona") inputPersona: PersonaReferenciaDto = new PersonaReferenciaDto(undefined, 0, '', '', '', '')


}
