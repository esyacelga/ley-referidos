import {Component, OnInit} from '@angular/core';
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {ServicioTipoDelito} from "../../services/servicio-tipo-delito";
import {ServicioTipoDenuncia} from "../../services/servicio-tipo-denuncia";
import {CatalogoDocumento} from "../../classes/dto/catalogoDocumento";
import {PersonaService} from "../../../persona/services/persona.service";
import {PersonaDto} from "../../../persona/PersonaDto";
import {FormDenuncia} from "../../classes/dto/FormDenuncia";
import {CataloTipoService} from "../../../comun/services/catalo-tipo.service";
import {CatalogoTipo} from "../../../comun/classes/CatalogoTipo";
import {DenunciaService} from "../../services/denuncia.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {CatalogoCompuesto} from "../../classes/dto/CatalogoCompuesto";
import {MatDialog} from "@angular/material/dialog";
import {SimpleModalComponent} from "../../shared/simple-modal/simple-modal.component";
import {DenunciaDto} from "../../classes/dto/DenunciaDto";
import {RegistroDenunciaComponent} from "../../modal/registro-denuncia/registro-denuncia.component";
import {MessageService} from "primeng/api";
import {Imagen} from "../../../../system/classes/Imagen";
import {UploadService} from "../../../../system/services/system/upload.service";
import {AdjuntoPersistencia} from "../../classes/persistencia/AdjuntoPersistencia";
import {DenunciaArchivoService} from "../../services/denuncia-archivo.service";
import {TextConfirmarComponent} from "../../../shared/text-confirmar/text-confirmar.component";
import {FileUploadEvent} from "primeng/fileupload";
import {IsspolDialogObject} from "../../../../../shared/confirmacion-modal/classes/isspol-dialog-object";

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css'],
  providers: [MessageService]
})
export class DenunciasComponent implements OnInit {
  denunciaDto: DenunciaDto = new DenunciaDto();
  deshabilitarCampo: boolean = false;
  lstTipoDenuncia: CatalogoDocumento [] | undefined;
  lstTipoDelito: CatalogoDocumento [] | undefined;

  lstPregunta: CatalogoCompuesto [] | undefined;
  lstCoordinacion: CatalogoDocumento [] | undefined;
  lstCatalogoDenunciante: CatalogoTipo [] | undefined;

  objetFormulario: FormDenuncia = new FormDenuncia();
  lstRespuestas: CatalogoCompuesto [] | undefined;
  cedula: string = '';

  nombreArchivo: string = 'Seleccionar';


  objPersona: PersonaDto | undefined;

  imagenAdjunto: Imagen | undefined;

  constructor(private svrDelito: ServicioTipoDelito,
              public dialog: MatDialog,
              private svrDenuncia: ServicioTipoDenuncia,
              private svrPersona: PersonaService,
              private svrCatalogo: CataloTipoService,
              private svtDenuncia: DenunciaService,
              private toastr: ToastrService,
              private svrTrsnslate: TranslateService,
              private messageService: MessageService,
              private svrUpload: UploadService,
              private svrAdjunto: DenunciaArchivoService,
              private intSvr: ExecuteCallProcedureService) {
  }


  public async onFileUpload(objImagen: { files: File } | FileUploadEvent) {
    this.imagenAdjunto = await this.svrUpload.obtenerInformacionArchivo(objImagen) as Imagen;
    this.nombreArchivo = this.imagenAdjunto.name;
    if (Number(this.imagenAdjunto.peso) > 10000000) {
      this.imagenAdjunto = undefined;
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.peso'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
    }
  }

  public async registrarAdjunto() {
    const imagenAdjunto: AdjuntoPersistencia = new AdjuntoPersistencia(this.objetFormulario.idDenuncia, this.objetFormulario.idEstadoDenuncia, this.imagenAdjunto?.name, this.imagenAdjunto?.tipo, this.imagenAdjunto?.peso, this.imagenAdjunto?.data);
    const data: AdjuntoPersistencia = await this.svrAdjunto.insertarActualizarAdjunto(imagenAdjunto) as AdjuntoPersistencia;
    if (data.idDenunciaAdjunto)
      return true
    else
      return false
  }


  ngOnInit(): void {
    /*this.openDialog();*/
    this.intSvr.setWithOutSeccion();
    this.cargarCatlogos();
    this.abrirPopUp();
  }


  public deshabilitarCampos(opcion: any) {
    if (opcion.value.codigo == 'ANON') {
      this.deshabilitarCampo = true
      this.objetFormulario.identificacion = undefined;
      this.objetFormulario.nombrePersona = undefined;
      this.cedula = '';
      this.objPersona = undefined;
      this.objetFormulario.idTipoDenunciante = undefined;
    } else
      this.deshabilitarCampo = false
  }

  public cargarPreguntas(valores: CatalogoCompuesto[] | any) {
    this.lstRespuestas = valores;
  }

