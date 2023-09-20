import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DetalleAporte} from "../classes/dto/detalle-aporte";

@Component({
  selector: 'app-detalle-aporte',
  templateUrl: './detalle-aporte.component.html',
  styleUrls: ['./detalle-aporte.component.css']
})
export class DetalleAporteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public detalle: DetalleAporte[]) {
    console.log(detalle);
  }
}
