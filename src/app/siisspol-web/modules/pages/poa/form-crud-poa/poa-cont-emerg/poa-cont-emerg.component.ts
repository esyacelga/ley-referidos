import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../shared/redux/store/reducers/app.reducer";
import {Subscription} from "rxjs";
import {setAccion} from "../../../../../shared/redux/store/actions/barra-herramientas.actions";

@Component({
  selector: 'app-poa-cont-emerg',
  templateUrl: './poa-cont-emerg.component.html',
  styleUrls: ['./poa-cont-emerg.component.css']
})
export class PoaContEmergComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;

  constructor(private dialogRef: MatDialogRef<PoaContEmergComponent>, private store: Store<AppState>,) {
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.dialogRef.close();
      }
      if (data === 'CANCELAR') {
        this.dialogRef.close();
      }
      if (data === 'NUEVO') {
      }
    });
  }

  ngOnDestroy(): void {
    this.objSubscripcion?.unsubscribe();
  }


}
