import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatalogoDocumento} from "../../classes/dto/catalogoDocumento";
import {BarraHerramientaBoton} from "../../../../../shared/barra-herramientas/barra-herramientas.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {ServicioTipoDelito} from "../../services/servicio-tipo-delito";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tipo-delito',
  templateUrl: './tipo-delito.component.html',
  styleUrls: ['./tipo-delito.component.css']
})
export class TipoDelitoComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objTipoDelito: CatalogoDocumento | undefined;

  // @ts-ignore
  lstTipoDelito: CatalogoDocumento[];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();

  constructor(private svrTipoDelito: ServicioTipoDelito,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route)
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarGrid();
    if (this.objSubscripcion)
      this.objSubscripcion.unsubscribe();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.insertar(this.objTipoDelito);
      }
      if (data === 'CANCELAR') {
        this.objTipoDelito = undefined;
      }
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
    });
  }

  public editarRegistro(obj: CatalogoDocumento) {
    const data: CatalogoDocumento = new CatalogoDocumento(obj.nombre, obj.descripcion, obj.codigo, obj.idCatalogo, obj.estado)
    data.toBoolean();
    this.objTipoDelito = data;
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  public crearNuevoRegistro() {
    this.objTipoDelito = new CatalogoDocumento();
  }

  public async cargarGrid() {
    this.lstTipoDelito = await (this.svrTipoDelito.obtenerTipoDelito()) as CatalogoDocumento[]
  }

  public async insertar(obj: CatalogoDocumento | undefined) {
    if(!obj)
      return
    const valorRegistado: CatalogoDocumento = await (this.svrTipoDelito.insertarTipoDelito(obj)) as CatalogoDocumento;
    if (valorRegistado) {
      this.objTipoDelito = undefined;
      this.cargarGrid();
      this.objBtn = new BarraHerramientaBoton();
    }
  }
}
