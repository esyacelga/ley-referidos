import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./siisspol-web/modules/pages/home/home.component";
import {DenunciasComponent} from "./siisspol-web/modules/pages/documento/component/denuncias/denuncias.component";

import {
  MantPreguntaComponent
} from "./siisspol-web/modules/pages/documento/component/mant-pregunta/mant-pregunta.component";
import {
  TipoDenunciaComponent
} from "./siisspol-web/modules/pages/documento/component/tipo-denuncia/tipo-denuncia.component";
import {TipoDelitoComponent} from "./siisspol-web/modules/pages/documento/component/tipo-delito/tipo-delito.component";
import {
  MantDenunciaComponent
} from "./siisspol-web/modules/pages/documento/component/mant-denuncia/mant-denuncia.component";
import {RemateComponent} from './siisspol-web/modules/pages/remate/remate/component/remate.component';
import {
  TipoCaracteristicaComponent
} from './siisspol-web/modules/pages/remate/caracteristica/component/tipo-caracteristica/tipo-caracteristica.component';
import {
  CaracteristicaComponent
} from './siisspol-web/modules/pages/remate/caracteristica/component/caracteristica/caracteristica.component';
import {PostulanteComponent} from './siisspol-web/modules/pages/remate/postulante/component/postulante.component';

import {
  PermisoPagoAnticiposComponent
} from "./siisspol-web/modules/pages/prestaciones-medicas/component/permiso-pago-anticipos/permiso-pago-anticipos.component";
import {TokenComponent} from "./siisspol-web/modules/pages/seguridad/component/token/token.component";
import {FeriadosComponent} from "./siisspol-web/modules/pages/comun/feriados/feriados.component";
import {FlujoComponent} from "./siisspol-web/modules/pages/comun/component/flujo/flujo.component";
import {
  ContFlujoVersionComponent
} from "./siisspol-web/modules/pages/comun/component/flujo/cont-flujo-version/cont-flujo-version.component";
import {
  ConfigFlowComponent
} from "./siisspol-web/modules/pages/comun/component/flujo/config-flow/config-flow.component";
import {CargaMasivaComponent} from "./siisspol-web/modules/pages/fondos-vivienda/carga-masiva/carga-masiva.component";
import {
  CargaAportesFondosViviendaComponent
} from "./siisspol-web/modules/pages/fondos-vivienda/carga-aportes-fondos-vivienda/carga-aportes-fondos-vivienda.component";
import {ContenedorPoaComponent} from "./siisspol-web/modules/pages/poa/contenedor-poa/contenedor-poa.component";
import {
  ValoresNegativosComponent
} from './siisspol-web/modules/pages/financiero/presupuesto/component/valores-negativos/valores-negativos.component';
import {
  CierrePresupuestarioComponent
} from "./siisspol-web/modules/pages/financiero/presupuesto/component/cierre-presupuestario/cierre-presupuestario.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'denuncias', component: DenunciasComponent
  },
  {
    path: 'mantDenuncias/:informacionSesion', component: MantDenunciaComponent
  },
  {
    path: 'adminPregunta/:informacionSesion', component: MantPreguntaComponent
  },
  {
    path: 'tipoDenuncia/:informacionSesion', component: TipoDenunciaComponent
  },
  {
    path: 'tipoDelito/:informacionSesion', component: TipoDelitoComponent
  },
  {
    path: 'procesoPagoAnticipos/:informacionSesion', component: PermisoPagoAnticiposComponent
  },
  {
    path: 'administracionToken/:informacionSesion', component: TokenComponent
  },
  {
    path: 'remates/:informacionSesion', component: RemateComponent
  },
  {
    path: 'tipoCaracteristica/:informacionSesion', component: TipoCaracteristicaComponent
  },
  {
    path: 'caracteristica/:informacionSesion', component: CaracteristicaComponent
  },
  {
    path: 'postulante/:informacionSesion', component: PostulanteComponent
  },
  {
    path: 'feriados/:informacionSesion', component: FeriadosComponent
  },
  {
    path: 'flujo/:informacionSesion', component: FlujoComponent
  },
  {
    path: 'version/:informacionSesion', component: ContFlujoVersionComponent
  },
  {
    path: 'configuracion-flujo/:informacionSesion', component: ConfigFlowComponent
  },
  {
    //path: 'cargaMasiva/:idSesion/:idGrupo/:idUsuario', component: CargaMasivaComponent
    path: 'cargaMasiva/:informacionSesion', component: CargaMasivaComponent
  },
  {
    path: 'cargaAportesVivienda/:informacionSesion', component: CargaAportesFondosViviendaComponent

  }, {
    path: 'admin-poa/:informacionSesion', component: ContenedorPoaComponent

  },


  {
    path: 'valores-negativos/:informacionSesion', component: ValoresNegativosComponent
  },
  {
    path: 'cierre-presupuestario/:informacionSesion', component: CierrePresupuestarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
