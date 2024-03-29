import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrhhRoutingModule } from './rrhh-routing.module';
import { EmpleadoEditComponent } from './empleado/empleado-edit/empleado-edit.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { EmpleadoProfileComponent } from './empleado/empleado-profile/empleado-profile.component';
import { EmpleadoCreateComponent } from './empleado/empleado-create/empleado-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HomeModule } from "../home/home.module";
import { FormHeaderComponent } from '../home/form/form-header/form-header.component';
import { FormFooterComponent } from '../home/form/form-footer/form-footer.component';
import { FormBuscarComponent } from '../home/form/form-buscar/form-buscar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        EmpleadoEditComponent,
        EmpleadoListComponent,
        EmpleadoProfileComponent,
        EmpleadoCreateComponent
    ],
    imports: [
        CommonModule,
        RrhhRoutingModule,
        MatPaginatorModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        HomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ],
    exports: [
      FormHeaderComponent,
      FormFooterComponent,
      FormBuscarComponent,
  
    ]
})
export class RrhhModule { }
