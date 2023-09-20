import {Component, Input} from '@angular/core';
import {MigracionFondos} from "../classes/dto/migracion-fondos";

@Component({
  selector: 'app-cabecera-migracion',
  templateUrl: './cabecera-migracion.component.html',
  styleUrls: ['./cabecera-migracion.component.css']
})
export class CabeceraMigracionComponent {
  @Input('objMigracionFondos') objMigracionFondos: MigracionFondos = new MigracionFondos();
  @Input('presentaCabeceraPrincipal') presentaCabeceraPrincipal: boolean = true


}
