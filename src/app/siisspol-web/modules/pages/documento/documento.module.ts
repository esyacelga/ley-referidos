import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoDelitoComponent} from "./component/tipo-delito/tipo-delito.component";
import {TipoDenunciaComponent} from "./component/tipo-denuncia/tipo-denuncia.component";
import {PreguntaComponent} from "./shared/pregunta/pregunta.component";
import {SharedModule} from "../shared/shared.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../page.module";
import {MaterialModule} from "../../material/material.module";
import {GridFlujoComponent} from "../comun/component/flujo/grid-flujo/grid-flujo.component";
import {GridFlujoVersionComponent} from "../comun/component/flujo/grid-flujo-version/grid-flujo-version.component";
import {ContFlujoVersionComponent} from "../comun/component/flujo/cont-flujo-version/cont-flujo-version.component";
import {FormFlujoVersionComponent} from "../comun/component/flujo/form-flujo-version/form-flujo-version.component";
import {FormConfigComponent} from "../comun/component/flujo/config-flow/form-config/form-config.component";
import {GridConfigComponent} from "../comun/component/flujo/config-flow/grid-config/grid-config.component";
import {FlujoComponent} from "../comun/component/flujo/flujo.component";
import {FormFlujoComponent} from "../comun/component/flujo/form-flujo/form-flujo.component";
import {
  DescripcionDenunciaComponent
} from "./component/mant-denuncia/descripcion-denuncia/descripcion-denuncia.component";
import {AdjuntoDenunciaComponent} from "./component/mant-denuncia/adjunto-denuncia/adjunto-denuncia.component";
import {
  InformacionDenunciaComponent
} from "./component/mant-denuncia/informacion-denuncia/informacion-denuncia.component";
import {SimpleModalComponent} from "./shared/simple-modal/simple-modal.component";
import {RegistroDenunciaComponent} from "./modal/registro-denuncia/registro-denuncia.component";
import {NgprimeModule} from "../../ngprime/ngprime.module";
import {MantDenunciaComponent} from "./component/mant-denuncia/mant-denuncia.component";
import {DenunciasComponent} from "./component/denuncias/denuncias.component";
import {MantPreguntaComponent} from "./component/mant-pregunta/mant-pregunta.component";
import {TextConfirmarComponent} from "../shared/text-confirmar/text-confirmar.component";

@NgModule({
  declarations: [TipoDelitoComponent, TipoDenunciaComponent, PreguntaComponent, TextConfirmarComponent,
    GridFlujoComponent, GridFlujoVersionComponent, ContFlujoVersionComponent, SimpleModalComponent, RegistroDenunciaComponent,
    FormFlujoVersionComponent, FormConfigComponent, GridConfigComponent, FlujoComponent, MantDenunciaComponent, DenunciasComponent, MantPreguntaComponent,
    FormFlujoComponent, DescripcionDenunciaComponent, AdjuntoDenunciaComponent, InformacionDenunciaComponent],
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
  exports: [TipoDelitoComponent, TipoDenunciaComponent, PreguntaComponent, TextConfirmarComponent,
    GridFlujoComponent, GridFlujoVersionComponent, ContFlujoVersionComponent, SimpleModalComponent, RegistroDenunciaComponent,
    FormFlujoVersionComponent, FormConfigComponent, GridConfigComponent, FlujoComponent, MantDenunciaComponent, DenunciasComponent, MantPreguntaComponent,
    FormFlujoComponent, DescripcionDenunciaComponent, AdjuntoDenunciaComponent, InformacionDenunciaComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentoModule {

}

