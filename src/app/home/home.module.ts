import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

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

import { MatDialogModule } from '@angular/material/dialog';
import { AdvertenciaErrorConexionComponent } from './modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { GeneroListComponent } from './genero/genero-list/genero-list.component';
import { GeneroCreateComponent } from './genero/genero-create/genero-create.component';
import { GeneroEditComponent } from './genero/genero-edit/genero-edit.component';
import { EstadoCivilListComponent } from './estado-civil/estado-civil-list/estado-civil-list.component';
import { EstadoCivilCreateComponent } from './estado-civil/estado-civil-create/estado-civil-create.component';
import { EstadoCivilEditComponent } from './estado-civil/estado-civil-edit/estado-civil-edit.component';
import { OcupacionEditComponent } from './ocupacion/ocupacion-edit/ocupacion-edit.component';
import { OcupacionListComponent } from './ocupacion/ocupacion-list/ocupacion-list.component';
import { OcupacionCreateComponent } from './ocupacion/ocupacion-create/ocupacion-create.component';
import { PaisListComponent } from './pais/pais-list/pais-list.component';
import { PaisCreateComponent } from './pais/pais-create/pais-create.component';
import { PaisEditComponent } from './pais/pais-edit/pais-edit.component';
import { MonedaListComponent } from './moneda/moneda-list/moneda-list.component';
import { MonedaCreateComponent } from './moneda/moneda-create/moneda-create.component';
import { MonedaEditComponent } from './moneda/moneda-edit/moneda-edit.component';
import { ComponenteListarComponent } from './componente-listar/componente-listar.component';
import { AdvertenciaCredencialesComponent } from './modal/advertencia-credenciales/advertencia-credenciales.component';
import { CuidadListComponent } from './ciudad/cuidad-list/cuidad-list.component';
import { CuidadFormGenericComponent } from './ciudad/cuidad-form-generic/cuidad-form-generic.component';
import { CuidadCreateComponent } from './ciudad/cuidad-create/cuidad-create.component';
import { CuidadEditComponent } from './ciudad/cuidad-edit/cuidad-edit.component';
import { TipoCorteListComponent } from './tipo-corte/tipo-corte-list/tipo-corte-list.component';
import { TipoCorteCreateComponent } from './tipo-corte/tipo-corte-create/tipo-corte-create.component';
import { TipoCorteEditComponent } from './tipo-corte/tipo-corte-edit/tipo-corte-edit.component';
import { TipoCorteGenericComponent } from './tipo-corte/tipo-corte-generic/tipo-corte-generic.component';
import { CorteListComponent } from './corte/corte-list/corte-list.component';
import { CorteCreateComponent } from './corte/corte-create/corte-create.component';
import { CorteEditComponent } from './corte/corte-edit/corte-edit.component';
import { CorteGenericComponent } from './corte/corte-generic/corte-generic.component';
import { TipoEntidadFinancieraListComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-list/tipo-entidad-financiera-list.component';
import { TipoEntidadFinancieraGenericComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-generic/tipo-entidad-financiera-generic.component';
import { TipoEntidadFinancieraCreateComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-create/tipo-entidad-financiera-create.component';
import { TipoEntidadFinancieraEditComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-edit/tipo-entidad-financiera-edit.component';
import { EntidadesFinancierasListComponent } from './entidades-financieras/entidades-financieras-list/entidades-financieras-list.component';
import { EntidadesFinancierasCreateComponent } from './entidades-financieras/entidades-financieras-create/entidades-financieras-create.component';
import { EntidadesFinancierasEditComponent } from './entidades-financieras/entidades-financieras-edit/entidades-financieras-edit.component';
import { EntidadesFinancierasGenericComponent } from './entidades-financieras/entidades-financieras-generic/entidades-financieras-generic.component';
import { TipoCuentasBancariasGenericComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-generic/tipo-cuentas-bancarias-generic.component';
import { TipoCuentasBancariasListComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-list/tipo-cuentas-bancarias-list.component';
import { TipoCuentasBancariasCreateComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-create/tipo-cuentas-bancarias-create.component';
import { TipoCuentasBancariasEditComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-edit/tipo-cuentas-bancarias-edit.component';




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
    GeneroListComponent,
    GeneroCreateComponent,
    GeneroEditComponent,
    EstadoCivilListComponent,
    EstadoCivilCreateComponent,
    EstadoCivilEditComponent,
    OcupacionEditComponent,
    OcupacionListComponent,
    OcupacionCreateComponent,
    PaisListComponent,
    PaisCreateComponent,
    PaisEditComponent,
    MonedaListComponent,
    MonedaCreateComponent,
    MonedaEditComponent,
    ComponenteListarComponent,
    AdvertenciaCredencialesComponent,
    CuidadListComponent,
    CuidadFormGenericComponent,
    CuidadCreateComponent,
    CuidadEditComponent,
    TipoCorteListComponent,
    TipoCorteCreateComponent,
    TipoCorteEditComponent,
    TipoCorteGenericComponent,
    CorteListComponent,
    CorteCreateComponent,
    CorteEditComponent,
    CorteGenericComponent,
    TipoEntidadFinancieraListComponent,
    TipoEntidadFinancieraGenericComponent,
    TipoEntidadFinancieraCreateComponent,
    TipoEntidadFinancieraEditComponent,
    EntidadesFinancierasListComponent,
    EntidadesFinancierasCreateComponent,
    EntidadesFinancierasEditComponent,
    EntidadesFinancierasGenericComponent,
    TipoCuentasBancariasGenericComponent,
    TipoCuentasBancariasListComponent,
    TipoCuentasBancariasCreateComponent,
    TipoCuentasBancariasEditComponent,
    


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
    MatTooltipModule
  ]
})
export class HomeModule { }
