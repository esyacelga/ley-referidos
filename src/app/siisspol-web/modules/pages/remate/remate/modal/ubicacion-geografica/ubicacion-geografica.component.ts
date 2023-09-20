import { Component, OnInit, Inject } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource }
  from "@angular/material/tree";
import { Subscription } from 'rxjs';
import { UbicacionGeografica } from '../../classes/dto/UbicacionGeografica';
import { RemateService } from '../../services/remate.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilCoreSystem } from 'src/app/siisspol-web/modules/system/classes/util-core-system';
import { AppState } from 'src/app/siisspol-web/shared/redux/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { ExecuteCallProcedureService } from 'src/app/siisspol-web/modules/system/services/system/execute-call-procedure.service';
import { construirArbolUbicacion } from "src/app/siisspol-web/modules/system/funcions/lista.utils";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Confirmacion } from "src/app/siisspol-web/shared/redux/classes/Confirmacion";
import { isNull } from "src/app/siisspol-web/modules/system/funcions/texto.utils";


@Component({
  selector: 'app-ubicacion-geografica',
  templateUrl: './ubicacion-geografica.component.html',
  styleUrls: ['./ubicacion-geografica.component.css']
})

export class UbicacionGeograficaComponent implements OnInit {

  private objSubscripcion: Subscription | undefined;
  objUbicacion: UbicacionGeografica | undefined;
  lstUbicacion: UbicacionGeografica[] = [];
  tree: UbicacionGeografica[] = [];
  ubicacionSeleccionada: UbicacionGeografica | undefined;

  treeControl = new NestedTreeControl<UbicacionGeografica>(node => node.children);
  dataSource = new MatTreeNestedDataSource<UbicacionGeografica>();
  objConfirmacion: Confirmacion = new Confirmacion('', '');

  constructor(private svrRemate: RemateService,
    private translate: TranslateService,
    private utl: UtilCoreSystem,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<UbicacionGeograficaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Confirmacion,
    private intSvr: ExecuteCallProcedureService) {
    this.objConfirmacion = new Confirmacion(isNull(data.titulo, this.translate.instant('siisspolweb.remate.ubicacion.descripcion')), isNull(data.mensaje, ''), isNull(data.opcion, ''));

  }

  ngOnInit(): void {
    this.iniciar();
  }

  async iniciar() {
    this.lstUbicacion = await (this.svrRemate.obtenerListaUbicacion()) as UbicacionGeografica[];
    this.buildTree();

  }

  buildTree(): void {
    this.tree = construirArbolUbicacion(this.lstUbicacion);
    this.dataSource.data =  this.tree;
  }

  hasChild = (_: number, node: UbicacionGeografica) => !!node.children && node.children.length > 0;
  

  seleccionarNodo(node: UbicacionGeografica): void {
    if (node){
      this.ubicacionSeleccionada = node
    }    
  }

  public enviarUbicacion() {
    if (!this.ubicacionSeleccionada) {
      return;
    }
    this.dialogRef.close(this.ubicacionSeleccionada);
  }
}





