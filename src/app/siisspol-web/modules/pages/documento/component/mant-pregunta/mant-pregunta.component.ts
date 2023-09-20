import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CatalogoDocumento} from "../../classes/dto/catalogoDocumento";
import {BarraHerramientaBoton} from "../../../../../shared/barra-herramientas/barra-herramientas.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../shared/redux/store/reducers/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {PreguntaService} from "../../services/pregunta.service";

@Component({
  selector: 'app-mant-pregunta',
  templateUrl: './mant-pregunta.component.html',
  styleUrls: ['./mant-pregunta.component.css']
})
export class MantPreguntaComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objPregunta: CatalogoDocumento | undefined;
  // @ts-ignore
  lstPregunta: CatalogoDocumento[];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();

  constructor(private svrPregunta: PreguntaService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(route)
  }

  public crearNuevoRegistro() {
    this.objPregunta = new CatalogoDocumento();
  }

  public async cargarGrid() {
    this.lstPregunta = await (this.svrPregunta.obtenerPreguntas()) as CatalogoDocumento[]
  }

  public editarRegistro(obj: CatalogoDocumento) {
    const data: CatalogoDocumento = new CatalogoDocumento(obj.nombre, obj.descripcion, obj.codigo, obj.idCatalogo, obj.estado)
    data.toBoolean();
    this.objPregunta = data;
    this.objBtn = new BarraHerramientaBoton(true, false);
  }

  public ventanaemergente(){

  }
  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarGrid();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.insertar(this.objPregunta);
      }
      if (data === 'CANCELAR') {
        this.objPregunta = undefined;
      }
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
    });
  }

  public async insertar(obj: CatalogoDocumento | undefined) {
    if (!obj)
      return
    const valorRegistado: CatalogoDocumento = await (this.svrPregunta.insertarPregunta(obj)) as CatalogoDocumento;
    if (valorRegistado) {
      this.objPregunta = undefined;
      this.cargarGrid();
      this.objBtn = new BarraHerramientaBoton();
    }
  }

}
