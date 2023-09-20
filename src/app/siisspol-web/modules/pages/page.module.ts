import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MaterialModule} from '../material/material.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from "./home/home.component";
import {ConfirmacionDirective} from "../../shared/directives/confirmacion.directive";
import {ActivarObjetoDirective} from "../../shared/directives/activar-objeto.directive";
import {NgprimeModule} from "../ngprime/ngprime.module";
import {FeriadosComponent} from "./comun/feriados/feriados.component";
import {
  PermisoPagoAnticiposComponent
} from "./prestaciones-medicas/component/permiso-pago-anticipos/permiso-pago-anticipos.component";
import {ListaPmsComponent} from "./prestaciones-medicas/modal/lista-pms/lista-pms.component";
import {TokenComponent} from "./seguridad/component/token/token.component";
import {TextConfirmarComponent} from "./shared/text-confirmar/text-confirmar.component";
import {ToastModule} from "primeng/toast";
import {PostulanteComponent} from "./remate/postulante/component/postulante.component";
import {RemateComponent} from "./remate/remate/component/remate.component";
import {UbicacionGeograficaComponent} from "./remate/remate/modal/ubicacion-geografica/ubicacion-geografica.component";
import {RemateCronogramaComponent} from "./remate/remate/modal/remate-cronograma/remate-cronograma.component";
import {
  TipoCaracteristicaComponent
} from "./remate/caracteristica/component/tipo-caracteristica/tipo-caracteristica.component";
import {CaracteristicaComponent} from "./remate/caracteristica/component/caracteristica/caracteristica.component";
import {
  TipoCaracteristicaModalComponent
} from "./remate/caracteristica/modal/tipo-caracteristica-modal/tipo-caracteristica-modal.component";
import {RemateModalComponent} from "./remate/caracteristica/modal/remate-modal/remate-modal.component";
import {ConfigFlowComponent} from "./comun/component/flujo/config-flow/config-flow.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {SharedModule} from "./shared/shared.module";
import {DocumentoModule} from "./documento/documento.module";
import {CargaMasivaComponent} from "./fondos-vivienda/carga-masiva/carga-masiva.component";
import {CargaMasivaEdicionComponent} from "./fondos-vivienda/carga-masiva-edicion/carga-masiva-edicion.component";
import {
  CargaAportesFondosViviendaComponent
} from "./fondos-vivienda/carga-aportes-fondos-vivienda/carga-aportes-fondos-vivienda.component";
import {CabeceraMigracionComponent} from "./fondos-vivienda/cabecera-migracion/cabecera-migracion.component";

import {PrimeNGConfig} from 'primeng/api';
import {DetalleAporteComponent} from './fondos-vivienda/detalle-aporte/detalle-aporte.component';
import {PoaModule} from "./poa/poa.module";
import {CoactivaModule} from './remate/coactiva.module';
import {FinancieroModule} from "./financiero/financiero.module";


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ConfigFlowComponent,
    ActivarObjetoDirective,
    HomeComponent,
    FeriadosComponent,
    PermisoPagoAnticiposComponent,
    ListaPmsComponent,
    TokenComponent,
    PostulanteComponent, RemateComponent, UbicacionGeograficaComponent,
    RemateCronogramaComponent, TipoCaracteristicaComponent,
    CaracteristicaComponent, TipoCaracteristicaModalComponent, RemateModalComponent,
    CargaMasivaComponent, CargaMasivaEdicionComponent, CargaAportesFondosViviendaComponent,
    CabeceraMigracionComponent, DetalleAporteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CoactivaModule,
    FinancieroModule,
    DocumentoModule,
    FormsModule,
    MaterialModule,
    NgprimeModule,
    NgSelectModule,
    PdfViewerModule,
    PoaModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    ToastModule,
  ], exports: [
    ConfirmacionDirective
  ], providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PageModule {
  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      monthNames: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
        'Octubre', 'Noviembre', 'Diciembre'
      ],
      monthNamesShort: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ],
      today: 'Hoy',
      clear: 'Borrar'
    });
  }

}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

