import {Component, OnInit} from '@angular/core';
import {BarraHerramientaBoton} from '../../../../../shared/barra-herramientas/barra-herramientas.component';
import {PermisoPagoPrestacionesService} from '../../../comun/services/permiso-pago-prestaciones.service';
import {
  PaginadoPermisoAnticipo,
  PermisoPagoContabilidadPersistencia
} from '../../../comun/classes/PaginadoPermisoAnticipo';
import {ExecuteCallProcedureService} from '../../../../system/services/system/execute-call-procedure.service';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../shared/redux/store/reducers/app.reducer';
import {Subscription} from 'rxjs';
import {TramiteInstanciaService} from '../../../comun/services/tramite-instancia.service';
import {CbxInstanciaTarea} from '../../../comun/classes/Tramite';
import {ListaPmsComponent} from '../../modal/lista-pms/lista-pms.component';
import {MatDialog} from '@angular/material/dialog';
import {convertirLista} from '../../../../system/funcions/lista.utils';
import {botonesBarraHerramientas} from '../../../../../shared/redux/types';
import {toBit} from '../../../../system/funcions/texto.utils';

@Component({
  selector: 'app-permiso-pago-anticipos',
  templateUrl: './permiso-pago-anticipos.component.html',
  styleUrls: ['./permiso-pago-anticipos.component.css']
})
export class PermisoPagoAnticiposComponent implements OnInit {
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  lstTramiteCpag: CbxInstanciaTarea[] | undefined;
  lstPermisoAnticipo: PaginadoPermisoAnticipo[] = [];
  objPermisoAnticipo: PermisoPagoContabilidadPersistencia | undefined;
  cpag: any;

  constructor(private anticipoService: PermisoPagoPrestacionesService,
              private store: Store<AppState>,
              public dialog: MatDialog,
              private tramite: TramiteInstanciaService,
              private intSvr: ExecuteCallProcedureService, private route: ActivatedRoute) {
  }

  public crearNuevoRegistro() {
    this.objPermisoAnticipo = new PermisoPagoContabilidadPersistencia(null, undefined, undefined);
  }


  public editarRegistro(objBase: PaginadoPermisoAnticipo) {
    this.objBtn = new BarraHerramientaBoton(true, true);
    this.objPermisoAnticipo = new PermisoPagoContabilidadPersistencia(objBase.idPermisoPagoContabilidad, objBase.idInstancia, objBase.anio, objBase.codigo, objBase.codigosPms, "", objBase.anioAds);
    this.objPermisoAnticipo.codigoCpag = objBase.ticket
  }

  public openDialog() {
    let id = 0;
    // @ts-ignore
    id = this.objPermisoAnticipo.idInstancia;
    const dialogRef = this.dialog.open(ListaPmsComponent, {
      data: {nombre: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      // @ts-ignore
      this.objPermisoAnticipo.codigoPms = convertirLista(result, 'codigoAsiento');
    });
  }


  public async seleccionarItem(data: any) {
  }

  public async guardar(persis: PermisoPagoContabilidadPersistencia | undefined, esProcesado?: boolean | undefined) {
    if (!persis) {
      return;
    }
    // @ts-ignore
    this.objPermisoAnticipo.idInstancia = this.cpag;
    // @ts-ignore
    this.objPermisoAnticipo.esProcesado = toBit(esProcesado);
    const objBase: PermisoPagoContabilidadPersistencia = (await this.anticipoService.regsitrarPermisoPagoCpag(this.objPermisoAnticipo)) as PermisoPagoContabilidadPersistencia;
    if (objBase) {
      this.iniciarPaginacion();
      this.objBtn = new BarraHerramientaBoton();
      this.objPermisoAnticipo = undefined;
      this.cpag = undefined;
    }
  }

  private procesarPagoCierreCXP() {
    this.guardar(this.objPermisoAnticipo, true);
  }

  ngOnInit(): void {
    this.intSvr.setActiveRoute(this.route);
    this.iniciarPaginacion();
    this.cargarListaCpag();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data: botonesBarraHerramientas) => {
      if (data === 'GUARDAR') {
        this.guardar(this.objPermisoAnticipo);
      }
      if (data === 'CANCELAR') {
        this.objPermisoAnticipo = undefined;
        this.cpag = undefined;
      }
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
      if (data === 'PROCESAR') {
        this.procesarPagoCierreCXP();
      }
    });
  }

  async cargarListaCpag() {
    this.lstTramiteCpag = await (this.tramite.obtnerListaIntanciaCpag()) as CbxInstanciaTarea[];
  }

  async iniciarPaginacion() {
    this.lstPermisoAnticipo = await (this.anticipoService.obtnerTodosPermisosAnticipo()) as PaginadoPermisoAnticipo[];

  }

}
