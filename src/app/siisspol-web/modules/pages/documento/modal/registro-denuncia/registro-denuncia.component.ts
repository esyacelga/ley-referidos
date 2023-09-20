import {Component, Inject, OnInit} from '@angular/core';
import {DenunciaDto} from "../../classes/dto/DenunciaDto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-registro-denuncia',
  templateUrl: './registro-denuncia.component.html',
  styleUrls: ['./registro-denuncia.component.css']
})
export class RegistroDenunciaComponent implements OnInit {

  objetoDenuncia: DenunciaDto = new DenunciaDto();

  constructor(@Inject(MAT_DIALOG_DATA) public  denuncia: DenunciaDto) {
    this.objetoDenuncia = denuncia;
  }

  ngOnInit(): void {
  }

}
