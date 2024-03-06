import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneroCreateComponent } from './genero/genero-create/genero-create.component';
import { GeneroListComponent } from './genero/genero-list/genero-list.component';
import { GeneroEditComponent } from './genero/genero-edit/genero-edit.component';
import { EstadoCivilCreateComponent } from './estado-civil/estado-civil-create/estado-civil-create.component';
import { EstadoCivilEditComponent } from './estado-civil/estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil/estado-civil-list/estado-civil-list.component';
import { OcupacionCreateComponent } from './ocupacion/ocupacion-create/ocupacion-create.component';
import { OcupacionEditComponent } from './ocupacion/ocupacion-edit/ocupacion-edit.component';
import { OcupacionListComponent } from './ocupacion/ocupacion-list/ocupacion-list.component';
import { CuidadCreateComponent } from './ciudad/cuidad-create/cuidad-create.component';
import { CuidadEditComponent } from './ciudad/cuidad-edit/cuidad-edit.component';
import { CuidadListComponent } from './ciudad/cuidad-list/cuidad-list.component';
import { PaisCreateComponent } from './pais/pais-create/pais-create.component';
import { PaisEditComponent } from './pais/pais-edit/pais-edit.component';
import { PaisListComponent } from './pais/pais-list/pais-list.component';
import { CorteCreateComponent } from './corte/corte-create/corte-create.component';
import { CorteEditComponent } from './corte/corte-edit/corte-edit.component';
import { CorteListComponent } from './corte/corte-list/corte-list.component';
import { MonedaCreateComponent } from './moneda/moneda-create/moneda-create.component';
import { MonedaEditComponent } from './moneda/moneda-edit/moneda-edit.component';
import { MonedaListComponent } from './moneda/moneda-list/moneda-list.component';
import { TipoCorteCreateComponent } from './tipo-corte/tipo-corte-create/tipo-corte-create.component';
import { TipoCorteEditComponent } from './tipo-corte/tipo-corte-edit/tipo-corte-edit.component';
import { TipoCorteListComponent } from './tipo-corte/tipo-corte-list/tipo-corte-list.component';
import { AgenciaCreateComponent } from './agencia/agencia-create/agencia-create.component';
import { AgenciaEditComponent } from './agencia/agencia-edit/agencia-edit.component';
import { AgenciaListComponent } from './agencia/agencia-list/agencia-list.component';
import { CuentaBancariaCreateComponent } from './cuenta-bancaria/cuenta-bancaria-create/cuenta-bancaria-create.component';
import { CuentaBancariaEditComponent } from './cuenta-bancaria/cuenta-bancaria-edit/cuenta-bancaria-edit.component';
import { CuentaBancariaListComponent } from './cuenta-bancaria/cuenta-bancaria-list/cuenta-bancaria-list.component';
import { EntidadesFinancierasCreateComponent } from './entidades-financieras/entidades-financieras-create/entidades-financieras-create.component';
import { EntidadesFinancierasEditComponent } from './entidades-financieras/entidades-financieras-edit/entidades-financieras-edit.component';
import { EntidadesFinancierasListComponent } from './entidades-financieras/entidades-financieras-list/entidades-financieras-list.component';
import { TipoCuentasBancariasCreateComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-create/tipo-cuentas-bancarias-create.component';
import { TipoCuentasBancariasEditComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-edit/tipo-cuentas-bancarias-edit.component';
import { TipoCuentasBancariasListComponent } from './tipo-cuentas-bancarias/tipo-cuentas-bancarias-list/tipo-cuentas-bancarias-list.component';
import { TipoEntidadFinancieraCreateComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-create/tipo-entidad-financiera-create.component';
import { TipoEntidadFinancieraEditComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-edit/tipo-entidad-financiera-edit.component';
import { TipoEntidadFinancieraListComponent } from './tipo-entidad-finaciera/tipo-entidad-financiera-list/tipo-entidad-financiera-list.component';

const routes: Routes = [
  { path: 'genero-create', component: GeneroCreateComponent },
  { path: 'genero-list', component: GeneroListComponent },
  { path: 'genero-edit/:id', component: GeneroEditComponent },

  { path: 'estado-civil-create', component: EstadoCivilCreateComponent },
  { path: 'estado-civil-list', component: EstadoCivilListComponent },
  { path: 'estado-civil-edit/:id', component: EstadoCivilEditComponent },

  { path: 'ocupacion-create', component: OcupacionCreateComponent },
  { path: 'ocupacion-list', component: OcupacionListComponent },
  { path: 'ocupacion-edit/:id', component: OcupacionEditComponent },

  { path: 'pais-create', component: PaisCreateComponent },
  { path: 'pais-list', component: PaisListComponent },
  { path: 'pais-edit/:id', component: PaisEditComponent },

    { path: 'ciudad-create', component: CuidadCreateComponent },
  { path: 'ciudad-list', component: CuidadListComponent },
  { path: 'ciudad-edit/:id', component: CuidadEditComponent },

  { path: 'moneda-create', component: MonedaCreateComponent },
  { path: 'moneda-list', component: MonedaListComponent },
  { path: 'moneda-edit/:id', component: MonedaEditComponent },

  { path: 'corte-create', component: CorteCreateComponent },
  { path: 'corte-list', component: CorteListComponent },
  { path: 'corte-edit/:id', component: CorteEditComponent },

  { path: 'tipo-corte-create', component: TipoCorteCreateComponent },
  { path: 'tipo-corte-list', component: TipoCorteListComponent },
  { path: 'tipo-corte-edit/:id', component: TipoCorteEditComponent }, 

  { path: 'tipo-entidad-finaciera-create', component: TipoEntidadFinancieraCreateComponent },
  { path: 'tipo-entidad-finaciera-list', component: TipoEntidadFinancieraListComponent },
  { path: 'tipo-entidad-finaciera-edit/:id', component: TipoEntidadFinancieraEditComponent },

  { path: 'entidad-financiera-create', component: EntidadesFinancierasCreateComponent },
  { path: 'entidad-financiera-list', component: EntidadesFinancierasListComponent },
  { path: 'entidad-financiera-edit/:id', component: EntidadesFinancierasEditComponent },

  { path: 'tipo-cuenta-bancaria-create', component: TipoCuentasBancariasCreateComponent },
  { path: 'tipo-cuenta-bancaria-list', component: TipoCuentasBancariasListComponent },
  { path: 'tipo-cuenta-bancaria-edit/:id', component: TipoCuentasBancariasEditComponent },

  { path: 'agencia-create', component: AgenciaCreateComponent },
  { path: 'agencia-list', component: AgenciaListComponent },
  { path: 'agencia-edit/:id', component: AgenciaEditComponent },

  { path: 'cuenta-bancaria-create', component: CuentaBancariaCreateComponent },
  { path: 'cuenta-bancaria-list', component: CuentaBancariaListComponent },
  { path: 'cuenta-bancaria-edit/:id', component: CuentaBancariaEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],

})
export class ParametrosRoutingModule { }
