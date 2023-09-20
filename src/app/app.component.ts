import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {PrimeNGConfig} from "primeng/api";
import {Subscription} from "rxjs";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {MY_FORMATS} from "./siisspol-web/modules/material/material.module";

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('es');
    return translate.use('es').toPromise();
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class AppComponent implements OnInit {
  title = 'siisspol-wb-ax';
  // @ts-ignore
  subscription: Subscription;

  constructor(private primengConfig: PrimeNGConfig, public translate: TranslateService, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.subscription = this.translate.stream('p-filterMenu').subscribe(data => {
      this.primengConfig.setTranslation(data);
    });
  }


}
