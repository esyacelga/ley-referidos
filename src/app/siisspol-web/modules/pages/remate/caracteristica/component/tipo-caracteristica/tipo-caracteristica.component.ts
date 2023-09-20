import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarraHerramientaBoton } from 'src/app/siisspol-web/shared/barra-herramientas/barra-herramientas.component';
import { TipoCaracteristica } from '../../classes/dto/tipo-caracteristica';
import { TipoCaracteristicaService } from '../../services/tipo-caracteristica.service';
import { Catalogo } from '../../../remate/classes/dto/Catalogo';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/siisspol-web/shared/redux/store/reducers/app.reducer';

@Component({
  selector: 'app-tipo-caracteristica',
  templateUrl: './tipo-caracteristica.component.html',
  styleUrls: ['./tipo-caracteristica.component.css']
})
export class TipoCaracteristicaComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  objBtnTipoCaracteristica: BarraHerramientaBoton = new BarraHerramientaBoton();
  objTipoCaracteristica: TipoCaracteristica | undefined;
  lstTipoCaracteristica: TipoCaracteristica[] = [];
  lstCatalogo: Catalogo[] = [];
  lstCatalogoCaracteristica: Catalogo[] = [];
  CALENDER_CONFIG_EN: any;

  constructor(private svrTipoCaracteristica: TipoCaracteristicaService,
    private store: Store<AppState>) { }

  async iniciar() {
    this.lstTipoCaracteristica = await (this.svrTipoCaracteristica.obtnerListaTipoCaracteristica()) as TipoCaracteristica[];
    this.lstCatalogo = await (this.svrTipoCaracteristica.obtnerListaCatalogo()) as Catalogo[];
    this.lstCatalogoCaracteristica = await (this.svrTipoCaracteristica.obtnerListaCatalogoCaracteristica()) as Catalogo[];

  }

  public crearNuevoRegistro() {
    this.objTipoCaracteristica = new TipoCaracteristica(undefined, undefined, undefined, false, false,);
  }

  public async guardar(obj: TipoCaracteristica | undefined) {
    if (!obj) {
      return;
    }
    let tipoCaracteristica: TipoCaracteristica = new TipoCaracteristica(obj.idRemateTipoCaracteristica,obj.codValorBien,obj.codValorCaracteristica,obj.estado, obj.elimina);
    tipoCaracteristica = await (this.svrTipoCaracteristica.registrarTipoCaracteristica(tipoCaracteristica));
    if (tipoCaracteristica) {
      this.iniciar();
      this.objBtnTipoCaracteristica = new BarraHerramientaBoton();
      this.objTipoCaracteristica = undefined;
    }
  }

  public editarRegistro(objBtn: TipoCaracteristica | undefined) {
    this.objBtnTipoCaracteristica = new BarraHerramientaBoton(true, false);
    this.objTipoCaracteristica = objBtn;  
  }

  public async eliminarRegistro(obj: TipoCaracteristica | undefined, eliminado: boolean) {
    if (!obj) {
      return;
    }
    let tipoCaracteristica: TipoCaracteristica = new TipoCaracteristica(obj.idRemateTipoCaracteristica,obj.tipoBien,obj.tipoCaracteristica,obj.estado, eliminado);
    tipoCaracteristica = await (this.svrTipoCaracteristica.registrarTipoCaracteristica(tipoCaracteristica));
    this.iniciar();
  }

  ngOnInit(): void {
    this.iniciar();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
      if (data === 'CANCELAR') {
        this.objTipoCaracteristica = undefined;
      }
      if (data === 'GUARDAR') {
        this.guardar(this.objTipoCaracteristica);
      }

    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
    this.objBtnTipoCaracteristica = new BarraHerramientaBoton();
  }

}
