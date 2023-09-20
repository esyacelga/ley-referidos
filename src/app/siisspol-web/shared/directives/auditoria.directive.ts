import {Directive, HostListener, Input} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AuditoriaService} from '../../modules/pages/comun/services/auditoria.service';
import {AuditoriaClass, AuditoriaConfig} from './classes/auditoria.class';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/store/reducers/app.reducer';
import {setAuditoria} from '../redux/store/actions/ver-auditoria.actions';
import {MatDialog} from "@angular/material/dialog";
import {AuditoriaComponent} from "../auditoria/auditoria.component";
import {IsspolDialogObject} from "../confirmacion-modal/classes/isspol-dialog-object";

@Directive({
  selector: '[appAuditoria]',
  providers: []
})
export class AuditoriaDirective {

  @Input() tabla: string | undefined;
  @Input() columna: string | undefined;
  @Input() valorId: string | undefined;


  @HostListener('click')
  async clickIngresado() {
    if (!this.tabla) {
      this.toastr.warning(this.svrTranslate.instant('siisspolweb.comun.auditoria.advertencia.tabla'), this.svrTranslate.instant('siisspolweb.comun.advetencia'));
      return;
    }
    if (!this.columna) {
      this.toastr.warning(this.svrTranslate.instant('siisspolweb.comun.advetencia.advertencia.columna'), this.svrTranslate.instant('siisspolweb.comun.advetencia'));
      return;
    }
    if (!this.valorId) {
      this.toastr.warning(this.svrTranslate.instant('siisspolweb.comun.auditoria.advertencia.valor'), this.svrTranslate.instant('siisspolweb.comun.advetencia'));
      return;
    }
    const objAuditoria: AuditoriaConfig = new AuditoriaConfig(this.tabla, this.columna, this.valorId);
    const auditoria: AuditoriaClass = await (this.svrAud.obtnerInformacionAuditoria(objAuditoria));

    const configuracion: IsspolDialogObject = new IsspolDialogObject(null);
    const dialogRef = this.dialog.open(AuditoriaComponent, configuracion);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.setearAuditoria(auditoria);
  }

  setearAuditoria(auditoria: AuditoriaClass) {
    this.store.dispatch(setAuditoria({auditoria}));
  }

  constructor(public dialog: MatDialog, private toastr: ToastrService, private svrTranslate: TranslateService, private svrAud: AuditoriaService, private store: Store<AppState>,) {

  }

}
