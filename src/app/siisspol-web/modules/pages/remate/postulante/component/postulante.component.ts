import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { obtenerListarObjetoPorCampo } from 'src/app/siisspol-web/modules/system/funcions/lista.utils';
import { BarraHerramientaBoton } from 'src/app/siisspol-web/shared/barra-herramientas/barra-herramientas.component';
import { AppState } from 'src/app/siisspol-web/shared/redux/store/reducers/app.reducer';
import { RemateModalComponent } from '../../caracteristica/modal/remate-modal/remate-modal.component';
import { Catalogo } from '../../remate/classes/dto/Catalogo';
import { Remate } from '../../remate/classes/dto/Remate';
import { UbicacionGeografica } from '../../remate/classes/dto/UbicacionGeografica';
import { RemateService } from '../../remate/services/remate.service';
import { Postulante } from '../classes/dto/postulante';
import { PostulanteService } from '../service/postulante.service';
import { ToastrService } from 'ngx-toastr';
import { Requisito } from '../classes/dto/requisito';
import { IsspolDialogObject } from 'src/app/siisspol-web/shared/confirmacion-modal/classes/isspol-dialog-object';
import * as _ from 'underscore';
import { PerstConfigFlow } from '../../../comun/classes/perst-config-flow';
import { UbicacionGeograficaComponent } from '../../remate/modal/ubicacion-geografica/ubicacion-geografica.component';
import { ExecuteCallProcedureService } from 'src/app/siisspol-web/modules/system/services/system/execute-call-procedure.service';
import { ActivatedRoute } from '@angular/router';
import { Imagen } from 'src/app/siisspol-web/modules/system/classes/Imagen';
import { UploadService } from 'src/app/siisspol-web/modules/system/services/system/upload.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { RematePostulanteAdjunto } from '../classes/dto/remate-postulante-adjunto';

