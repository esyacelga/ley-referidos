import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/store/reducers/app.reducer';
import {Confirmacion} from '../redux/classes/Confirmacion';
import {setConfirmacion} from '../redux/store/actions/confirmacion.actions';
import {isNull} from '../../modules/system/funcions/texto.utils';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.css']
})
export class ConfirmacionModalComponent implements OnInit {
  objConfirmacion: Confirmacion = new Confirmacion('Confirmacion', 'Realmente desea generar esta accion ?');

  constructor(public dialogRef: MatDialogRef<ConfirmacionModalComponent>,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: Confirmacion) {
    this.objConfirmacion = new Confirmacion(isNull(data.titulo, 'Confirmacion'), isNull(data.mensaje, 'Realmente desea generar esta accion ?'), isNull(data.opcion, ''));
  }

  setearOpcion(confirmacion: Confirmacion) {
    const objCopiaAux: Confirmacion = confirmacion;
    confirmacion = new Confirmacion();
    this.store.dispatch(setConfirmacion({confirmacion}));
    confirmacion = objCopiaAux;
    this.store.dispatch(setConfirmacion({confirmacion}));
  }

  ngOnInit(): void {
  }

}
