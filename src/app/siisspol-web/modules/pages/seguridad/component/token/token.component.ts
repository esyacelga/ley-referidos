import {Component, OnInit} from '@angular/core';
import {PermisoService} from "../../services/permiso.service";
import {TokenPesona} from "../../classes/TokenPesona";
import {ActivatedRoute} from "@angular/router";
import {ExecuteCallProcedureService} from "../../../../system/services/system/execute-call-procedure.service";
import {BarraHerramientaBoton} from "../../../../../shared/barra-herramientas/barra-herramientas.component";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  lstToken: TokenPesona[] = [];
  objBtn: BarraHerramientaBoton = new BarraHerramientaBoton();

  constructor(private permisoService: PermisoService, private route: ActivatedRoute, private intSvr: ExecuteCallProcedureService) {
    this.intSvr.setActiveRoute(this.route)
  }

  ngOnInit(): void {
    this.iniciarPaginacion();
  }


  async editarRegistro(tokenPersona: TokenPesona) {
    await this.permisoService.actualizarToken(tokenPersona);
    await this.iniciarPaginacion();

  }

  async iniciarPaginacion() {
    this.lstToken = await (this.permisoService.obtenerTokensActivos()) as TokenPesona[];
  }
}
