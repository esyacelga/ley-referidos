import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { TipoCaracteristica } from '../../classes/dto/tipo-caracteristica';
import { TipoCaracteristicaService } from '../../services/tipo-caracteristica.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-caracteristica-modal',
  templateUrl: './tipo-caracteristica-modal.component.html',
  styleUrls: ['./tipo-caracteristica-modal.component.css']
})
export class TipoCaracteristicaModalComponent implements OnInit, OnDestroy {

  private objSubscripcion: Subscription | undefined;
  lstTipoCaracteristica: TipoCaracteristica[] = [];
  objTipoCaracteristica: TipoCaracteristica | undefined;
  idTipoBien: string | undefined;
  CALENDER_CONFIG_EN: any;


  constructor(private svrTipoCaracteristica: TipoCaracteristicaService,
    public dialogRef: MatDialogRef<TipoCaracteristicaModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public tipoBienEnvio: TipoCaracteristica) {
      this.idTipoBien = tipoBienEnvio.codValorBien;
    this.iniciar();
  }

  async iniciar() {
    this.lstTipoCaracteristica = await (this.svrTipoCaracteristica.obtnerListaTipoCaracteristicaModal(this.idTipoBien)) as TipoCaracteristica[];

  }

  public cancelar(){
    this.objTipoCaracteristica = undefined;
  }

  public seleccionarobjTipoCaracteristica(obj: TipoCaracteristica){
    if (!obj) {
      return;
    }

    this.objTipoCaracteristica = obj;
  }

  public enviarTipoCaracteristica() {
    if (!this.objTipoCaracteristica) {
      return;
    }
    this.dialogRef.close(this.objTipoCaracteristica);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

}
