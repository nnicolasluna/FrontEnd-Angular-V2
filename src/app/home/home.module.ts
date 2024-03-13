import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AdvertenciaBorrarComponent } from './modal/advertencia-borrar/advertencia-borrar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvertenciaErrorConexionComponent } from './modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ComponenteListarComponent } from './componente-listar/componente-listar.component';
import { AdvertenciaCredencialesComponent } from './modal/advertencia-credenciales/advertencia-credenciales.component';
import { FormHeaderComponent } from './form/form-header/form-header.component';
import { FormFooterComponent } from './form/form-footer/form-footer.component';
import { FormBuscarComponent } from './form/form-buscar/form-buscar.component';
import { AdvertenciaDeshabilitarComponent } from './modal/advertencia-deshabilitar/advertencia-deshabilitar.component';
import { FotoCreateComponent } from './Administracion/foto/foto-create/foto-create.component';
import { FotoGenericComponent } from './Administracion/foto/foto-generic/foto-generic.component';
import { FotoEditComponent } from './Administracion/foto/foto-edit/foto-edit.component';





@NgModule({
  declarations: [
    AdvertenciaBorrarComponent,
    AdvertenciaErrorConexionComponent,
    ComponenteListarComponent,
    AdvertenciaCredencialesComponent,
    FormHeaderComponent,
    FormFooterComponent,
    FormBuscarComponent,
    AdvertenciaDeshabilitarComponent,
    FotoCreateComponent,
    FotoGenericComponent,
    FotoEditComponent,
    
  ],
  imports: [

    MatTabsModule,
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,

  ]
  ,
  exports: [
    FormHeaderComponent,
    FormFooterComponent,
    FormBuscarComponent,
    ComponenteListarComponent,

  ]
})
export class HomeModule { }
