import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { HomeModule } from '../../home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ParametrosRoutingModule } from '../../Parametros/parametros-routing.module';
import { HomeRoutingModule } from '../../home-routing.module';
import { DocumentocreateComponent } from '../Documento/documento-create/documentocreate.component';
import { DocumentoEditComponent } from '../Documento/documento-edit/documento-edit.component';
import { ComandocreateComponent } from '../comando/comando-create/comandocreate.component';
import { ComandoEditComponent } from '../comando/comando-edit/comando-edit.component';
import { ComandolistComponent } from '../comando/comando-list/comandolist.component';
import { MenucreateComponent } from '../menu/menu-create/menucreate.component';
import { MenuEditComponent } from '../menu/menu-edit/menu-edit.component';
import { MenulistComponent } from '../menu/menu-list/menulist.component';
import { PersoncreateComponent } from '../person/person-create/personcreate.component';
import { PersonEditComponent } from '../person/person-edit/person-edit.component';
import { personasComponent } from '../person/person-list/personlist.component';
import { PersonprofileComponent } from '../person/person-profile/personprofile.component';
import { RolecreateComponent } from '../role/role-create/rolecreate.component';
import { RoleEditComponent } from '../role/role-edit/role-edit.component';
import { RolelistComponent } from '../role/role-list/rolelist.component';
import { SubsiscreateComponent } from '../subsistema/subsistema-create/subsiscreate.component';
import { SubsistemaEditComponent } from '../subsistema/subsistema-edit/subsistema-edit.component';
import { SubsislistComponent } from '../subsistema/subsistema-list/subsislist.component';
import { UsercreateComponent } from '../user/user-create/usercreate.component';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { UserlistComponent } from '../user/user-list/userlist.component';
import { UsershowComponent } from '../user/user-show/usershow.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    DocumentocreateComponent,
    PersonEditComponent,
    UserEditComponent,
    ComandoEditComponent,
    DocumentoEditComponent,
    MenuEditComponent,
    RoleEditComponent,
    SubsistemaEditComponent,
    UserlistComponent,
    UsercreateComponent,
    personasComponent,
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
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    HomeModule,
    ParametrosRoutingModule,
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
    MatExpansionModule,
  ]
})
export class AdministracionModule { }