  public limpiarFormulario() {
    this.objetFormulario = new FormDenuncia();
    this.objetFormulario.identificacion = undefined;
    this.objetFormulario.nombrePersona = undefined;
    this.nombreArchivo = 'Seleccionar'
  }

  public async cargarCatlogos() {
    this.lstCatalogoDenunciante = await (this.svrCatalogo.obtenerCatalogoPorGrupo('TIPDANTE')) as CatalogoTipo[];
    this.lstTipoDenuncia = await (this.svrDenuncia.obtenerTipoDenuncia()) as CatalogoDocumento[]
    this.lstTipoDelito = await (this.svrDelito.obtenerTipoDelito()) as CatalogoDocumento[]
    this.lstCoordinacion = await (this.svrDelito.obtenerCoordinacion()) as CatalogoDocumento[]
  }

  public validarInforrmacion(objetoFormulario: FormDenuncia): Boolean {
    let respuesta: Boolean = true
    if (!objetoFormulario.descripcion) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.descripcion'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if (!objetoFormulario.idOrigen) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.origen'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if (!objetoFormulario.tipoDelito) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.hecho'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if (!objetoFormulario.tipoDenuncia) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.tipo.denuncia'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if ((objetoFormulario.tipoDenuncia.codigo == 'ANOMZ' || objetoFormulario.tipoDenuncia.codigo == 'CONF') && (!objetoFormulario.identificacion || objetoFormulario.identificacion == '')) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.persona.identificacion'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if ((objetoFormulario.tipoDenuncia.codigo == 'ANOMZ' || objetoFormulario.tipoDenuncia.codigo == 'CONF') && (!objetoFormulario.correo || objetoFormulario.correo == '')) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.correo'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if ((objetoFormulario.tipoDenuncia.codigo == 'ANOMZ' || objetoFormulario.tipoDenuncia.codigo == 'CONF') && (!objetoFormulario.telefono || objetoFormulario.telefono == '')) {
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.telefono'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    if (objetoFormulario.lstRespuestas)
      for (const item of objetoFormulario.lstRespuestas) {
        if (!item.opcion) {
          this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.respuesta'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
          return false;
        }
      }
    return respuesta;
  }

  public async registrar() {
    const objetoFormulario: FormDenuncia = this.objetFormulario;
    if (!objetoFormulario)
      return
    objetoFormulario.lstRespuestas = this.lstRespuestas;
    let registrado: boolean = false;

    if (!this.objetFormulario.idDenuncia && this.validarInforrmacion(objetoFormulario)) {
      this.denunciaDto = await (this.svtDenuncia.registrarDenuncia(objetoFormulario)) as DenunciaDto;
      this.objetFormulario.idDenuncia = this.denunciaDto.idDenuncia;
      this.objetFormulario.numeroReferencia = this.denunciaDto.numeroReferencia;
      if (this.imagenAdjunto?.data) {
        registrado = await (this.registrarAdjunto());
      }
    }
    if (this.objetFormulario.idDenuncia && this.imagenAdjunto?.data && !registrado) {
      registrado = await (this.registrarAdjunto());
    }

    if (this.objetFormulario.idDenuncia && !this.imagenAdjunto?.data) {
      registrado = true;
    }
    if (registrado) {
      const configuracion: IsspolDialogObject = new IsspolDialogObject(this.denunciaDto);
      const dialogRef = this.dialog.open(RegistroDenunciaComponent, configuracion);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.limpiarFormulario();
      });
    }
  }

  public abrirPopUp() {
    const configuracion: IsspolDialogObject = new IsspolDialogObject(null);
    const dialogRef = this.dialog.open(SimpleModalComponent, configuracion);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public async buscarPeronaPorCedula(cedula: string) {
    if (cedula === "")
      return;
    this.objPersona = await (this.svrPersona.buscarPersona(cedula)) as PersonaDto;
    if (!this.objPersona) {
      this.objetFormulario.identificacion = undefined;
      this.objetFormulario.nombrePersona = undefined;
      this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.label.persona.persona.no.encontrada'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
      return
    }
    this.objetFormulario.identificacion = this.objPersona.identificacion;
    this.objetFormulario.nombrePersona = this.objPersona.nombre;
  }


  public abrirVentanaConfirmacion(titulo: string, mensaje: string, tipo: string) {
    const delayInMilliseconds = 500;
    window.scrollTo({top: 0, behavior: 'auto'});
    titulo = this.svrTrsnslate.instant(titulo)
    mensaje = this.svrTrsnslate.instant(mensaje)
    setTimeout(() => {
      const configuracion: IsspolDialogObject = new IsspolDialogObject({titulo, mensaje, tipo});
      const dialogRef = this.dialog.open(TextConfirmarComponent, configuracion);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'REGISTRAR') {
          this.registrar();
          return;
        }
        if (result === 'LIMPIAR') {
          this.limpiarFormulario();
        }

      });
    }, delayInMilliseconds);


  }


}
