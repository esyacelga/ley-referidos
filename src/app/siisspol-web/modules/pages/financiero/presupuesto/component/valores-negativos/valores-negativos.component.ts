import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatalogoValorNegativo} from "../../classes/dto/CatalogoValorNegativo";
import {BarraHerramientaBoton} from "../../../../../../shared/barra-herramientas/barra-herramientas.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../../system/services/system/execute-call-procedure.service";
import {ServicioValoresNegativos} from "../../services/servicio-valores-negativos";
import {Subscription} from "rxjs";
import {ServicioUtil} from "../../services/servicio-util";
import {CatalogoInformacionUsuario} from "../../classes/CatalogoInformacionUsuario";

@Component({
  selector: 'app-valores-negativos',
  templateUrl: './valores-negativos.component.html',
  styleUrls: ['./valores-negativos.component.css']
})
export class ValoresNegativosComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objValorNegativo: CatalogoValorNegativo | undefined;
  objUsuario: CatalogoInformacionUsuario | undefined;

  // @ts-ignore
  lstInformacionUsuario: CatalogoInformacionUsuario[] = [];
  lstValoresNegativos: CatalogoValorNegativo[] = [];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  estadoRegistro: boolean = false;

  constructor(private svrValoresNegativos: ServicioValoresNegativos,
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
        this.objBtn = new BarraHerramientaBoton(undefined, this.lstValoresNegativos.length > 0);
        this.objValorNegativo = undefined;
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

  public editarRegistro(obj: CatalogoValorNegativo) {
    obj.toBoolean();
    this.objValorNegativo = obj;
    this.estadoRegistro = false;
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  public crearNuevoRegistro() {
    this.estadoRegistro = true;
    this.objValorNegativo = new CatalogoValorNegativo({});
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  public async registrar() {
    // verificar valores
    if (!this.objValorNegativo) return;
    this.objValorNegativo.convertirEstado();
    const valorRegistado: CatalogoValorNegativo = await (this.svrValoresNegativos.validarIngresoValoresNegativos(this.objValorNegativo)) as CatalogoValorNegativo;
    if (valorRegistado) {

      // registrar
      if (this.estadoRegistro) {
        this.lstValoresNegativos.push(this.objValorNegativo);
      }

      // notificar
      this.objValorNegativo = undefined;
      this.objBtn = new BarraHerramientaBoton(undefined, this.lstValoresNegativos.length > 0);
    }
  }

  public async guardarListado() {
    if (!this.objUsuario) return;
    if (this.lstValoresNegativos.length === 0) return;

    const valorRegistado: CatalogoValorNegativo = await (this.svrValoresNegativos.registrarValoresNegativos(this.objUsuario, this.lstValoresNegativos)) as CatalogoValorNegativo;
    if (valorRegistado) {
      this.lstValoresNegativos = [];
      this.objBtn = new BarraHerramientaBoton();
    }
  }

}

