import {Directive, HostListener, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmacionModalComponent} from '../confirmacion-modal/confirmacion-modal.component';
import {Confirmacion} from '../redux/classes/Confirmacion';
import {IsspolDialogObject} from "../confirmacion-modal/classes/isspol-dialog-object";

@Directive({
  selector: '[appConfirmacion]',
})
export class ConfirmacionDirective {

  @Input() objConfirmacion: Confirmacion = new Confirmacion();

  constructor(public dialog: MatDialog) {
  }

  @HostListener('click') clickIngresado() {
    const objDialog = new DialogObjet(this.objConfirmacion.titulo, this.objConfirmacion.mensaje, this.objConfirmacion.opcion);
    const configuracion: IsspolDialogObject = new IsspolDialogObject(objDialog);
    const dialogRef = this.dialog.open(ConfirmacionModalComponent, configuracion);
  }

}

export class DialogObjet {
  titulo: string | undefined;
  mensaje: string | undefined;
  opcion: string | undefined;


  constructor(titulo?: string | undefined, mensaje?: string | undefined, opcion?: string | undefined) {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.opcion = opcion;
  }
}
