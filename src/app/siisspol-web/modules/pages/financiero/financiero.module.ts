import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {NgprimeModule} from "../../ngprime/ngprime.module";
import {MaterialModule} from "../../material/material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../page.module";
import {HttpClient} from "@angular/common/http";
import {ValoresNegativosComponent} from "./presupuesto/component/valores-negativos/valores-negativos.component";
import {
  CierrePresupuestarioComponent
} from "./presupuesto/component/cierre-presupuestario/cierre-presupuestario.component";

@NgModule({
  declarations: [ValoresNegativosComponent,CierrePresupuestarioComponent],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[ValoresNegativosComponent,CierrePresupuestarioComponent]
})
export class FinancieroModule { }
