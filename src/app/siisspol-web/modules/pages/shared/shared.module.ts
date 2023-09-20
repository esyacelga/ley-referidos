import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewerComponent} from "../../../shared/pdf/ViewerComponent";
import {DialogTitleComponent} from "../../../shared/auditoria/dialog-title/dialog-title.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../page.module";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {MaterialModule} from "../../material/material.module";
import {BarraHerramientasComponent} from "../../../shared/barra-herramientas/barra-herramientas.component";
import {ConfirmacionDirective} from "../../../shared/directives/confirmacion.directive";
import {ConfirmacionModalComponent} from "../../../shared/confirmacion-modal/confirmacion-modal.component";
import {AuditoriaComponent} from "../../../shared/auditoria/auditoria.component";
import {AuditoriaDirective} from "../../../shared/directives/auditoria.directive";
import {FiltroTextoComponent} from "../../../shared/reporte/generador-reporte/filtro-texto/filtro-texto.component";
import {FiltroFechaComponent} from "../../../shared/reporte/generador-reporte/filtro-fecha/filtro-fecha.component";
import {GeneradorReporteComponent} from "../../../shared/reporte/generador-reporte/generador-reporte.component";
import {ReporteDirective} from "../../../shared/directives/reporte.directive";
import {ReporteModalComponent} from "../../../shared/reporte-modal/reporte-modal.component";
import {GenericTreeComponent} from "../../../shared/generic-tree/generic-tree.component";
import {PipesModule} from "../../pipes/pipes.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {ConfirmarComponent} from "./confirmar/confirmar.component";
import {
  FiltroFechaTodosComponent
} from "../../../shared/reporte/generador-reporte/filtro-fecha-todos/filtro-fecha-todos.component";
import {
  BarraHerramientasModalComponent
} from "../../../shared/barra-herramientas-modal/barra-herramientas-modal.component";
import {UppercaseDirective} from 'src/app/siisspol-web/shared/directives/uppercase.directive';

@NgModule({
  declarations: [ViewerComponent, DialogTitleComponent, BarraHerramientasComponent, ConfirmacionDirective,
    ConfirmacionModalComponent, AuditoriaComponent,
    AuditoriaDirective, FiltroTextoComponent,
    FiltroFechaComponent, FiltroFechaTodosComponent, GeneradorReporteComponent,
    ReporteDirective, ConfirmarComponent,
    ReporteModalComponent, GenericTreeComponent, BarraHerramientasModalComponent, UppercaseDirective
  ],
  imports: [
    NgxExtendedPdfViewerModule,
    CommonModule,
    CurrencyMaskModule,
    NgxMaskDirective,
    PipesModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [ViewerComponent, DialogTitleComponent, BarraHerramientasComponent, ConfirmacionDirective,
    ConfirmacionModalComponent, AuditoriaComponent,
    PipesModule, BarraHerramientasModalComponent,
    AuditoriaDirective, FiltroTextoComponent,
    FiltroFechaComponent, FiltroFechaTodosComponent, GeneradorReporteComponent,
    ReporteDirective,
    ReporteModalComponent, GenericTreeComponent,
    CurrencyMaskModule, ConfirmarComponent,
    NgxMaskDirective, UppercaseDirective,
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {
}
