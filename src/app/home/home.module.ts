import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { UserlistComponent } from './user/user-list/userlist.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { UsercreateComponent } from './user/user-create/usercreate.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { PersonlistComponent } from './person/person-list/personlist.component';
import { PersoncreateComponent } from './person/person-create/personcreate.component';

import { RolecreateComponent } from './role/role-create/rolecreate.component';
import { RolelistComponent } from './role/role-list/rolelist.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonprofileComponent } from './person/person-profile/personprofile.component';
import { MatButtonModule } from "@angular/material/button";
import { SubsiscreateComponent } from './subsistema/subsistema-create/subsiscreate.component';
import { SubsislistComponent } from './subsistema/subsistema-list/subsislist.component';
import { UsershowComponent } from './user/user-show/usershow.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenucreateComponent } from './menu/menu-create/menucreate.component';
import { MenulistComponent } from './menu/menu-list/menulist.component';
import { ComandolistComponent } from './comando/comando-list/comandolist.component';
import { ComandocreateComponent } from './comando/comando-create/comandocreate.component';
import { TipoDocumentoCreateComponent } from './tipoDocumento/tipo-documento-create/tipo-documento-create.component';
import { TipoDocumentoListComponent } from './tipoDocumento/tipo-documento-list/tipo-documento-list.component';
import { DocumentocreateComponent } from './Documento/documento-create/documentocreate.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ComandoEditComponent } from './comando/comando-edit/comando-edit.component';
import { DocumentoEditComponent } from './Documento/documento-edit/documento-edit.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { SubsistemaEditComponent } from './subsistema/subsistema-edit/subsistema-edit.component';
import { TipoDocumentoEditComponent } from './tipoDocumento/tipo-documento-edit/tipo-documento-edit.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AdvertenciaBorrarComponent } from './modal/advertencia-borrar/advertencia-borrar.component';

import {MatDialogModule} from '@angular/material/dialog';
import { AdvertenciaErrorConexionComponent } from './modal/advertencia-error-conexion/advertencia-error-conexion.component';



@NgModule({
  declarations: [
    UserlistComponent,
    UsercreateComponent,
    PersonlistComponent,
    PersoncreateComponent,
    RolecreateComponent,
    RolelistComponent,
    PersonprofileComponent,
    SubsiscreateComponent,
    SubsislistComponent,
    UsershowComponent,
    MenucreateComponent,
    MenulistComponent,
    ComandolistComponent,
    ComandocreateComponent,
    TipoDocumentoCreateComponent,
    TipoDocumentoListComponent,
    DocumentocreateComponent,
    PersonEditComponent,
    UserEditComponent,
    ComandoEditComponent,
    DocumentoEditComponent,
    MenuEditComponent,
    RoleEditComponent,
    SubsistemaEditComponent,
    TipoDocumentoEditComponent,
    AdvertenciaBorrarComponent,
    AdvertenciaErrorConexionComponent,


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
  ]
})
  export class HomeModule { }
