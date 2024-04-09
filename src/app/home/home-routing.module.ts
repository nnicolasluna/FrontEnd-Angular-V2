import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../login/guard/auth.guard';

const routes: Routes = [
  { path: 'parametros'/* , canActivate: [authGuard] */, loadChildren: () => import('./Parametros/parametros.module').then(m => m.ParametrosModule) },
  { path: 'administracion'/* , canActivate: [authGuard] */, loadChildren: () => import('./Administracion/administracion/administracion.module').then(m => m.AdministracionModule) },
  { path: 'rrhh', loadChildren: () => import('../rrhh/rrhh.module').then(m => m.RrhhModule) }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
