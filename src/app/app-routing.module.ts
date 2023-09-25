import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./siisspol-web/modules/pages/home/home.component";
import {
  PersonaReferenciaContenedorComponent
} from "./ley-service/componentes/persona-referencia-contenedor/persona-referencia-contenedor.component";
import {
  ClienteVistaReferenciaComponent
} from "./ley-service/componentes/cliente-vista-referencia/cliente-vista-referencia.component";


const routes: Routes = [
  {
    path: '*', component: ClienteVistaReferenciaComponent
  },

  {
    path: 'home', component: ClienteVistaReferenciaComponent
  },

  {
    path: 'registro-cliente/:informacionSesion', component: PersonaReferenciaContenedorComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
