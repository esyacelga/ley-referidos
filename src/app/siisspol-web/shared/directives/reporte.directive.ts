import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {ReporteService} from "../../modules/pages/comun/services/reporte.service";
import {MatDialog} from "@angular/material/dialog";
import {ReporteModalComponent} from "../reporte-modal/reporte-modal.component";
import {ReporteGeneradoParametro} from "../../modules/pages/comun/classes/reporte-generado-parametro";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {StorageAppService} from "../../modules/system/services/system/storage-app.service";

@Directive({
  selector: '[appReporte]'
})
export class ReporteDirective implements OnInit {
  @Input('identificadorReporte') identificadorReporte: string = '';
  @Input('parametrosReporte') parametrosReporte: any = {}

  constructor(private rest: ReporteService,
              private svrLs: StorageAppService,
              private translate: TranslateService,
              public dialog: MatDialog, private toastr: ToastrService,) {

  }

  public async generarParametrosReporte(idenficadoReporte: string) {
    const session = await (this.svrLs.loadStorageObject('sessionData'));
    const parametros: any = {
      'mimeType': "application/pdf",
      'identificador_reporte': idenficadoReporte,
      'identificadorReporte': idenficadoReporte,
      // @ts-ignore
      'id_grupo': session.idGrupo,
      // @ts-ignore
      'idGrupo': session.idGrupo,
      'reporteGeneradoCorrectamente': false,
      'esTramite': false
    }
    return parametros;
  }

  public async setearParametros(objetoFiltro: any) {
    const filtroGeneral = await this.generarParametrosReporte(this.identificadorReporte);
    const filtroNuevo = this.fusionarObjetos(objetoFiltro, filtroGeneral);
    return filtroNuevo;
  }

  public fusionarObjetos<T, U>(objeto1: T, objeto2: U): T & U {
    const resultado: any = {};
    for (let attr in objeto1) {
      if (!(attr in resultado)) {
        resultado[attr] = objeto1[attr];
      }
    }
    for (let attr in objeto2) {
      if (!(attr in resultado)) {
        resultado[attr] = objeto2[attr];
      }
    }

    return resultado as T & U;
  }

//siisspolweb.comun.advetencia
  public validadarNombreReporte(parametro: string) {
    if (!parametro || parametro === '') {
      this.toastr.warning(this.translate.instant('siisspolweb.comun.parametro.noenviado'), this.translate.instant('siisspolweb.comun.advetencia'));
      return false;
    }
    return true;
  }

  @HostListener('click')
  async abrirPanelReporte() {
    this.parametrosReporte = await this.setearParametros(this.parametrosReporte)
    let parametro = JSON.stringify(this.parametrosReporte);
    //let parametro = '{"identificador_reporte":"reporte-liquidacion-acuerdo-pago","id_grupo":259,"reporteGeneradoCorrectamente":false,"ruta":"http://192.168.2.191:8090/siisspol-reporte/reporte/obtenerDocumentoRepositorio/eyJhbGciOiJub25lIn0.eyJzdWIiOiJyZXBvcnRlLWxpcXVpZGFjaW9uLWFjdWVyZG8tcGFnbyIsImRpcmVjdG9yaW8iOiJTSUlTU1BPTFdFQi9QTUVESUNBUy9UUkFNSVRFL1ZDQVNUSUxMTy9SRVBPUlRFLUxJUVVJREFDSU9OLUFDVUVSRE8tUEFHTy8wMDMwMDYtMjMiLCJzZWN1ZW5jaWFsIjoiMDAzMDA2LTIzIn0.","identificadorReporte":"reporte-liquidacion-acuerdo-pago","esTramite":true,"incluir_imagen":true,"idUsuario":"vcastillo","mimeType":"application/pdf","inicial":"PM","id_usuario":"vcastillo","grabarReporte":true,"equipo":"10.10.20.23","usuario":"vcastillo","id_instancia_tramite":"474365","secuencial":"003006-23","idGrupo":259}'
    parametro = btoa(parametro);
    const data: ReporteGeneradoParametro = new ReporteGeneradoParametro(parametro, this.identificadorReporte, false, '', '', false);
    if (this.validadarNombreReporte(this.identificadorReporte) === false) {
      return;
    }
    const base64ImageData = await this.rest.generarReporte(data);

    const dialogRef = this.dialog.open(ReporteModalComponent, {
      width: '1000px',
      data: base64ImageData,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  ngOnInit(): void {

  }

}
