import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MigracionFondos} from "../classes/dto/migracion-fondos";
import {CargaMasivaService} from "../services/carga-masiva.service";
import {AporteFondos} from "../classes/dto/aporte-fondos";
import {TranslateService} from "@ngx-translate/core";
import {RemoteCargaMasivaService} from "../services/remote-carga-masiva.service";
import {Subscription} from "rxjs";
import {BarraHerramientaBoton} from "../../../../shared/barra-herramientas/barra-herramientas.component";
import {ToastrService} from "ngx-toastr";
import {DetalleAporte} from "../classes/dto/detalle-aporte";
import {MatDialog} from '@angular/material/dialog';
import {IsspolDialogObject} from "../../../../shared/confirmacion-modal/classes/isspol-dialog-object";
import {DetalleAporteComponent} from "../detalle-aporte/detalle-aporte.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/redux/store/reducers/app.reducer";

@Component({
  selector: 'app-carga-masiva-edicion',
  templateUrl: './carga-masiva-edicion.component.html',
  styleUrls: ['./carga-masiva-edicion.component.css'],
  providers: [RemoteCargaMasivaService]
})
export class CargaMasivaEdicionComponent implements OnInit, OnDestroy {

  @Input("migracionFondos") objMigracion: MigracionFondos = new MigracionFondos();
  @Input("lstmigracionFondos") lstMigracion: MigracionFondos[] = [];
  @Output("objMigra") objMigra: EventEmitter<MigracionFondos> = new EventEmitter()
  @Output("lstMigra") lstMigra: EventEmitter<MigracionFondos[]> = new EventEmitter()

  private subs: Subscription = new Subscription();
  lstMigracionfv: MigracionFondos[] = [];
  lstAportefv: AporteFondos[] = [];
  lstAporteInfofv: AporteFondos[] = [];
  lstDetalleAp: DetalleAporte[] = [];
  nuevo: boolean | undefined;
  private objSubscripcion: Subscription | undefined;
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton(undefined, undefined);

  constructor(private srvAporteFV: CargaMasivaService,
              private svrTrsnslate: TranslateService,
              private remoto: RemoteCargaMasivaService,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private store: Store<AppState>
  ) {
    if (this.objMigracion.estado == "0") {
      this.nuevo = true;
    } else {
      this.nuevo = false;
    }
  }


  ngOnInit(): void {
    this.cargarGrid();
    this.subs = this.remoto.ejecutarMetodoHijo$.subscribe(() => {
      this.insertar(this.objMigracion);
    })
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.insertar(this.objMigracion);
      }
    });
  }

  public async cargarGrid() {
    this.lstAportefv = await this.srvAporteFV.obtenerAportesFondos();
    this.lstAporteInfofv = await this.srvAporteFV.obtenerAportesInfoFondos(this.objMigracion.grupo);
    if (this.lstAporteInfofv == null) {
      this.lstAporteInfofv = await this.srvAporteFV.obtenerAportesInfoFondosReg(this.objMigracion.grupo);
    }
  }


  public async insertar(obj: MigracionFondos | undefined) {
    if (!obj)
      return
    const valorRegistado: MigracionFondos = await (this.srvAporteFV.registrarCabecera(obj)) as MigracionFondos;
    this.lstMigracionfv = await this.srvAporteFV.obtenerMigracionFondos();
    //this.objMigracion = await this.srvAporteFV.obtenerTotalesAportesRegistrados();
    this.lstMigra.emit(this.lstMigracionfv);
  }


  public async detalleAportes(obj: DetalleAporte) {
    this.lstDetalleAp = await this.srvAporteFV.obtenerDetalleAportes(obj.cedula!);
    const dialog: IsspolDialogObject = new IsspolDialogObject(this.lstDetalleAp);
    dialog.width='1200px';
    const dialogRef = this.dialog.open(DetalleAporteComponent, dialog);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy(): void {
    this.objMigracion = new MigracionFondos();
    this.subs.unsubscribe();
  }
}
