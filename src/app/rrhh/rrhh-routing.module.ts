import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { EmpleadoEditComponent } from './empleado/empleado-edit/empleado-edit.component';
import { EmpleadoCreateComponent } from './empleado/empleado-create/empleado-create.component';
import { EmpleadoProfileComponent } from './empleado/empleado-profile/empleado-profile.component';

const routes: Routes = [
  { path: 'empleado-list', component: EmpleadoListComponent },
  { path: 'empleado-edit/:uuid', component: EmpleadoEditComponent },
  { path: 'empleado-create', component: EmpleadoCreateComponent },
  { path: 'empleado-profile/:uuid', component: EmpleadoProfileComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrhhRoutingModule { }
