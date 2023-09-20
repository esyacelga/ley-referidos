import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Imagen} from "../../../../../system/classes/Imagen";
import {UploadService} from "../../../../../system/services/system/upload.service";
import {TranslateService} from "@ngx-translate/core";
import {AdjuntoPersistencia} from "../../../classes/persistencia/AdjuntoPersistencia";

@Component({
  selector: 'app-adjunto-denuncia',
  templateUrl: './adjunto-denuncia.component.html',
  styleUrls: ['./adjunto-denuncia.component.css']
})
export class AdjuntoDenunciaComponent implements OnInit {

  @Input('idDenuncia') idDenuncia: string = '';
  @Input('idEstadoDenuncia') idEstadoDenuncia: string = '';
  @Output('adjunto') objetoAdjunto: EventEmitter<AdjuntoPersistencia> = new EventEmitter();
  imagenAdjunto: Imagen | undefined;
  nombreArchivo: string = 'Seleccionar';


  constructor(private svrUpload: UploadService, private svrTrsnslate: TranslateService) {
  }

  ngOnInit(): void {
  }


  public async onFileUpload(objImagen: { files: File }|any) {
    this.imagenAdjunto = await this.svrUpload.obtenerInformacionArchivo(objImagen) as Imagen;
    this.nombreArchivo = this.imagenAdjunto.name;
    if (Number(this.imagenAdjunto.peso) > 10000000) {
      this.imagenAdjunto = undefined;
      //  this.toastr.warning(this.svrTrsnslate.instant('siisspolweb.validacion.documento.peso'), this.svrTrsnslate.instant('siisspolweb.comun.advetencia'));
    } else {
      this.objetoAdjunto.emit(new AdjuntoPersistencia(this.idDenuncia, this.idEstadoDenuncia, this.imagenAdjunto?.name, this.imagenAdjunto?.tipo, this.imagenAdjunto?.peso, this.imagenAdjunto?.data));

    }
  }
}