@Component({
  selector: 'app-postulante',
  templateUrl: './postulante.component.html',
  styleUrls: ['./postulante.component.css']
})
export class PostulanteComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  objBtnPostulante: BarraHerramientaBoton;
  CALENDER_CONFIG_EN: any;
  objPostulante: Postulante | undefined;
  lstPostulante: Postulante[] = [];
  lstPostulantePersona: Postulante[] = [];
  lstCatalogo: Catalogo[] = [];
  lstRequisitos: Requisito[] = [];
  lstCatalogoRequerimiento: Requisito[] = [];
  lstCatalogoRequerimientoJ: Requisito[] = [];
  lstCatalogoRequerimientoN: Requisito[] = [];
  lstCatalogoRequerimientoFiltrado: Catalogo[] = [];
  lstCatalogoTipoIdentificacion: Catalogo[] = [];
  lstCatalogoGenero: Catalogo[] = [];
  lstCatalogoTipoCliente: Catalogo[] = [];
  objRemate: Remate | undefined;
  lstUbicacion: UbicacionGeografica[] = [];
  numeroJucio: string | undefined;
  descripcionBien: string | undefined;
  tipoBien: string | undefined;
  objUbicacion: UbicacionGeografica | undefined;
  descripcionUbicacion: string | undefined;
  tipoUsuario: string | undefined;
  idPersona: number | undefined;
  habilitaBtnCanGua: boolean = false;
  esEditar: boolean = false;
  nombreArchivoComprobante: string = 'Seleccionar';
  imagenAdjuntoComprobante: Imagen | undefined;
  private lstAdjuntoDto: RematePostulanteAdjunto[] = [];

  constructor(private svrPostulante: PostulanteService, private svrRemate: RemateService, private svrTrsnslate: TranslateService,
    private store: Store<AppState>, public dialog: MatDialog, private route: ActivatedRoute, private svrUpload: UploadService,
    private toastr: ToastrService, private intSvr: ExecuteCallProcedureService) { 
      this.intSvr.setActiveRoute(route);
      this.tipoUsuario = this.intSvr.getTipoUsuario();
      this.idPersona = this.intSvr.getIdPersona();
      this.objBtnPostulante = new BarraHerramientaBoton();
    }

  async iniciar() {
    this.lstPostulante = await (this.svrPostulante.obtnerListaPostulante(this.idPersona!,this.tipoUsuario!)) as Postulante[];
    this.lstCatalogo = await (this.svrPostulante.obtnerListaCatalogo()) as Catalogo[];
    this.lstRequisitos = await (this.svrPostulante.obtnerListaRemateRequisitos()) as Requisito[];
    this.lstUbicacion = await (this.svrRemate.obtenerListaUbicacion()) as UbicacionGeografica[];
    this.lstCatalogoTipoIdentificacion = obtenerListarObjetoPorCampo(this.lstCatalogo, 'grupoCodigo', 'TI') as Catalogo[];
    this.lstCatalogoTipoCliente = obtenerListarObjetoPorCampo(this.lstCatalogo, 'grupoCodigo', 'TCL') as Catalogo[];
    this.lstCatalogoGenero = obtenerListarObjetoPorCampo(this.lstCatalogo, 'grupoCodigo', '9') as Catalogo[];
    this.lstCatalogoRequerimientoJ = obtenerListarObjetoPorCampo(this.lstRequisitos, 'juridico', true) as Requisito[];
    this.lstCatalogoRequerimientoN = obtenerListarObjetoPorCampo(this.lstRequisitos, 'natural', true) as Requisito[];

  }
  public crearNuevoRegistro() {
    this.objPostulante = new Postulante(undefined, undefined, undefined, undefined, 0, false, undefined, false, false,
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false);
  }

  public openDialog() {
    let id = 0;
    const configuracion: IsspolDialogObject = new IsspolDialogObject({});
    configuracion.width = '90%'
    const dialogRef = this.dialog.open(RemateModalComponent, configuracion);
    dialogRef.afterClosed().subscribe(result => {
      // @ts-ignore
      this.objRemate = result;
      this.numeroJucio = this.objRemate?.numeroJucio;
      this.tipoBien = this.objRemate?.tipoBien;
      this.descripcionBien = this.objRemate?.descripcionBien;
    });
  }

  public openDialogUbicacion() {
    let id = 0;
    const modalUbicacion: IsspolDialogObject = new IsspolDialogObject({});
    const dialogRef = this.dialog.open(UbicacionGeograficaComponent, modalUbicacion);
    dialogRef.afterClosed().subscribe(result => {
      // @ts-ignore
      this.objUbicacion = result;
      //this.objPostulante!.desUbicacion = this.objUbicacion?.descripcion
      this.descripcionUbicacion = this.objUbicacion?.descripcion;
      this.objPostulante!.idUbicacionGeografica = this.objUbicacion?.idUbicacion
    });
  }

  public obtenerListaRequ(idTipoCliente: number | undefined, esEdicion: boolean) {
    this.lstCatalogoRequerimiento = [];
    _.forEach(this.lstCatalogoRequerimientoJ, function (requisito) {
      requisito.seleccionado = esEdicion;})
    _.forEach(this.lstCatalogoRequerimientoN, function (requisito) {
      requisito.seleccionado = esEdicion;})  
    if (idTipoCliente?.toString() === '0') {
      this.lstCatalogoRequerimiento = this.lstCatalogoRequerimientoJ
    } else {
      this.lstCatalogoRequerimiento = this.lstCatalogoRequerimientoN
    }
  }

  async obtenerPersonaPorIdentificacion(identificacion: string | undefined) {
    this.lstPostulantePersona = await (this.svrPostulante.obtnerPersona(identificacion)) as Postulante[];
    if (this.lstPostulantePersona) {
      this.esEditar = this.objPostulante!.esEditar
      this.objPostulante = this.lstPostulantePersona[0];
      this.objPostulante!.esEditar = this.esEditar;
      this.objPostulante.fechaNacimiento = new Date(this.objPostulante.fechaString!);
      this.objPostulante.valorOfertado = 0;
      if (this.objPostulante.idTipoCliente) {
        this.obtenerListaRequ(this.objPostulante.idTipoCliente, false);
      }
    } else {
      this.crearNuevoRegistro();
      if (this.objPostulante) {
        this.objPostulante.identificacion = identificacion;
      }
    }

  }

  public async guardar(objPostulante: Postulante | undefined) {
    if (!objPostulante) {
      return;
    }

    if(objPostulante?.valorOfertado!> 0 && this.tipoUsuario == 'usuario-postulante'){
      if(this.nombreArchivoComprobante === 'Seleccionar' || objPostulante.comprobanteDeposito === undefined){
        this.toastr.error('Advertencia', this.svrTrsnslate.instant('siisspolweb.loading.remate.postulante.msmComprobanteDeposito'));
        return;
      }
    }
    //Validar requisitos
    if(this.lstCatalogoRequerimiento){
      this.lstCatalogoRequerimientoFiltrado = obtenerListarObjetoPorCampo(this.lstCatalogoRequerimiento, 'seleccionado', false) as Catalogo[];
      if(this.lstCatalogoRequerimientoFiltrado.length>0){
        this.toastr.error('Advertencia', this.svrTrsnslate.instant('siisspolweb.loading.remate.postulante.listaRequisito'));
        return;
      }
    }

    let postulanteGurdar: Postulante = new Postulante(objPostulante.identificacion, this.objRemate?.idRemate == undefined ? objPostulante.idRemate : this.objRemate?.idRemate, 
      objPostulante.idPersonaTipoSubtipo,objPostulante.fechaPostulacion, objPostulante.valorOfertado, objPostulante.esGanador, objPostulante.comprobanteDeposito,
      objPostulante.esDevuelto, true, objPostulante.apellidoPaterno, objPostulante.apellidoMaterno,
      objPostulante.nombre, objPostulante.fechaNacimiento, objPostulante.idTipoSexo, objPostulante.idUbicacionGeografica,
      objPostulante.idTipoIdentificacion, objPostulante.direccion, objPostulante.idTipoCliente, objPostulante.celular, objPostulante.telefono,
      objPostulante.correo, objPostulante.esEditar)

    postulanteGurdar = await (this.svrPostulante.registrarPostulante(postulanteGurdar));
    if (postulanteGurdar) {
      let registrado: boolean = false;
      if (this.imagenAdjuntoComprobante?.data) {
        registrado = await (this.registrarAdjuntoComprobante(postulanteGurdar));
      }
      this.iniciar();
      this.objBtnPostulante = new BarraHerramientaBoton();      
      this.limpiar();
    }

  }

  public async editarRegistro(objBtn: Postulante | undefined) {
    this.objBtnPostulante = new BarraHerramientaBoton(true, false);
    this.objPostulante = objBtn;
    
    if (this.objPostulante){
      this.objPostulante.fechaNacimiento = new Date(this.objPostulante.fechaString!);
      this.objPostulante.fechaPostulacion = new Date(this.objPostulante.fechaPostulacionString!);
      this.numeroJucio = this.objPostulante.numeroJucio;
      this.descripcionUbicacion = this.objPostulante.descripcionUbicacion;
      this.tipoBien = this.objPostulante.tipoBien;
      this.descripcionBien = this.objPostulante.descripcionBien;
      this.objPostulante.esEditar = true;
      this.objPostulante.valorBien = Number(this.objPostulante.valorBien);
      this.objPostulante.valorMinimo = Number(this.objPostulante.valorMinimo);
      if (this.objPostulante.idTipoCliente) {
        this.obtenerListaRequ(this.objPostulante.idTipoCliente, true);
      }

      this.lstAdjuntoDto =await (this.svrPostulante.cargarImagen(this.objPostulante)) as unknown as RematePostulanteAdjunto[];
      if(this.lstAdjuntoDto){
        this.nombreArchivoComprobante = this.lstAdjuntoDto[0].nombreArchivo!;
      }
    }
    
    this.habilitaBtnCanGua = true;

  }

  public verificarValorMinimo(valorOfertado: number | undefined, valorMinimo: number | undefined){
    if(valorOfertado! < valorMinimo!){
      this.toastr.warning('Advertencia', this.svrTrsnslate.instant('siisspolweb.loading.remate.postulante.validarMontoMinimo').concat(" El Valor debe ser mayor o igual a: ").concat(valorMinimo));
      this.objPostulante!.valorOfertado! = 0
      return;
    }
  }

  public async cargarInfoComprobante(objImagen: { files: File }|FileUploadEvent) {
    this.imagenAdjuntoComprobante = await this.svrUpload.obtenerInformacionArchivo(objImagen) as Imagen;
    this.nombreArchivoComprobante = this.imagenAdjuntoComprobante.name;
    if (Number(this.imagenAdjuntoComprobante.peso) > 10000000) {
      this.imagenAdjuntoComprobante = undefined;
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.peso'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
    }
  }

  public async registrarAdjuntoComprobante(postulante: Postulante) {
    const imagenAdjunto: RematePostulanteAdjunto = new RematePostulanteAdjunto(undefined,postulante.idRemate, postulante.idPersonaTipoSubtipo, this.imagenAdjuntoComprobante?.name, 
      'CAR', this.imagenAdjuntoComprobante?.data, this.imagenAdjuntoComprobante?.tipo, this.imagenAdjuntoComprobante?.peso, 'CDEP');
    const data: RematePostulanteAdjunto = await this.svrPostulante.insertarActualizarAdjunto(imagenAdjunto) as RematePostulanteAdjunto;
    if (data.idRematePostulanteAdjunto)
      return true
    else
      return false
  }

  public descargarInfoComprobante(obj?: Postulante) {
    this.svrPostulante.obtenerImagen(obj);
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
        this.guardar(this.objPostulante);
      }

    });
  }

  public limpiar() {
    this.objRemate = undefined;
    this.numeroJucio = undefined;
    this.objPostulante = undefined;
    this.tipoBien = undefined;
    this.descripcionBien = undefined;
    this.lstCatalogoRequerimiento = [];
    this.descripcionUbicacion = undefined;
    this.habilitaBtnCanGua = false;
    this.nombreArchivoComprobante = 'Seleccionar';
    this.iniciar();
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();

  }

}
