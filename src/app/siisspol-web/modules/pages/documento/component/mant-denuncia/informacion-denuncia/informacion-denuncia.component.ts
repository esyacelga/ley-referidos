import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DenunciaPaginacionDto} from "../../../classes/dto/DenunciaPaginacionDto";
import {DenunciaAdjuntoDto} from "../../../classes/dto/DenunciaAdjuntoDto";
import {DenunciaService} from "../../../services/denuncia.service";
import {filtrarLista} from "../../../../../system/funcions/lista.utils";
import {AdjuntoPersistencia} from "../../../classes/persistencia/AdjuntoPersistencia";
import {ConfiguracionEstadoService} from "../../../../comun/services/configuracion-estado.service";
import {ConfiguracionEstado} from "../../../../comun/classes/configuracionEstado";
import {DocumentoEstadoDescripcion} from "../../../classes/persistencia/documento-estado-descripcion";
import {DenunciaArchivoService} from "../../../services/denuncia-archivo.service";

@Component({
  selector: 'app-informacion-denuncia',
  templateUrl: './informacion-denuncia.component.html',
  styleUrls: ['./informacion-denuncia.component.css']
})
export class InformacionDenunciaComponent implements OnInit {
  @Input('denuncia') objDenuncia: DenunciaPaginacionDto = new DenunciaPaginacionDto();
  @Output('adjunto') adjunto: EventEmitter<DocumentoEstadoDescripcion> = new EventEmitter();
  lstDenunciaAdjunto: DenunciaAdjuntoDto[] = new Array();
  objAdjuntoDirectiva: DocumentoEstadoDescripcion = new DocumentoEstadoDescripcion("", "", "", "", "", "", "", "", "")
  objAdjunto: DenunciaAdjuntoDto = new DenunciaAdjuntoDto();
  lstConfiguracion: ConfiguracionEstado[] = new Array();
  abrirPanel: boolean = false;
  lstAdjunto: DenunciaAdjuntoDto[] = new Array();

  constructor(public svrDenuncia: DenunciaService,
              public svrAdjunto: DenunciaArchivoService,
              public conf: ConfiguracionEstadoService) {
  }

  public cargarDescripcion(estado: string) {
    this.objAdjuntoDirectiva = {...this.objAdjuntoDirectiva, estadoPersinstencia: estado}
    this.adjunto.emit(this.objAdjuntoDirectiva);
  }

  public async cargarconfiguracion() {
    this.lstConfiguracion = await this.conf.obtnerSiguienteConfiguracion('PCUMPL', this.objDenuncia.estado)
  }

  public descargarImagen(obj?: DenunciaAdjuntoDto) {
    this.svrDenuncia.obtenerImagen(obj)
  }

  public async eliminarAdjunto(obj?: DenunciaAdjuntoDto) {
    await this.svrAdjunto.eliminarAdjunto(obj?.idDenunciaAdjunto!);
    this.ngOnInit();
  }


  public obtenerObjetoAdjunto(objAdjunto: AdjuntoPersistencia) {
    // @ts-ignore
    this.objAdjuntoDirectiva = objAdjunto;
    this.adjunto.emit(this.objAdjuntoDirectiva);
  }

  public async obtenerAdjuntos(idDenuncia: string) {
    this.lstDenunciaAdjunto = await this.svrDenuncia.obtenerAdjuntos(idDenuncia) as DenunciaAdjuntoDto[];
    this.objAdjunto = this.obtenerAdjuntoEstadoRegistrado(this.lstDenunciaAdjunto)

  }

  public obtenerAdjuntoEstadoRegistrado(lista: DenunciaAdjuntoDto[]): DenunciaAdjuntoDto {
    this.lstAdjunto = lista
    if (!lista || lista.length == 0)
      return new DenunciaAdjuntoDto();
    const lst: DenunciaAdjuntoDto[] = filtrarLista(lista, {estado: 'REG'});
    if (!lst || lst.length == 0)
      return new DenunciaAdjuntoDto();
    return lst[0];
  }

  ngOnInit(): void {
    // @ts-ignore
    this.obtenerAdjuntos(this.objDenuncia.idDenuncia)
    this.cargarconfiguracion();
  }

}
