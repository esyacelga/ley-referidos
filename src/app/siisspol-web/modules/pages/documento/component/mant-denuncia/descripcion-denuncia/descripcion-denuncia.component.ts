import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DenunciaDescripcionDto} from "../../../classes/dto/DenunciaDescripcionDto";
import {DenunciaService} from "../../../services/denuncia.service";
import {DenunciaPaginacionDto} from "../../../classes/dto/DenunciaPaginacionDto";

@Component({
  selector: 'app-descripcion-denuncia',
  templateUrl: './descripcion-denuncia.component.html',
  styleUrls: ['./descripcion-denuncia.component.css']
})
export class DescripcionDenunciaComponent implements OnInit, OnDestroy, AfterViewInit {

  abrirPanel: boolean = false;
  @Input('objDenuncia') objDenuncia: DenunciaPaginacionDto = new DenunciaPaginacionDto();
  @Output("cadena") cadenaTexto: EventEmitter<string> = new EventEmitter();
  cadenaDescripcion: string = "";
  lstDenunciaDescripcion: DenunciaDescripcionDto[] = new Array();

  public cargarCadenaTexto() {
    this.cadenaTexto.emit(this.cadenaDescripcion);
  }

  public async obtenerDescripcion(idDenuncia: string) {
    this.lstDenunciaDescripcion = await this.svrDenuncia.obtenerDescripcion(idDenuncia) as DenunciaDescripcionDto[];
    console.log(this.lstDenunciaDescripcion);
  }


  constructor(public svrDenuncia: DenunciaService) {

  }

  ngOnInit(): void {
    // @ts-ignore

  }

  ngOnDestroy(): void {
    this.objDenuncia = new DenunciaPaginacionDto();
  }

  ngAfterViewInit(): void {
    this.obtenerDescripcion(this.objDenuncia.idDenuncia!);
  }

}
