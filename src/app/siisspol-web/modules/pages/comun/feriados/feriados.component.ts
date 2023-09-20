import {Component, OnInit} from '@angular/core';
import {Feriado} from '../classes/Feriado';
import {FeriadosService} from '../services/feriados.service';
import {ActivatedRoute} from '@angular/router';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {ToBooleanPipe} from '../../../pipes/to-boolean.pipe';
import {UtilCoreSystem} from '../../../system/classes/util-core-system';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../shared/redux/store/reducers/app.reducer';
import {Subscription} from 'rxjs';
import {modificarBitABooleanos} from '../../../system/funcions/lista.utils';
import {TranslateService} from '@ngx-translate/core';
import {BarraHerramientaBoton} from '../../../../shared/barra-herramientas/barra-herramientas.component';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.component.html',
  styleUrls: ['./feriados.component.css'],
  providers: [
    ToBooleanPipe
  ]
})
export class FeriadosComponent implements OnInit {
  private objSubscripcion: Subscription | undefined;
  objFeriado: Feriado | undefined;
  lstFeriado: Feriado[] = [];
  totalRecords: number;
  cols: any[];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();
  CALENDER_CONFIG_EN: any;

  constructor(private svrFeriado: FeriadosService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private utl: UtilCoreSystem,
              private store: Store<AppState>,
              private intSvr: ExecuteCallProcedureService) {
    this.totalRecords = 0;
    this.cols = [
      {field: 'fecha', header: 'Fecha de feriado'},
      {field: 'descripcion', header: 'Descripocion del feriado'},
      {field: 'nacional', header: 'Es feriado nacional'},
    ];
    this.intSvr.setActiveRoute(this.route)
  }

  ngOnInit(): void {
    this.iniciarPaginacion();
    this.objSubscripcion = this.store.select('accionComponenteBarraHerramientas').subscribe((data) => {
      if (data === 'GUARDAR') {
        this.guardar(this.objFeriado);
      }
      if (data === 'CANCELAR') {
        this.objFeriado = undefined;
      }
      if (data === 'NUEVO') {
        this.crearNuevoRegistro();
      }
    });

/*    this.CALENDER_CONFIG_EN = {
      firstDayOfWeek:0,
      dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      dayNamesShort:['Suan','Mon','Tue','Wed','Thu','Fri','Sat'],
      dayNamesMin:['Su','Mo','Tu','We','Th','Fr','Sa'],
      monthNames:['January','February','March','April','May','Jun1','July','August','September','October','November','December'],
      monthNamesShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      today:'Today',
      clear:'Clear',
      dateFormat:'mm/dd/yy',
      weekHeader:'Wk'
    }*/
  }

  public crearNuevoRegistro() {
    this.objFeriado = new Feriado(undefined, undefined, 1);
  }


  public async guardar(objFeriado: Feriado | undefined) {
    if (!objFeriado) {
      return;
    }
    let feriado: Feriado = new Feriado(objFeriado.fecha, objFeriado.descripcion, undefined, objFeriado.esNacional);
    feriado = await (this.svrFeriado.regsitrarFeriado(feriado));
    if (feriado) {
      this.iniciarPaginacion();
      this.objBtn = new BarraHerramientaBoton();
      this.objFeriado = undefined;
    }
  }

  async iniciarPaginacion() {
    this.lstFeriado = await (this.svrFeriado.obtnerTodosFeriado()) as Feriado[];
    this.lstFeriado = modificarBitABooleanos(this.lstFeriado, 'nacional');
  }

}

