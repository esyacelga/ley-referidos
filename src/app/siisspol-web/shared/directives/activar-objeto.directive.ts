import {Directive, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {PermisoService} from '../../modules/pages/seguridad/services/permiso.service';
import {PermisoObjeto} from '../../modules/pages/seguridad/classes/PermisoObjeto';
import {DOCUMENT} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'underscore';
import {Router} from '@angular/router';
import {StorageAppService} from "../../modules/system/services/system/storage-app.service";
import {SessionData} from "../../modules/system/classes/session-data";


@Directive({
  selector: '[appActivarObjeto]'
})
export class ActivarObjetoDirective implements OnInit {
  lstPermisos: PermisoObjeto[] | undefined;

  @Input() idAtributo = '';

  constructor(private svrPerm: PermisoService, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,
              private toastr: ToastrService, private router: Router, private svrLs: StorageAppService) {

  }

  async ngOnInit(): Promise<void> {
    const session: SessionData = await (this.svrLs.loadStorageObject('sessionData') as unknown as SessionData);
    this.lstPermisos = await (this.svrPerm.cargarPermisos());
    if (this.idAtributo === '') {
      this.toastr.warning('El atributo id del objeto no ha sido ingresado', 'Advertencia')
      return;
    }
    const element = document.getElementById(this.idAtributo);
    if (!element) {
      this.toastr.warning('El id del objeto no ha sido ingresado', 'Advertencia')
      return;
    }
    let data: [] = (_.where(this.lstPermisos, {idObjeto: this.idAtributo}) as []);
    let str = this.router.url.substring(1, this.router.url.length);
    const index = str.indexOf('/');
    str = str.substring(0, index);

    // @ts-ignore
    data = (_.where(data, {idGrupo: session.groupId}) as []);
    if (data.length > 1) {
      this.toastr.warning('La configuracion del objeto en base esta duplicado', 'Advertencia')
      return;
    }

    this.renderer.setAttribute(element, 'hidden', 'hidden');
  }

}
