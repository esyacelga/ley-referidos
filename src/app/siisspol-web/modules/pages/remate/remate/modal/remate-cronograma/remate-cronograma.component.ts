import { Component, OnInit, Inject, Optional } from '@angular/core';
import { BarraHerramientaBoton } from 'src/app/siisspol-web/shared/barra-herramientas/barra-herramientas.component';
import { RemateService } from '../../services/remate.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { UtilCoreSystem } from 'src/app/siisspol-web/modules/system/classes/util-core-system';
import { AppState } from 'src/app/siisspol-web/shared/redux/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { ExecuteCallProcedureService } from 'src/app/siisspol-web/modules/system/services/system/execute-call-procedure.service';
import { RemateCronograma } from '../../classes/dto/remate-cronograma';
import { Subscription } from 'rxjs';
import { Catalogo } from '../../classes/dto/Catalogo';
import { obtenerListarObjetoPorCampo } from 'src/app/siisspol-web/modules/system/funcions/lista.utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Remate } from '../../classes/dto/Remate';
import { FormBuilder } from '@angular/forms';
import { formatearFechaTiempo } from 'src/app/siisspol-web/modules/system/funcions/fecha.utils';
import { Confirmacion } from 'src/app/siisspol-web/shared/redux/classes/Confirmacion';
import { isNull } from 'src/app/siisspol-web/modules/system/funcions/texto.utils';

@Component({
  selector: 'app-remate-cronograma',
  templateUrl: './remate-cronograma.component.html',
  styleUrls: ['./remate-cronograma.component.css']
})
export class RemateCronogramaComponent implements OnInit {
  private objSubscripcion: Subscription | undefined;  
  objRemateCronogramaAccion: BarraHerramientaBoton = new BarraHerramientaBoton();
  CALENDER_CONFIG_EN: any;
  objRemate: Remate | undefined;
  objRemateCronograma: RemateCronograma | undefined;
  lstRemateCronograma: RemateCronograma[] = [];
  accionNuevo: boolean | undefined;
  lstCatalogoEtapaCoactiva: Catalogo[] = [];
  lstCatalogo: Catalogo[] = [];
  fechaInicial: Date | undefined;
  fechaFinal: Date | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  objConfirmacion: Confirmacion = new Confirmacion('', '');

  constructor(private svrRemate: RemateService,
    public dialogRef: MatDialogRef<RemateCronogramaComponent>,
    private svrTranslate: TranslateService,
    @Optional() @Inject(MAT_DIALOG_DATA) public objRemateEnvio: Remate,
    @Inject(MAT_DIALOG_DATA) public data: Confirmacion) {
    this.objRemate = objRemateEnvio;
    this.iniciarPagCronograma();
    this.objConfirmacion = new Confirmacion(isNull(data.titulo, this.svrTranslate.instant('siisspolweb.remate.cronograma.titulo')), isNull(data.mensaje, ''), isNull(data.opcion, ''));
  }

  async iniciarPagCronograma() {   

    this.lstRemateCronograma = await (this.svrRemate.obtenerListaRemateCronograma(this.objRemate?.idRemate)) as RemateCronograma[];
    this.lstCatalogo = await (this.svrRemate.obtnerListaCatalogo()) as Catalogo[];
    this.lstCatalogoEtapaCoactiva = obtenerListarObjetoPorCampo(this.lstCatalogo, 'grupoCodigo', 'Eta_Coac_remat') as Catalogo[];
    this.accionNuevo = true;

  }

  public crearNuevoCronograma() {
    this.objRemateCronograma = new RemateCronograma(undefined,undefined,undefined, undefined, undefined, false);
    this.accionNuevo = false;
  }

  public cancelarNuevoCronograma(){
    this.accionNuevo = true;
    this.objRemateCronograma = undefined;
  }

  public async guardarRemateCronograma(objRemate: RemateCronograma | undefined) {
    if (!objRemate) {
      return;
    }
    objRemate.fechaInicial = formatearFechaTiempo(this.fechaInicial!);
    objRemate.fechaFinal= formatearFechaTiempo(this.fechaFinal!);
    let remateCronograma: RemateCronograma = new RemateCronograma(this.objRemate?.idRemate,objRemate.numeroJucio,objRemate.idEtapaCoactiva,
      objRemate.fechaInicial,objRemate.fechaFinal,objRemate.idEstadoCronograma);
    remateCronograma = await (this.svrRemate.registrarRemateCronograma(remateCronograma));
    if (remateCronograma) {
      this.iniciarPagCronograma();
      this.objRemateCronograma = undefined;
    }
  }

  ngOnInit(): void {
    
  }

}
