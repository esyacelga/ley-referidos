import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BarraHerramientaBoton} from '../../../../../shared/barra-herramientas/barra-herramientas.component';
import {Remate} from '../classes/dto/Remate';

import {RemateService} from '../services/remate.service';
import {ActivatedRoute} from '@angular/router';
import {ExecuteCallProcedureService} from '../../../../system/services/system/execute-call-procedure.service';
import {UtilCoreSystem} from '../../../../system/classes/util-core-system';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../shared/redux/store/reducers/app.reducer';
import {TranslateService} from '@ngx-translate/core';
import {Catalogo} from '../classes/dto/Catalogo';
import {obtenerListarObjetoPorCampo, ordenAsendente} from '../../../../system/funcions/lista.utils';
import {verificarCaracteres} from '../../../../system/funcions/texto.utils';
import {MatDialog} from '@angular/material/dialog';
import {UbicacionGeograficaComponent} from '../modal/ubicacion-geografica/ubicacion-geografica.component';
import {UbicacionGeografica} from '../classes/dto/UbicacionGeografica';
import {RemateCronograma} from '../classes/dto/remate-cronograma';
import {RemateCronogramaComponent} from '../modal/remate-cronograma/remate-cronograma.component';
import {UploadService} from "../../../../system/services/system/upload.service";
import {ToastrService} from "ngx-toastr";
import {Imagen} from 'src/app/siisspol-web/modules/system/classes/Imagen';
import {RemateAdjunto} from '../classes/dto/remate-adjunto';
import {FileUploadEvent} from "primeng/fileupload";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsspolDialogObject } from 'src/app/siisspol-web/shared/confirmacion-modal/classes/isspol-dialog-object';
import { PostulanteModalComponent } from '../modal/postulante-modal/postulante-modal.component';


