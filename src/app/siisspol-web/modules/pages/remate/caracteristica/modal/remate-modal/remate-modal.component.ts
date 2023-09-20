import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Remate } from '../../../remate/classes/dto/Remate';
import { RemateService } from '../../../remate/services/remate.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Confirmacion } from 'src/app/siisspol-web/shared/redux/classes/Confirmacion';
import { isNull } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';
import { TranslateService } from '@ngx-translate/core';
import { obtenerListarObjetoPorCampo } from 'src/app/siisspol-web/modules/system/funcions/lista.utils';

@Component({
  selector: 'app-remate-modal',
  templateUrl: './remate-modal.component.html',
  styleUrls: ['./remate-modal.component.css']
})
export class RemateModalComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  lstRemate: Remate[] = [];
  objRemate: Remate | undefined;
  CALENDER_CONFIG_EN: any;
  objConfirmacion: Confirmacion = new Confirmacion('', '');

  constructor(private svrRemate: RemateService,
    private svrTranslate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Confirmacion,
    public dialogRef: MatDialogRef<RemateModalComponent>) { 
      this.iniciar();
      this.objConfirmacion = new Confirmacion(isNull(data.titulo, this.svrTranslate.instant('siisspolweb.remate.remate.titulo')), isNull(data.mensaje, ''), isNull(data.opcion, ''));
    }

  async iniciar() {
    this.lstRemate = obtenerListarObjetoPorCampo(await (this.svrRemate.obtnerListaRemate()) as Remate[],'estado',true);

  }

  public enviarRemate() {
    if (!this.objRemate) {
      return;
    }
    this.dialogRef.close(this.objRemate);
  }

  public seleccionarRemate(obj: Remate){
    if (!obj) {
      return;
    }

    this.objRemate = obj;
  }

  public cancelar(){
    this.objRemate = undefined;
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

}
