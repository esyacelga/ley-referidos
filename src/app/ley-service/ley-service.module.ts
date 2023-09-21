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


@NgModule({
  declarations: [
    RegistroClienteComponent,
    PersonaReferenciaContenedorComponent,
    GridPersonaReferenciaComponent
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
