import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarraHerramientaBoton } from 'src/app/siisspol-web/shared/barra-herramientas/barra-herramientas.component';
import { Caracteristica } from '../../classes/dto/caracteristica';
import { CaracteristicaService } from '../../services/caracteristica.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/siisspol-web/shared/redux/store/reducers/app.reducer';
import { RemateModalComponent } from '../../modal/remate-modal/remate-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Remate } from '../../../remate/classes/dto/Remate';
import { TipoCaracteristica } from '../../classes/dto/tipo-caracteristica';
import { TipoCaracteristicaModalComponent } from '../../modal/tipo-caracteristica-modal/tipo-caracteristica-modal.component';
import { TipoCaracteristicaService } from '../../services/tipo-caracteristica.service';
import { IsspolDialogObject } from 'src/app/siisspol-web/shared/confirmacion-modal/classes/isspol-dialog-object';

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styleUrls: ['./caracteristica.component.css']
})
export class CaracteristicaComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  objBtnCaracteristica: BarraHerramientaBoton = new BarraHerramientaBoton();
  objCaracteristica: Caracteristica | undefined;
  objTipoCaracteristica: TipoCaracteristica | undefined;
  objRemate: Remate | undefined;
  numeroJucio: string | undefined;
  descripcionBien: string | undefined;
  tipoBien: string | undefined;
  tipoCaracteristica: string | undefined;
  lstCaracteristica: Caracteristica[] = [];
  CALENDER_CONFIG_EN: any;
  lstTipoCaracteristica: TipoCaracteristica[] = [];

  constructor(private svrCaracteristica: CaracteristicaService,
    private svrTipoCaracteristica: TipoCaracteristicaService,
    private store: Store<AppState>,
    public dialog: MatDialog) { }

  async iniciar() {
    this.lstCaracteristica = await (this.svrCaracteristica.obtnerListaCaracteristica()) as Caracteristica[];

  }

  public crearNuevoRegistro() {
    this.objCaracteristica = new Caracteristica(undefined, undefined, undefined, false, false);
  }

  public openDialog() {
    let id = 0;
    const configuracion: IsspolDialogObject = new IsspolDialogObject({});
    configuracion.width = '90%'
    const dialogRef = this.dialog.open(RemateModalComponent, configuracion);
    dialogRef.afterClosed().subscribe(async result => {
      // @ts-ignore
      this.objRemate = result;
      this.numeroJucio = this.objRemate?.numeroJucio;
      this.tipoBien = this.objRemate?.tipoBien;
      this.descripcionBien = this.objRemate?.descripcionBien;
      this.lstTipoCaracteristica = await (this.svrTipoCaracteristica.obtnerListaTipoCaracteristicaModal(this.objRemate?.codValorBien)) as TipoCaracteristica[];
      this.objTipoCaracteristica = undefined;
      this.tipoCaracteristica = undefined;
    });
  }

  public openDialogTipo() {

    const dialogRef = this.dialog.open(TipoCaracteristicaModalComponent, {
      data: { codValorBien: this.objRemate?.codValorBien }
    });
    dialogRef.afterClosed().subscribe(result => {
      // @ts-ignore
      this.objTipoCaracteristica = result;
      this.tipoCaracteristica = this.objTipoCaracteristica?.tipoCaracteristica
    });
  }

  public limpiar() {
    this.objRemate = undefined;
    this.numeroJucio = undefined;
    this.objCaracteristica = undefined;
    this.tipoBien = undefined;
    this.descripcionBien = undefined;
    this.objTipoCaracteristica = undefined;
    this.tipoCaracteristica = undefined;
  }

  ngOnInit(): void {
    this.iniciar();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
      if (data === 'CANCELAR') {
        this.limpiar();
      }

      if (data === 'GUARDAR') {
        this.guardar(this.objCaracteristica);
      }

    });
  }

  public async guardar(objCaracteristica: Caracteristica | undefined) {
    if (!objCaracteristica) {
      return;
    }
    let caracteristica: Caracteristica = new Caracteristica(this.objRemate?.idRemate, this.objTipoCaracteristica?.idRemateTipoCaracteristica,
      objCaracteristica.descripcion, objCaracteristica.estado, false,this.lstTipoCaracteristica);
    caracteristica = await (this.svrCaracteristica.registrarCaracteristica(caracteristica));
    if (caracteristica) {
      this.iniciar();
      this.objBtnCaracteristica = new BarraHerramientaBoton();
      this.limpiar();
    }
  }

  public async eliminarRegistro(objCaracteristica: Caracteristica | undefined, eliminado: boolean) {
    if (!objCaracteristica) {
      return;
    }
    let caracteristica: Caracteristica = new Caracteristica(objCaracteristica?.idRemate, objCaracteristica?.idRemateTipoCaracteristica,
      objCaracteristica.descripcion, objCaracteristica.estado, eliminado);
    caracteristica = await (this.svrCaracteristica.registrarCaracteristica(caracteristica));
    this.iniciar();
  }


  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
    this.objBtnCaracteristica = new BarraHerramientaBoton();
    this.limpiar();
  }

}
