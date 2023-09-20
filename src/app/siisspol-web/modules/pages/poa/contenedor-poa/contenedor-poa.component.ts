import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {PoaService} from "../services/poa.service";
import {ActivatedRoute} from "@angular/router";
import {BarraHerramientaBoton} from "../../../../shared/barra-herramientas/barra-herramientas.component";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/redux/store/reducers/app.reducer";
import {PoaContEmergComponent} from "../form-crud-poa/poa-cont-emerg/poa-cont-emerg.component";
import {IsspolDialogObject} from "../../../../shared/confirmacion-modal/classes/isspol-dialog-object";

@Component({
  selector: 'app-contenedor-poa',
  templateUrl: './contenedor-poa.component.html',
  styleUrls: ['./contenedor-poa.component.css']
})
export class ContenedorPoaComponent implements OnInit, OnDestroy {
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined, undefined);
  private objSubscripcion: Subscription | undefined;

  constructor(private intSvr: ExecuteCallProcedureService,
              private svrPoa: PoaService,
              public dialog: MatDialog,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.intSvr.setActiveRoute(route)
  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }


  public abrirFormulario() {
    const configuracion: IsspolDialogObject = new IsspolDialogObject({});
    const dialogRef = this.dialog.open(PoaContEmergComponent, configuracion);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        //this.registrarPoa(this.objPersistencia);
      }
      if (data === 'CANCELAR') {

      }
      if (data === 'NUEVO') {
        this.abrirFormulario();
        this.objBtn = new BarraHerramientaBoton(undefined, undefined, undefined);
        //this.crearNuevoRegistro();
      }
    });
  }

}
