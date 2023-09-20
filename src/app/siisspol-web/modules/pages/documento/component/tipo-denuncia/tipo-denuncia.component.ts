import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicioTipoDenuncia} from "../../services/servicio-tipo-denuncia";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../shared/redux/store/reducers/app.reducer";
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {ActivatedRoute} from "@angular/router";
import {CatalogoDocumento} from "../../classes/dto/catalogoDocumento";
import {BarraHerramientaBoton} from "../../../../../shared/barra-herramientas/barra-herramientas.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tipo-denuncia',
  templateUrl: './tipo-denuncia.component.html',
  styleUrls: ['./tipo-denuncia.component.css']
})
export class TipoDenunciaComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  objTipoDenuncia: CatalogoDocumento | undefined;
  // @ts-ignore
  lstTipoDenuncia: CatalogoDocumento[];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();

  constructor(private svrTipoDenuncia: ServicioTipoDenuncia,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route)
  }

  ngOnInit(): void {
    if (this.objSubscripcion)
      this.objSubscripcion.unsubscribe();
    this.cargarGrid();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.insertar(this.objTipoDenuncia);
      }
      if (data === 'CANCELAR') {
        this.objTipoDenuncia = undefined;
      }
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
    });
  }

  public crearNuevoRegistro() {
    this.objTipoDenuncia = new CatalogoDocumento();
  }

  public async cargarGrid() {
    this.lstTipoDenuncia = await (this.svrTipoDenuncia.obtenerTipoDenuncia()) as CatalogoDocumento[]
  }


  public editarRegistro(obj: CatalogoDocumento) {
    const data: CatalogoDocumento = new CatalogoDocumento(obj.nombre, obj.descripcion, obj.codigo, obj.idCatalogo, obj.estado)
    data.toBoolean();
    this.objTipoDenuncia = data;
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

  public async insertar(obj: CatalogoDocumento | undefined) {
    if (!obj)
      return
    const valorRegistado: CatalogoDocumento = await (this.svrTipoDenuncia.insertarTipoDenuncia(obj)) as CatalogoDocumento;
    if (valorRegistado) {
      this.objTipoDenuncia = undefined;
      this.cargarGrid();
      this.objBtn = new BarraHerramientaBoton();
    }
  }

}
