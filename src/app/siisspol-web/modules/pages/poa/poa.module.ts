import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridPoaComponent} from './grid-poa/grid-poa.component';
import {NgprimeModule} from "../../ngprime/ngprime.module";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../../material/material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../page.module";
import {HttpClient} from "@angular/common/http";
import {ContenedorPoaComponent} from './contenedor-poa/contenedor-poa.component';
import {FormCrudPoaComponent} from './form-crud-poa/form-crud-poa.component';
import {PoaContEmergComponent} from './form-crud-poa/poa-cont-emerg/poa-cont-emerg.component';
import {
  FormCrudActividadComponent
} from "./form-crud-actividad/form-crud-actividad.component";


@NgModule({
  declarations: [
    FormCrudActividadComponent,
    GridPoaComponent,
    ContenedorPoaComponent,
    FormCrudPoaComponent,
    PoaContEmergComponent
  ],
  imports: [
    MaterialModule,
    NgprimeModule,
    CommonModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

  ],
  exports: [
    GridPoaComponent,
    FormCrudActividadComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PoaModule {
}
