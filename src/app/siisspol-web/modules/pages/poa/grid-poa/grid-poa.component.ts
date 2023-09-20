import {Component, OnInit} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {ActivatedRoute} from "@angular/router";
import {PoaDto} from "../classes/PoaDto";
import {PoaService} from "../services/poa.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/redux/store/reducers/app.reducer";

@Component({
  selector: 'app-grid-poa',
  templateUrl: './grid-poa.component.html',
  styleUrls: ['./grid-poa.component.css']
})
export class GridPoaComponent implements OnInit {
  lstPoa: PoaDto[] = new Array();
  private objSubscripcion: Subscription | undefined;

  constructor(private intSvr: ExecuteCallProcedureService,
              private svrPoa: PoaService,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.intSvr.setActiveRoute(route)
  }

  public async cargargarGridPrincipal() {
    this.lstPoa = await this.svrPoa.obtenerGridPrincipalPoa();
  }

  getSeverity(product: string) {
    switch (product) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'success';
    }
  };

  ngOnInit(): void {
    this.cargargarGridPrincipal();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {

      }
      if (data === 'CANCELAR') {
        const delayInMilliseconds = 10000;
        setTimeout(() => {
          this.cargargarGridPrincipal();
        }, delayInMilliseconds);
      }
      if (data === 'NUEVO') {

      }
    });
  }
}
