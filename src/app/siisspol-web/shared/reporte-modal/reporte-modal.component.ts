import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-reporte-modal',
  templateUrl: './reporte-modal.component.html',
  styleUrls: ['./reporte-modal.component.css']
})
export class ReporteModalComponent {
  base64ImageData: string = '';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public cadenaBase64: string) {
    this.base64ImageData = cadenaBase64;
  }

}
