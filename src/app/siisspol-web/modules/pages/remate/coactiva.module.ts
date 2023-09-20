import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PostulanteModalComponent } from './remate/modal/postulante-modal/postulante-modal.component';
import { MaterialModule } from '../../material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../page.module';
import {HttpClient} from "@angular/common/http";
import { SharedModule } from '../shared/shared.module';
import { NgprimeModule } from '../../ngprime/ngprime.module';


@NgModule({
  declarations: [
    PostulanteModalComponent
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
  exports: [PostulanteModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoactivaModule {
}
