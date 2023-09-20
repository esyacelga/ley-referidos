import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-text-confirmar',
  templateUrl: './text-confirmar.component.html',
  styleUrls: ['./text-confirmar.component.css']
})
export class TextConfirmarComponent implements OnInit {
  titulo: string = '';
  mensaje: string = '';
  tipo: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TextConfirmarComponent>) {
    this.titulo = data.titulo;
    this.mensaje = data.mensaje;
    this.tipo = data.tipo;

  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close('void'); // Emite el evento de cancelar
  }

  onAccept(): void {
    if (this.tipo == 'REGISTRAR') {
      this.dialogRef.close('REGISTRAR'); // Emite el evento de aceptar
    } else
      this.dialogRef.close('LIMPIAR'); // Emite el evento de aceptar
  }


}
