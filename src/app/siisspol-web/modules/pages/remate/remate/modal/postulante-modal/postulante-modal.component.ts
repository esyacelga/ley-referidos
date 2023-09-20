import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Postulante } from '../../../postulante/classes/dto/postulante';
import { PostulanteService } from '../../../postulante/service/postulante.service';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Remate } from '../../classes/dto/Remate';
import { Confirmacion } from 'src/app/siisspol-web/shared/redux/classes/Confirmacion';
import { isNull } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';

@Component({
  selector: 'app-postulante-modal',
  templateUrl: './postulante-modal.component.html',
  styleUrls: ['./postulante-modal.component.css']
})
export class PostulanteModalComponent implements OnInit {

  private objSubscripcion: Subscription | undefined;
  lstPostulante: Postulante[] = [];
  objRemate: Remate | undefined;
  objConfirmacion: Confirmacion = new Confirmacion('', '');

  constructor(private svrPostulante: PostulanteService, private svrTranslate: TranslateService,
    public dialogRef: MatDialogRef<PostulanteModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public objRemateEnvio: Remate,
    @Inject(MAT_DIALOG_DATA) public data: Confirmacion) {
      this.objRemate = objRemateEnvio;
      this.objConfirmacion = new Confirmacion(isNull(data.titulo, this.svrTranslate.instant('siisspolweb.remate.postulante.titulo')), isNull(data.mensaje, ''), isNull(data.opcion, ''));

  }

  async iniciar() {
    this.lstPostulante = await(this.svrPostulante.obtnerListaPostulantePorRemate(this.objRemate?.idRemate!)) as Postulante[];
  }

  ngOnInit(): void {
    this.iniciar();
  }

}
