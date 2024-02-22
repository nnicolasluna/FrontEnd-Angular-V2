import { MatExpansionModule } from '@angular/material/expansion';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  
  sidebarVisible = true;
  buttons = [
    { name: 'Personas', icon: 'person', link:'personlist' },
    { name: 'Usuarios', icon: '3p', link:'userlist' },
    { name: 'Roles', icon: 'group', link:'rolelist' },
    { name: 'Menus', icon: 'menu', link:'menulist' },
    { name: 'Comandos', icon: 'terminal', link:'comandolist' },
    { name: 'Subsistema', icon: 'badge', link:'subsistemalist' },
    { name: 'Tipos Documentos', icon: 'badge', link:'tipodocumentolist' },
    { name: 'Genero', icon: 'male', link:'genero-list' },
    { name: 'Ocupación', icon: 'work', link:'ocupacion-list' },
    { name: 'Estado Civil', icon: 'wc', link:'estado-civil-list' },


  ];
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  sidenav() {
    this.sidebarVisible = false
  }
  admin = false;
  Admi() {
    this.admin = !this.admin;
  }

}
