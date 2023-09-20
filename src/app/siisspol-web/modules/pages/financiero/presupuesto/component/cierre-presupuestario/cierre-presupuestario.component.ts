import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatalogoCierrePresupuestario} from "../../classes/dto/CatalogoCierrePresupuestario";
import {BarraHerramientaBoton} from "../../../../../../shared/barra-herramientas/barra-herramientas.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {ServicioCierrePresupuestario} from "../../services/servicio-cierre-presupuestario";
import {Subscription} from "rxjs";
import {ServicioUtil} from "../../services/servicio-util";
import {CatalogoInformacionUsuario} from "../../classes/CatalogoInformacionUsuario";

@Component({
  selector: 'app-cierre-presupuestario',
  templateUrl: './cierre-presupuestario.component.html',
  styleUrls: ['./cierre-presupuestario.component.css']
})
export class CierrePresupuestarioComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objCierrePresupuestario: CatalogoCierrePresupuestario | undefined;
  objUsuario: CatalogoInformacionUsuario | undefined;

  // @ts-ignore
  lstInformacionUsuario: CatalogoInformacionUsuario[] = [];
  lstCierrePresupuestario: CatalogoCierrePresupuestario[] = [];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  estadoRegistro: boolean = false;

  constructor(private svrCierrePresupuestario: ServicioCierrePresupuestario,
              private svrUtil: ServicioUtil,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Inicializar
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

  ngOnInit(): void {
    // barra de herramientas
    if (this.objSubscripcion) this.objSubscripcion.unsubscribe();

    // inicializar componente
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.registrar();
      }
      if (data === 'PROCESAR') {
        this.guardarListado();
      }
      if (data === 'CANCELAR') {
        this.objBtn = new BarraHerramientaBoton(undefined, this.lstCierrePresupuestario.length > 0);
        this.objCierrePresupuestario = undefined;
      }
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
    });

    // obtener información de usuarios
    this.InicializarComponentes();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Eventos
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  onKeypressEvent(event: any) {
    if (event.keyCode == 32) event.returnValue = false;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Métodos
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public async InicializarComponentes() {
    this.lstInformacionUsuario = await (this.svrUtil.obtenerInformacionUsuario()) as CatalogoInformacionUsuario[];
  }

  public editarRegistro(obj: CatalogoCierrePresupuestario) {
    obj.toBoolean();
    this.objCierrePresupuestario = obj;
    this.estadoRegistro = false;
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  public crearNuevoRegistro() {
    this.estadoRegistro = true;
    this.objCierrePresupuestario = new CatalogoCierrePresupuestario({});
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  public async registrar() {
    // verificar valores
    if (!this.objCierrePresupuestario) return;
    this.objCierrePresupuestario.convertirEstado();
    const valorRegistado: CatalogoCierrePresupuestario = await (this.svrCierrePresupuestario.validarIngresoCierrePresupuestario(this.objCierrePresupuestario)) as CatalogoCierrePresupuestario;
    if (valorRegistado) {

      // registrar
      if (this.estadoRegistro) {
        this.lstCierrePresupuestario.push(this.objCierrePresupuestario);
      }

      // notificar
      this.objCierrePresupuestario = undefined;
      this.objBtn = new BarraHerramientaBoton(undefined, this.lstCierrePresupuestario.length > 0);
    }
  }

  public async guardarListado() {
    if (!this.objUsuario) return;
    if (this.lstCierrePresupuestario.length === 0) return;

    const valorRegistado: CatalogoCierrePresupuestario = await (this.svrCierrePresupuestario.registrarCierrePresupuestario(this.objUsuario, this.lstCierrePresupuestario)) as CatalogoCierrePresupuestario;
    if (valorRegistado) {
      this.lstCierrePresupuestario = [];
      this.objBtn = new BarraHerramientaBoton();
    }
  }

}

