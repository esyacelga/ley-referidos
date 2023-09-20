import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {generarArbolGenerico} from "../../modules/system/funcions/lista.utils";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-generic-tree',
  templateUrl: './generic-tree.component.html',
  styleUrls: ['./generic-tree.component.css']
})
export class GenericTreeComponent implements OnInit {
  @Input("clavePrimaria") clavePrimaria: string = '';
  @Input("clavePadre") clavePadre: string = '';
  @Input("aliasHijo") aliasHijo: string = '';
  @Input("label") label: string = 'descripcion';
  @Input("genericList") genericList: any[] = new Array();
  @Output("objetoSalida") objetoSalida: EventEmitter<any> = new EventEmitter();
  selectedItem: TreeNode | null;
  tree: any[] = [];
  treeControl = new NestedTreeControl<any>(node => node[this.aliasHijo]);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor() {
    this.selectedItem = null;
  }
  isSelected(node: TreeNode): boolean {
    return this.selectedItem === node;
  }

  buildTree(): void {
    this.tree = generarArbolGenerico(this.genericList, this.clavePrimaria, this.clavePadre, this.aliasHijo);
    this.dataSource.data = this.tree;
  }

  hasChild = (_: number, node: any) => !!node[this.aliasHijo] && node[this.aliasHijo].length > 0;

  seleccionarNodo(node: any): void {
    if (node) {
      this.objetoSalida.emit(node);
    }
  }

  ngOnInit(): void {
    this.buildTree();
  }
}
