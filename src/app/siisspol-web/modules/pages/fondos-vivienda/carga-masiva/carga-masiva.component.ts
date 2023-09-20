import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../system/services/system/execute-call-procedure.service";
import {CargaMasivaService} from "../services/carga-masiva.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/redux/store/reducers/app.reducer";
import {Subscription} from "rxjs";
import {MigracionFondos} from "../classes/dto/migracion-fondos";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {BarraHerramientaBoton} from "../../../../shared/barra-herramientas/barra-herramientas.component";
import {RemoteCargaMasivaService} from "../services/remote-carga-masiva.service";
import {AporteFondos} from "../classes/dto/aporte-fondos";
import {ordenDesendenteInt} from "../../../system/funcions/lista.utils";
import {ReporteCargaMasiva} from "../classes/reporte-carga-masiva";

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css'],
  providers: [RemoteCargaMasivaService]
})
export class CargaMasivaComponent implements OnInit, OnDestroy, AfterViewInit {
  lstMigracionfv: MigracionFondos[] = [];
  objMigracion: MigracionFondos | undefined;
  objCabecera: MigracionFondos | undefined;
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined,undefined,new ReporteCargaMasiva());
  presentarPrincipal: boolean = true;

  lstAporteInfofv: AporteFondos[] = [];

  constructor(private remote: RemoteCargaMasivaService, private intSvr: ExecuteCallProcedureService, private toastr: ToastrService, private svrTrsnslate: TranslateService,
              private srvAporteFV: CargaMasivaService, private route: ActivatedRoute, public dialog: MatDialog, private store: Store<AppState>) {
    this.intSvr.setActiveRoute(route)
    //this.intSvr.setWithOutSeccion()
  }


  ngOnInit(): void {

    if (this.objSubscripcion)
      this.objSubscripcion.unsubscribe();
    this.cargarMigracion();

    //this.objBtn = new BarraHerramientaBoton(true);
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.objBtn.verGuardar = false;
      }
      if (data === 'CANCELAR') {
        this.presentarPrincipal = true;
        this.objMigracion = undefined;
        this.objBtn = new BarraHerramientaBoton(false);
        this.cargarMigracion()
      }
    });

  }

  public async crearNuevo(obj: MigracionFondos) {
    this.presentarPrincipal = false;
    this.objCabecera = obj;
    this.objMigracion = await this.srvAporteFV.obtenerTotalesAportes(obj.grupo);
    if (!this.objMigracion) {
      this.toastr.info(this.svrTrsnslate.instant('siisspolweb.loading.prestacion.msg.aportes.fondos.detalle'), this.svrTrsnslate.instant('siisspolweb.loading.prestacion.msg.aportes.fondos.titulo'));
      this.objBtn = new BarraHerramientaBoton(false);
    } else {
      this.objBtn = new BarraHerramientaBoton(true, false);
    }

  }

  public async editarRegistro(obj: MigracionFondos) {
    this.presentarPrincipal = false;
    this.objCabecera = obj;
    this.objMigracion = await this.srvAporteFV.obtenerTotalesAportesReg(obj.grupo);
    //this.lstAporteInfofv = await this.srvAporteFV.obtenerAportesInfoFondosReg();
    console.log(this.lstAporteInfofv);
    if (!this.objMigracion) {
      this.toastr.info(this.svrTrsnslate.instant('siisspolweb.loading.prestacion.msg.aportes.fondos.detalle.edit'), this.svrTrsnslate.instant('siisspolweb.loading.prestacion.msg.aportes.fondos.titulo'));
      this.objBtn = new BarraHerramientaBoton(false);
    } else {
      this.objBtn = new BarraHerramientaBoton(true, false);
      this.objBtn.verGuardar = false;
    }


  }

  public async eliminarInforacionLista() {
    this.objMigracion = undefined;
    this.lstMigracionfv = new Array();
    const data: MigracionFondos = await this.srvAporteFV.obtenerTotalesAportesRegistrados();
    this.objCabecera = data;
  }


  public async cargarMigracion() {
    this.objMigracion = undefined;
    const lstMgfv: MigracionFondos[] = await this.srvAporteFV.obtenerMigracionFondos();
    this.lstMigracionfv = ordenDesendenteInt(lstMgfv, 'asiento, fechaliq');
    const data: MigracionFondos = await this.srvAporteFV.obtenerTotalesAportesRegistrados();
    this.objCabecera = data;
    //console.log(this.lstMigracionfv);
  }

  ngOnDestroy(): void {
    if (this.objSubscripcion)
      this.objSubscripcion.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.objBtn = new BarraHerramientaBoton(false,undefined,new ReporteCargaMasiva());
  }

  setearValorLista($event: MigracionFondos[]) {
    this.lstMigracionfv = $event;
  }
}
