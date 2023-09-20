import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {ActivatedRoute} from "@angular/router";
import {MigracionFondos} from "../classes/dto/migracion-fondos";

@Component({
  selector: 'app-carga-aportes-fondos-vivienda',
  templateUrl: './carga-aportes-fondos-vivienda.component.html',
  styleUrls: ['./carga-aportes-fondos-vivienda.component.css']
})
export class CargaAportesFondosViviendaComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objMigracion: MigracionFondos | undefined;

  constructor(private intSvr: ExecuteCallProcedureService, private route: ActivatedRoute) {
    this.intSvr.setActiveRoute(route)
    //this.intSvr.setWithOutSeccion()
  }

  ngOnInit(): void {
    if (this.objSubscripcion)
      this.objSubscripcion.unsubscribe();
  }
  ngOnDestroy(): void {
    if (this.objSubscripcion)
      this.objSubscripcion.unsubscribe();
  }



}
