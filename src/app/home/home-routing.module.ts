import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './user/user-list/userlist.component';

import { UsercreateComponent } from './user/user-create/usercreate.component';
import { PersoncreateComponent } from './person/person-create/personcreate.component';
import { PersonlistComponent } from './person/person-list/personlist.component';
import { RolelistComponent } from './role/role-list/rolelist.component';
import { RolecreateComponent } from './role/role-create/rolecreate.component';
import { PersonprofileComponent } from './person/person-profile/personprofile.component';
import { UsershowComponent } from './user/user-show/usershow.component';
import { SubsiscreateComponent } from './subsistema/subsistema-create/subsiscreate.component';
import { SubsislistComponent } from './subsistema/subsistema-list/subsislist.component';
import { MenucreateComponent } from './menu/menu-create/menucreate.component';
import { MenulistComponent } from './menu/menu-list/menulist.component';
import { ComandocreateComponent } from './comando/comando-create/comandocreate.component';
import { ComandolistComponent } from './comando/comando-list/comandolist.component';
import { TipoDocumentoCreateComponent } from './tipoDocumento/tipo-documento-create/tipo-documento-create.component';
import { TipoDocumentoListComponent } from './tipoDocumento/tipo-documento-list/tipo-documento-list.component';
import { DocumentocreateComponent } from './Documento/documento-create/documentocreate.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ComandoEditComponent } from './comando/comando-edit/comando-edit.component';
import { DocumentoEditComponent } from './Documento/documento-edit/documento-edit.component';
import { TipoDocumentoEditComponent } from './tipoDocumento/tipo-documento-edit/tipo-documento-edit.component';
import { SubsistemaEditComponent } from './subsistema/subsistema-edit/subsistema-edit.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { GeneroCreateComponent } from './genero/genero-create/genero-create.component';
import { GeneroListComponent } from './genero/genero-list/genero-list.component';
import { GeneroEditComponent } from './genero/genero-edit/genero-edit.component';
import { EstadoCivilCreateComponent } from './estado-civil/estado-civil-create/estado-civil-create.component';
import { EstadoCivilListComponent } from './estado-civil/estado-civil-list/estado-civil-list.component';
import { EstadoCivilEditComponent } from './estado-civil/estado-civil-edit/estado-civil-edit.component';
import { OcupacionCreateComponent } from './ocupacion/ocupacion-create/ocupacion-create.component';
import { OcupacionListComponent } from './ocupacion/ocupacion-list/ocupacion-list.component';
import { OcupacionEditComponent } from './ocupacion/ocupacion-edit/ocupacion-edit.component';
import { PaisCreateComponent } from './pais/pais-create/pais-create.component';
import { PaisListComponent } from './pais/pais-list/pais-list.component';
import { PaisEditComponent } from './pais/pais-edit/pais-edit.component';
import { MonedaListComponent } from './moneda/moneda-list/moneda-list.component';
import { MonedaCreateComponent } from './moneda/moneda-create/moneda-create.component';
import { MonedaEditComponent } from './moneda/moneda-edit/moneda-edit.component';
import { CuidadListComponent } from './ciudad/cuidad-list/cuidad-list.component';
import { CuidadCreateComponent } from './ciudad/cuidad-create/cuidad-create.component';
import { CuidadEditComponent } from './ciudad/cuidad-edit/cuidad-edit.component';

const routes: Routes = [
  { path: 'userlist', component: UserlistComponent },
  { path: 'usercreate/:id', component: UsercreateComponent },
  { path: 'usershow/:id', component: UsershowComponent },
  { path: 'useredit/:id', component: UserEditComponent },

  { path: 'personlist', component: PersonlistComponent },
  { path: 'personcreate', component: PersoncreateComponent },
  { path: 'personprofile/:id', component: PersonprofileComponent },
  { path: 'personedit/:id', component: PersonEditComponent },

  { path: 'rolelist', component: RolelistComponent },
  { path: 'rolecreate', component: RolecreateComponent },
  { path: 'roledit/:id', component: RoleEditComponent },

  { path: 'menucreate', component: MenucreateComponent },
  { path: 'menulist', component: MenulistComponent },
  { path: 'menuedit/:id', component: MenuEditComponent },

  { path: 'subsistemacreate', component: SubsiscreateComponent },
  { path: 'subsistemalist', component: SubsislistComponent },
  { path: 'subsistemaedit/:id', component: SubsistemaEditComponent },

  { path: 'comandocreate', component: ComandocreateComponent },
  { path: 'comandolist', component: ComandolistComponent },
  { path: 'comandoedit/:id', component: ComandoEditComponent },

  { path: 'tipodocumentocreate', component: TipoDocumentoCreateComponent },
  { path: 'tipodocumentolist', component: TipoDocumentoListComponent },
  { path: 'tipodocumentoedit/:id', component: TipoDocumentoEditComponent },

  { path: 'documentocreate/:id', component: DocumentocreateComponent },
  { path: 'documentoedit/:id', component: DocumentoEditComponent },

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

  { path: 'moneda-create', component: MonedaCreateComponent },
  { path: 'moneda-list', component: MonedaListComponent },
  { path: 'moneda-edit/:id', component: MonedaEditComponent },
  
  { path: 'ciudad-create', component: CuidadCreateComponent },
  { path: 'ciudad-list', component: CuidadListComponent },
  { path: 'ciudad-edit/:id', component: CuidadEditComponent },

  { path: 'corte-create', component: MonedaCreateComponent },
  { path: 'corte-list', component: MonedaListComponent },
  { path: 'corte-edit/:id', component: MonedaEditComponent },

  { path: 'tipo-corte-create', component: MonedaCreateComponent },
  { path: 'tipo-corte-list', component: MonedaListComponent },
  { path: 'tipo-corte-edit/:id', component: MonedaEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
