import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {botonesBarraHerramientas} from '../redux/types';
import {AppState} from '../redux/store/reducers/app.reducer';
import {Confirmacion} from '../redux/classes/Confirmacion';
import {Subscription} from 'rxjs';
import {setAccion} from '../redux/store/actions/barra-herramientas.actions';
import * as $ from 'jquery';
import {TranslateService} from '@ngx-translate/core';
import {StorageAppService} from "../../modules/system/services/system/storage-app.service";
import {SessionData} from "../../modules/system/classes/session-data";
import {MatDialog} from "@angular/material/dialog";
import {GeneradorReporteComponent} from "../reporte/generador-reporte/generador-reporte.component";
import {ReporteObjComponent} from "../reporte/classes/reporte-obj-component";
import {IsspolDialogObject} from "../confirmacion-modal/classes/isspol-dialog-object";
import {ServiceStoreService} from "./service-store.service";

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.css']
})
export class BarraHerramientasComponent implements OnInit, OnDestroy {

  @Input() objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private svrTranslate: TranslateService,
              private storeService: ServiceStoreService,
              private svrStore: StorageAppService) {
  }

  public async cargarInformacionSeccion() {
    const session: SessionData = await (this.svrStore.loadStorageObject('sessionData') as unknown as SessionData);

  }

  private GUARDAR: botonesBarraHerramientas = 'GUARDAR';
  private CANCELAR: botonesBarraHerramientas = 'CANCELAR';
  private PROCESAR: botonesBarraHerramientas = 'PROCESAR';
  private objSubscripcion: Subscription | undefined;
  objConfirmacionGuardar: Confirmacion = new Confirmacion(this.svrTranslate.instant('siisspolweb.comun.confirmacion'), 'Desea realmente enviar a guardar ?', this.GUARDAR);
  objConfirmacionCancelar: Confirmacion = new Confirmacion(this.svrTranslate.instant('siisspolweb.comun.confirmacion'), this.svrTranslate.instant('siisspolweb.comun.mensaje.perdida'), this.CANCELAR);
  objConfirmacionProcesar: Confirmacion = new Confirmacion(this.svrTranslate.instant('siisspolweb.comun.confirmacion'), 'Desea realmente enviar a procesar ?', this.PROCESAR);

  accion: botonesBarraHerramientas = 'VOID';


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // @ts-ignore
    $('.ui-cuerpo-pagina').css({height: $(window).height() - 140, 'overflow-y': 'auto'});
  }

  abrirPanelSeleccionReporte() {
    const configuracion: IsspolDialogObject = new IsspolDialogObject(this.objBtn.reportePantalla);
    const dialogRef = this.dialog.open(GeneradorReporteComponent, configuracion);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    $('.ui-cuerpo-pagina').css({height: $(window).height() - 140, 'overflow-y': 'auto'});
    //this.objBtn = new BarraHerramientaBoton();
    this.objSubscripcion = this.store.select('accionComponenteConfirmacion').subscribe((data) => {
      const opcion: botonesBarraHerramientas = 'VOID';
      if (data.opcion === 'GUARDAR') {
        this.storeService.accionGuardar(opcion);
      }
      if (data.opcion === 'CANCELAR') {
        this.storeService.accionCancelar(opcion);
        this.objBtn = new BarraHerramientaBoton();
      }
      if (data.opcion === 'IMPRIMIR') {
        this.accionImprimir(opcion);
      }
      if (data.opcion === 'PROCESAR') {
        this.accionProcesar(opcion);
      }
    });
  }

  accionNuevo(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'NUEVO';
    this.store.dispatch(setAccion({accion}));
    this.objBtn = new BarraHerramientaBoton(true);
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
  }

  /*  accionGuardar(accion: botonesBarraHerramientas) {
      accion = 'VOID';
      this.store.dispatch(setAccion({accion}));
      accion = 'GUARDAR';
      this.store.dispatch(setAccion({accion}));
      accion = 'VOID';
      this.store.dispatch(setAccion({accion}));
    }*/

  accionCancelar(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'CANCELAR';
    this.store.dispatch(setAccion({accion}));
    this.objBtn = new BarraHerramientaBoton();
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));

  }

  accionImprimir(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'IMPRIMIR';
    this.store.dispatch(setAccion({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
  }

  accionProcesar(accion: botonesBarraHerramientas) {
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}));
    accion = 'PROCESAR';
    this.store.dispatch(setAccion({accion}));
    accion = 'VOID';
    this.store.dispatch(setAccion({accion}))
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

}


export class BarraHerramientaBoton {
  verNuevo: boolean | undefined;
  verCancelar: boolean | undefined;
  verGuardar: boolean | undefined;
  verProcesar: boolean | undefined;
  reportePantalla: ReporteObjComponent;

  constructor(verNuevo?: boolean | undefined, verProcesar?: boolean | undefined, reportePantalla?: ReporteObjComponent) {
    this.verNuevo = verNuevo;
    if (this.verNuevo === true) {
      this.verCancelar = true;
      this.verGuardar = true;
      this.verNuevo = false;
    }
    if (this.verNuevo === undefined) {
      this.verCancelar = false;
      this.verGuardar = false;
      this.verNuevo = true;
    }
    if (verProcesar === true)
      this.verProcesar = verProcesar;
    else
      this.verProcesar = false

    this.reportePantalla = reportePantalla!;

  }
}
