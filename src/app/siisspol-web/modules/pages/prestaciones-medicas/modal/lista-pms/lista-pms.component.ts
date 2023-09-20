import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PermisoPagoPrestacionesService} from '../../../comun/services/permiso-pago-prestaciones.service';
import {filtrarLista} from '../../../../system/funcions/lista.utils';

@Component({
  selector: 'app-lista-pms',
  templateUrl: './lista-pms.component.html',
  styleUrls: ['./lista-pms.component.css']
})
export class ListaPmsComponent implements OnInit {

  idInstancia: string;
  lstListaPms: AsientoPrestador[] = [];
  lstFiltrados: AsientoPrestador[] = [];
  checked = false;

  constructor(private  svrPermiso: PermisoPagoPrestacionesService,
              public dialogRef: MatDialogRef<ListaPmsComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public idInstanciaExterno: string) {
    this.idInstancia = idInstanciaExterno;
    this.cargaGrid();

  }

  public enviarFiltrados() {
    this.lstFiltrados = filtrarLista(this.lstListaPms, {checked: true});
    return this.lstFiltrados;
  }

  async cargaGrid() {
    this.lstListaPms = (await this.svrPermiso.obtenerListaPMS(this.idInstancia)) as AsientoPrestador[];
  }

  public filtrar() {
    this.dialogRef.close(this.enviarFiltrados());
  }


  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    this.svrPermiso.obtenerListaPMS(this.idInstancia)
  }

}

export class AsientoPrestador {
  numeroTramiteManual: string | undefined;
  codigoAsiento: string | undefined;
  prestador: string | undefined;
  checked: boolean | undefined;
}

export class UsersData {
  numeroTramiteManual: string | undefined;
  codigoAsiento: string | undefined;
  prestador: string | undefined;
}