@Component({
  selector: 'app-remate',
  templateUrl: './remate.component.html',
  styleUrls: ['./remate.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RemateComponent,
      multi: true
    }
  ]
})
export class RemateComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  objRemate: Remate | undefined;
  lstRemate: Remate[] = [];
  lstCatalogo: Catalogo[] = [];
  objCatalogos: any = [];
  lstCatalogoBien: Catalogo[] = [];
  objUbicacion: UbicacionGeografica | undefined;
  lstUbicacion: UbicacionGeografica[] = [];
  objRemateCronograma: RemateCronograma | undefined;
  lstRemateCronograma: RemateCronograma[] = [];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  CALENDER_CONFIG_EN: any;
  valorBienRemate: string | undefined;
  nombreArchivoInfoAvaluo: string = 'Seleccionar';
  imagenAdjuntoInfoAvaluo: Imagen | undefined;
  nombreArchivoAvisoRemate: string = 'Seleccionar';
  imagenAdjuntoAvisoRemate: Imagen | undefined;
  nombreArchivoImagenes: string = 'Seleccionar';
  imagenAdjuntoImagenes: Imagen | undefined;
  selectedImage: string | ArrayBuffer | null | undefined;
  lstFiles: File [] = [];
  lstImgSel: RemateAdjunto [] = [];
  objImgSel: RemateAdjunto | undefined;
  private lstAdjuntoDto: RemateAdjunto[] = [];
  private objRemAdjSel: RemateAdjunto | undefined;

  constructor(private svrRemate: RemateService,
              private svrTranslate: TranslateService,
              private route: ActivatedRoute,
              private utl: UtilCoreSystem,
              private store: Store<AppState>,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private svrUpload: UploadService,
              private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(this.route)
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
        this.guardar(this.objRemate);
      }
    });

  }

  async iniciar() {
    this.lstRemate = await (this.svrRemate.obtnerListaRemate()) as Remate[];
    this.lstCatalogo = await (this.svrRemate.obtnerListaCatalogo()) as Catalogo[];

    this.lstCatalogoBien = ordenAsendente(obtenerListarObjetoPorCampo(this.lstCatalogo, 'grupoCodigo', 'Tipo_Bien_Coactiva'),'nombre') as Catalogo[];

    //this.lstUbicacion = await (this.svrRemate.obtenerListaUbicacion()) as UbicacionGeografica[];

  }

  public crearNuevoRegistro() {
    this.objRemate = new Remate(undefined, undefined, undefined, undefined, 0, 0, undefined, undefined, undefined, undefined);
    this.objRemate.numeroJucio = 'ISSPOL-COA-';
  }

  public async guardar(objRemate: Remate | undefined) {
    if (!objRemate) {
      return;
    }
    
    let remate: Remate = new Remate(objRemate.idRemate, objRemate.numeroJucio, objRemate.tipoBien, objRemate.descripcionBien,
      objRemate.valorBien, objRemate.valorMinPostulado, objRemate.estado, objRemate.idUbicacion, objRemate.etapaCoactiva, objRemate.direccion);
    remate = await (this.svrRemate.registrarRemate(remate));
    if (remate) {
      let registrado: boolean = false;
      if (this.imagenAdjuntoInfoAvaluo?.data) {
        registrado = await (this.registrarAdjuntoInfoAvaluo(remate));
      }
      if (this.imagenAdjuntoAvisoRemate?.data) {
        registrado = await (this.registrarAdjuntoAvisoRemate(remate));
      }
      if (this.lstImgSel.length > 0) {
        for(var i = 0; i < this.lstImgSel.length; i++){
          this.objImgSel = this.lstImgSel[i];
          let binaryData = this.objImgSel.imagen;
          // @ts-ignore
          binaryData = binaryData.substring(binaryData.indexOf('base64,') + 7);
          this.objImgSel.imagen = binaryData;
          registrado = await (this.registrarAdjuntoImagenes(remate, this.objImgSel));
        }
      }           

      this.iniciar();
      this.objBtn = new BarraHerramientaBoton();
      this.limpiar();
    }
  }

  public limpiar() {
    this.objRemate = undefined;
    this.imagenAdjuntoInfoAvaluo = undefined;
    this.imagenAdjuntoAvisoRemate = undefined;
    this.imagenAdjuntoImagenes = undefined;
    this.nombreArchivoInfoAvaluo = 'Seleccionar';
    this.nombreArchivoAvisoRemate = 'Seleccionar';
    this.nombreArchivoImagenes = 'Seleccionar';
    this.selectedImage = undefined;
    this.objUbicacion = undefined;
    this.lstImgSel = [];
    this.objImgSel = undefined;
    this.lstAdjuntoDto = [];
    this.objRemAdjSel = undefined;

  }

  public descargarInfoAvaluo(obj?: Remate) {
    this.svrRemate.obtenerImagen(obj, 'INFAV');
  }

  public descargarAvisoRemate(obj?: Remate) {
    this.svrRemate.obtenerImagen(obj, 'AVR');
  }

  public descargarImagenes(obj?: Remate) {
    this.svrRemate.obtenerImagen(obj, 'IMG');
  }

  public async registrarAdjuntoInfoAvaluo(remate: Remate) {
    const imagenAdjunto: RemateAdjunto = new RemateAdjunto(undefined,remate.idRemate, this.imagenAdjuntoInfoAvaluo?.name, 'CAR',
      this.imagenAdjuntoInfoAvaluo?.data, this.imagenAdjuntoInfoAvaluo?.tipo, this.imagenAdjuntoInfoAvaluo?.peso, 'INFAV');
    const data: RemateAdjunto = await this.svrRemate.insertarActualizarAdjunto(imagenAdjunto) as RemateAdjunto;
    if (data.idRemateAdjunto)
      return true
    else
      return false
  }

  public async registrarAdjuntoAvisoRemate(remate: Remate) {
    const imagenAdjunto: RemateAdjunto = new RemateAdjunto(undefined,remate?.idRemate, this.imagenAdjuntoAvisoRemate?.name, 'CAR',
      this.imagenAdjuntoAvisoRemate?.data, this.imagenAdjuntoAvisoRemate?.tipo, this.imagenAdjuntoAvisoRemate?.peso, 'AVR');
    const data: RemateAdjunto = await this.svrRemate.insertarActualizarAdjunto(imagenAdjunto) as RemateAdjunto;
    if (data.idRemateAdjunto)
      return true
    else
      return false
  }

  public async registrarAdjuntoImagenes(remate: Remate, img: RemateAdjunto) {
    const imagenAdjunto: RemateAdjunto = new RemateAdjunto(img.idRemateAdjunto,remate.idRemate, img.nombreArchivo, 'CAR',
      img.imagen, img.tipo, img.peso, 'IMG');
    const data: RemateAdjunto = await this.svrRemate.insertarActualizarAdjunto(imagenAdjunto) as RemateAdjunto;
    if (data.idRemateAdjunto)
      return true
    else
      return false
  }

  public async editarRegistro(objBtn: Remate | undefined) {
    this.objBtn = new BarraHerramientaBoton(true, false);
    this.objRemate = objBtn;
    
    if (this.objRemate) {
      this.objRemate.tipoBien = objBtn?.codValorBien;
      this.lstAdjuntoDto = await (this.svrRemate.cargarImagenes(this.objRemate, 'IMG')) as RemateAdjunto[];
      for (var i = 0; i< this.lstAdjuntoDto.length; i++){
        this.objRemAdjSel = this.lstAdjuntoDto[i];
        this.objImgSel = new RemateAdjunto(this.objRemAdjSel.idRemateAdjunto,this.objRemAdjSel.idRemate,this.objRemAdjSel.nombreArchivo,undefined,'data:image/jpeg;base64,'.concat(this.objRemAdjSel.imagen!),
        this.objRemAdjSel.tipo,this.objRemAdjSel.peso,undefined);
        this.lstImgSel.push(this.objImgSel)   
                   
    }
      
    }

  }

  public generarCronograma(objBtn: Remate | undefined) {
    const configuracion: IsspolDialogObject = new IsspolDialogObject({
      idRemate: objBtn?.idRemate,
      numeroJucio: objBtn?.numeroJucio
    });
    configuracion.width = '90%'
    const dialogRef = this.dialog.open(RemateCronogramaComponent, configuracion);

  }

  public async obtenerGanador(objRemate: Remate | undefined) {
    if (!objRemate) {
      return;
    }
    
    let remate: Remate = new Remate(objRemate.idRemate, objRemate.numeroJucio, objRemate.tipoBien, objRemate.descripcionBien,
      objRemate.valorBien, objRemate.valorMinPostulado, objRemate.estado, objRemate.idUbicacion, objRemate.etapaCoactiva, objRemate.direccion);
    remate = await (this.svrRemate.seleccionarGanador(remate));
    if (remate) {
      let registrado: boolean = false;
      } 
      this.iniciar();          
  }

  public obtenerPostulantes(objBtn: Remate | undefined) {
    const configuracion: IsspolDialogObject = new IsspolDialogObject({
      idRemate: objBtn?.idRemate
    });
    configuracion.width = '90%'
    const dialogRef = this.dialog.open(PostulanteModalComponent, configuracion);

  }

  public validarCaracter(objRemate: Remate) {
    let filtro = '1234567890';
    objRemate.numeroJucio = verificarCaracteres(objRemate.numeroJucio, filtro);
  }

  public calcularValorPostulacion(valorBien: number | undefined) {
    if (this.objRemate && valorBien) {
      this.objRemate.valorMinPostulado = parseFloat((valorBien * 0.10).toFixed(2));
    }

  }

  public async cargarInfoAvaluo(objImagen: { files: File }|FileUploadEvent) {
    this.imagenAdjuntoInfoAvaluo = await this.svrUpload.obtenerInformacionArchivo(objImagen) as Imagen;
    this.nombreArchivoInfoAvaluo = this.imagenAdjuntoInfoAvaluo.name;
    if (Number(this.imagenAdjuntoInfoAvaluo.peso) > 10000000) {
      this.imagenAdjuntoInfoAvaluo = undefined;
      this.toastr.warning(this.svrTranslate.instant('siisspolweb.validacion.documento.peso'), this.svrTranslate.instant('siisspolweb.comun.advetencia'));
    }
  }

  public async cargarAvisoRemate(objImagen: { files: File } | FileUploadEvent) {
    this.imagenAdjuntoAvisoRemate = await this.svrUpload.obtenerInformacionArchivo(objImagen) as Imagen;
    this.nombreArchivoAvisoRemate = this.imagenAdjuntoAvisoRemate.name;
    if (Number(this.imagenAdjuntoAvisoRemate.peso) > 10000000) {
      this.imagenAdjuntoAvisoRemate = undefined;
      this.toastr.warning(this.svrTranslate.instant('siisspolweb.validacion.documento.peso'), this.svrTranslate.instant('siisspolweb.comun.advetencia'));
    }
  }

  public async cargarImagenes(objImagen: { files: File } | FileUploadEvent, event: FileUploadEvent) {
    /*this.imagenAdjuntoImagenes = await this.svrUpload.obtenerInformacionArchivo(objImagen) as Imagen;
    this.nombreArchivoImagenes = this.imagenAdjuntoImagenes.name;
    if (Number(this.imagenAdjuntoImagenes.peso) > 10000000) {
      this.imagenAdjuntoImagenes = undefined;
      this.toastr.warning(this.svrTranslate.instant('siisspolweb.validacion.documento.peso'), this.svrTranslate.instant('siisspolweb.comun.advetencia'));
    }*/

    for(var i = 0; i <= event.files.length; i++){
      const file: File = event.files[i];
    // Realiza acciones con el archivo seleccionado
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
          this.objImgSel = new RemateAdjunto(undefined,undefined,file.name,undefined,e.target.result,file.type,String(file.size),undefined);
          this.lstImgSel.push(this.objImgSel);
        };
        reader.readAsDataURL(file);
      }
    }

  }

  removeSelectedImage(image: RemateAdjunto): void {
    const index = this.lstImgSel.indexOf(image);
    if (index !== -1) {
      this.lstImgSel.splice(index, 1);
    }
  }

  public openDialog() {
    let id = 0;
    const modalUbicacion: IsspolDialogObject = new IsspolDialogObject({});
    const dialogRef = this.dialog.open(UbicacionGeograficaComponent, modalUbicacion);
    dialogRef.afterClosed().subscribe(result => {
      // @ts-ignore
      this.objUbicacion = result;
      this.objRemate!.desUbicacion = this.objUbicacion?.descripcion
      this.objRemate!.idUbicacion = this.objUbicacion?.idUbicacion
    });

  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
    this.objBtn = new BarraHerramientaBoton();
  }


}
