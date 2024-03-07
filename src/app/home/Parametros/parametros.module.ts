import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { GeneroListComponent } from './genero/genero-list/genero-list.component';
import { GeneroCreateComponent } from './genero/genero-create/genero-create.component';
import { GeneroEditComponent } from './genero/genero-edit/genero-edit.component';
import { EstadoCivilCreateComponent } from './estado-civil/estado-civil-create/estado-civil-create.component';
import { EstadoCivilEditComponent } from './estado-civil/estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil/estado-civil-list/estado-civil-list.component';
import { OcupacionCreateComponent } from './ocupacion/ocupacion-create/ocupacion-create.component';
import { OcupacionEditComponent } from './ocupacion/ocupacion-edit/ocupacion-edit.component';
import { OcupacionListComponent } from './ocupacion/ocupacion-list/ocupacion-list.component';
import { PaisListComponent } from './pais/pais-list/pais-list.component';
import { CuidadCreateComponent } from './ciudad/cuidad-create/cuidad-create.component';
import { CuidadEditComponent } from './ciudad/cuidad-edit/cuidad-edit.component';
import { CuidadFormGenericComponent } from './ciudad/cuidad-form-generic/cuidad-form-generic.component';
import { CuidadListComponent } from './ciudad/cuidad-list/cuidad-list.component';
import { PaisCreateComponent } from './pais/pais-create/pais-create.component';
import { PaisEditComponent } from './pais/pais-edit/pais-edit.component';



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
import { HomeRoutingModule } from '../home-routing.module';
import { HomeModule } from '../home.module';
import { CorteCreateComponent } from './corte/corte-create/corte-create.component';
import { CorteEditComponent } from './corte/corte-edit/corte-edit.component';
import { CorteGenericComponent } from './corte/corte-generic/corte-generic.component';
import { CorteListComponent } from './corte/corte-list/corte-list.component';
import { TipoCorteCreateComponent } from './tipo-corte/tipo-corte-create/tipo-corte-create.component';
import { TipoCorteEditComponent } from './tipo-corte/tipo-corte-edit/tipo-corte-edit.component';
import { TipoCorteGenericComponent } from './tipo-corte/tipo-corte-generic/tipo-corte-generic.component';
import { TipoCorteListComponent } from './tipo-corte/tipo-corte-list/tipo-corte-list.component';
import { MonedaCreateComponent } from './moneda/moneda-create/moneda-create.component';
import { MonedaEditComponent } from './moneda/moneda-edit/moneda-edit.component';
import { MonedaListComponent } from './moneda/moneda-list/moneda-list.component';
import { AgenciaCreateComponent } from './agencia/agencia-create/agencia-create.component';
import { AgenciaEditComponent } from './agencia/agencia-edit/agencia-edit.component';
import { AgenciaGenericComponent } from './agencia/agencia-generic/agencia-generic.component';
import { AgenciaListComponent } from './agencia/agencia-list/agencia-list.component';
import { CuentaBancariaCreateComponent } from './cuenta-bancaria/cuenta-bancaria-create/cuenta-bancaria-create.component';
import { CuentaBancariaEditComponent } from './cuenta-bancaria/cuenta-bancaria-edit/cuenta-bancaria-edit.component';
import { CuentaBancariaGenericComponent } from './cuenta-bancaria/cuenta-bancaria-generic/cuenta-bancaria-generic.component';
import { CuentaBancariaListComponent } from './cuenta-bancaria/cuenta-bancaria-list/cuenta-bancaria-list.component';
import { EntidadesFinancierasCreateComponent } from './entidades-financieras/entidades-financieras-create/entidades-financieras-create.component';
import { EntidadesFinancierasEditComponent } from './entidades-financieras/entidades-financieras-edit/entidades-financieras-edit.component';
import { EntidadesFinancierasGenericComponent } from './entidades-financieras/entidades-financieras-generic/entidades-financieras-generic.component';
import { EntidadesFinancierasListComponent } from './entidades-financieras/entidades-financieras-list/entidades-financieras-list.component';
import { TipoCuentasBancariasCreateComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-create/tipo-cuentas-bancarias-create.component';
import { TipoCuentasBancariasEditComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-edit/tipo-cuentas-bancarias-edit.component';
import { TipoCuentasBancariasGenericComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-generic/tipo-cuentas-bancarias-generic.component';
import { TipoCuentasBancariasListComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-list/tipo-cuentas-bancarias-list.component';
import { TipoEntidadFinancieraCreateComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-create/tipo-entidad-financiera-create.component';
import { TipoEntidadFinancieraEditComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-edit/tipo-entidad-financiera-edit.component';
import { TipoEntidadFinancieraGenericComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-generic/tipo-entidad-financiera-generic.component';
import { TipoEntidadFinancieraListComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-list/tipo-entidad-financiera-list.component';
import { TipoDocumentoCreateComponent } from './tipoDocumento/tipo-documento-create/tipo-documento-create.component';
import { TipoDocumentoEditComponent } from './tipoDocumento/tipo-documento-edit/tipo-documento-edit.component';
import { TipoDocumentoListComponent } from './tipoDocumento/tipo-documento-list/tipo-documento-list.component';





@NgModule({
  declarations: [
    GeneroListComponent,
    GeneroCreateComponent,
    GeneroEditComponent,
    OcupacionListComponent,
    OcupacionCreateComponent,
    OcupacionEditComponent,
    EstadoCivilCreateComponent,
    EstadoCivilEditComponent,
    EstadoCivilListComponent,
    PaisListComponent,
    PaisCreateComponent,
    PaisEditComponent,
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
    MonedaListComponent,
    MonedaCreateComponent,
    MonedaEditComponent,


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
    AgenciaListComponent,
    AgenciaGenericComponent,
    AgenciaCreateComponent,
    AgenciaEditComponent,
    CuentaBancariaListComponent,
    CuentaBancariaGenericComponent,
    CuentaBancariaCreateComponent,
    CuentaBancariaEditComponent,

    TipoDocumentoCreateComponent,
    TipoDocumentoListComponent,
    TipoDocumentoEditComponent,
  ],
  imports: [
    CommonModule,
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
  ]
})
export class ParametrosModule { }
