import {Component, OnInit} from '@angular/core';
import {BarraHerramientaBoton} from "../../../siisspol-web/shared/barra-herramientas/barra-herramientas.component";
import {ReporteDenuncia} from "../../../siisspol-web/shared/reporte/classes/reporte-denuncia";
import {DenunciaService} from "../../../siisspol-web/modules/pages/documento/services/denuncia.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../siisspol-web/shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {
  ExecuteCallProcedureService
} from "../../../siisspol-web/modules/system/services/system/execute-call-procedure.service";
import {Subscription} from "rxjs";
import {botonesBarraHerramientas} from "../../../siisspol-web/shared/redux/types";

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined);

  constructor(public svrDenuncia: DenunciaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private intSvr: ExecuteCallProcedureService
  ) {
    //this.intSvr.setWithOutSeccion();
    this.intSvr.setActiveRoute(route)
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data: botonesBarraHerramientas) => {
      if (data === 'GUARDAR') {
        //this.registrarNuevoEstado();
      }
      if (data === 'CANCELAR') {
        //this.objDenuncia = undefined;
        this.objBtn = new BarraHerramientaBoton(undefined, undefined, new ReporteDenuncia());
        this.objBtn.verNuevo = false;
      }
      if (data === 'NUEVO') {
        /*this.crearNuevoRegistro();*/
      }
      if (data === 'PROCESAR') {
        /*this.procesarPagoCierreCXP();*/
      }
    });
  }
}
