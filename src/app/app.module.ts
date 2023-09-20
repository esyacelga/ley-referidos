import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent, appInitializerFactory} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {appReducers} from "./siisspol-web/shared/redux/store/reducers/app.reducer";
import {BlockUIModule} from "ng-block-ui";
import {ToastrModule} from "ngx-toastr";
import {RestConectionModule} from "./siisspol-web/modules/system/rest-connection/rest-connection.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "../environments/environment";
import {PageModule} from "./siisspol-web/modules/pages/page.module";
import {TranslateService} from "@ngx-translate/core";
import {MY_FORMATS} from "./siisspol-web/modules/material/material.module";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RemoteEjecutionFlow} from "./siisspol-web/modules/pages/comun/services/remote-ejecution-flow";

@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    PageModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BlockUIModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 90000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      closeButton: true
    }),
    RestConectionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [RemoteEjecutionFlow, {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [TranslateService],
    multi: true
  }, {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
