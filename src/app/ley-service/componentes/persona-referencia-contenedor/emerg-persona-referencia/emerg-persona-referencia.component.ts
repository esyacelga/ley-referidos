import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Remate} from "../../../../siisspol-web/modules/pages/remate/remate/classes/dto/Remate";
import {PersonaReferenciaDto} from "../../../classes/PersonaReferenciaDto";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../siisspol-web/shared/redux/store/reducers/app.reducer";

@Component({
  selector: 'app-emerg-persona-referencia',
  templateUrl: './emerg-persona-referencia.component.html',
  styleUrls: ['./emerg-persona-referencia.component.css']
})
export class EmergPersonaReferenciaComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  idPersonaPadre: number = 0;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public objRemateEnvio: Remate,
              private store: Store<AppState>,
              private dialogRef: MatDialogRef<EmergPersonaReferenciaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PersonaReferenciaDto) {
    this.idPersonaPadre = data.idPersonaReferencia!;

  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteSmallBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR-MODAL') {
        this.dialogRef.close();
      }
      if (data === 'CANCELAR-MODAL') {
        this.dialogRef.close();
      }
      if (data === 'NUEVO') {
      }
    });
  }
}
