import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistroClienteComponent} from './componentes/persona-referencia-contenedor/registro-cliente/registro-cliente.component';
import {SharedModule} from "../siisspol-web/modules/pages/shared/shared.module";
import {NgprimeModule} from "../siisspol-web/modules/ngprime/ngprime.module";
import {MaterialModule} from "../siisspol-web/modules/material/material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../siisspol-web/modules/pages/page.module";
import {HttpClient} from "@angular/common/http";
import { PersonaReferenciaContenedorComponent } from './componentes/persona-referencia-contenedor/persona-referencia-contenedor.component';
import { GridPersonaReferenciaComponent } from './componentes/persona-referencia-contenedor/grid-persona-referencia/grid-persona-referencia.component';
import { EmergPersonaReferenciaComponent } from './componentes/persona-referencia-contenedor/emerg-persona-referencia/emerg-persona-referencia.component';
import { VerPersonaReferenciaComponent } from './componentes/persona-referencia-contenedor/ver-persona-referencia/ver-persona-referencia.component';
import { ClienteVistaReferenciaComponent } from './componentes/cliente-vista-referencia/cliente-vista-referencia.component';
import { GridVistaComponent } from './componentes/cliente-vista-referencia/grid-vista/grid-vista.component';
import { FormularioVistaComponent } from './componentes/cliente-vista-referencia/formulario-vista/formulario-vista.component';


@NgModule({
  declarations: [
    RegistroClienteComponent,
    PersonaReferenciaContenedorComponent,
    GridPersonaReferenciaComponent,
    EmergPersonaReferenciaComponent,
    VerPersonaReferenciaComponent,
    ClienteVistaReferenciaComponent,
    GridVistaComponent,
    FormularioVistaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgprimeModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    RegistroClienteComponent
  ],
})
export class LeyServiceModule {
}
