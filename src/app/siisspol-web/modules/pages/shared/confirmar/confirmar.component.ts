import {Component, Input, OnInit} from '@angular/core';
import {TextConfirmarComponent} from "../text-confirmar/text-confirmar.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  // @ts-ignore
  @Input("metodoRemoto") myMethod: Function;
  @Input() titulo: string = 'Informacion:';
  @Input() mensaje: string = 'Va enviar a procesar la informacion suministrada, realmente desea continuar?';
  @Input() verCancelar?: boolean = true;
  @Input("d-class") class?: string = 'btn btn-success';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public abrirPopUp() {
    const titulo = this.titulo;
    const mensaje = this.mensaje;
    const verCancelar = this.verCancelar;
    const dialogRef = this.dialog.open(TextConfirmarComponent, {
      width: '500px',
      height: '300px',
      data: {titulo, mensaje, verCancelar}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.callMethod();
        // Realiza las acciones correspondientes
      } else {
        console.log("Se va a cancelar");
      }
    });
  }

  public callMethod(): void {
    this.myMethod(); // Llama al método pasado como parámetro
  }

  callMethodClose(): void {
    this.myMethod(); // Llama al método pasado como parámetro
  }

}

