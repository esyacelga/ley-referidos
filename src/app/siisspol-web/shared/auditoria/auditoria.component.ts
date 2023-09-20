import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/store/reducers/app.reducer';
import {AuditoriaClass} from '../directives/classes/auditoria.class';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',

  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit, OnDestroy {
  private objSubscripcion: Subscription | undefined;
  objAuditoria: AuditoriaClass = new AuditoriaClass();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.objSubscripcion = this.store.select('auditoriaComponent').subscribe((data: AuditoriaClass) => {
      this.objAuditoria = data;
    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.objSubscripcion.unsubscribe();
  }

}
