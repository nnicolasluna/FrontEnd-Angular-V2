import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { PersonlistComponent } from '../person/person-list/personlist.component';
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
/* 
  { path: 'tipo-documento-create', component: TipoDocumentoCreateComponent },
  { path: 'tipo-documento-list', component: TipoDocumentoListComponent },
  { path: 'tipo-documento-edit/:id', component: TipoDocumentoEditComponent }, */

  { path: 'documentocreate/:id', component: DocumentocreateComponent },
  { path: 'documentoedit/:id', component: DocumentoEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
