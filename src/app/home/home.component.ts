import { Component, HostListener } from '@angular/core';
import { LoginService } from '../login/login-service/login.service';
import { data } from 'cypress/types/jquery';

import { Router } from '@angular/router';

interface Seccion {
  nombre: string
  marcado: boolean
  icono: string
  botones: { name: string, icon: string, link: string }[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  admin = false;
  parm = false;
  sidebarVisible = true;
  userData: any;
  rolData: any
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    const datosGuardadosString = sessionStorage.getItem("datos");
    const rol = sessionStorage.getItem("rol");
    if (datosGuardadosString !== null && rol !== null) {
      this.userData = JSON.parse(datosGuardadosString);
      this.rolData = JSON.parse(rol);

    } else {
      console.log("No se encontraron datos en sessionStorage");
    }
  }

  secciones: Seccion[] = [
    {
      nombre: 'Administracion', icono: 'settings', marcado: false, botones: [
        { name: 'Personas', icon: 'person', link: 'administracion/personlist' },
        { name: 'Usuarios', icon: '3p', link: 'administracion/userlist' },
        { name: 'Roles', icon: 'group', link: 'administracion/rolelist' },
        { name: 'Menus', icon: 'menu', link: 'administracion/menulist' },
        { name: 'Comandos', icon: 'terminal', link: 'administracion/comandolist' },
        { name: 'Subsistema', icon: 'badge', link: 'administracion/subsistemalist' },
        
      ]
    },
    {
      nombre: 'Parametros', icono: 'archive', marcado: false, botones: [
        { name: 'Genero', icon: 'male', link: 'parametros/genero-list' },
        { name: 'Ocupación', icon: 'work', link: 'parametros/ocupacion-list' },
        { name: 'Estado Civil', icon: 'wc', link: 'parametros/estado-civil-list' },
        { name: 'Paises', icon: 'flag', link: 'parametros/pais-list' },
        { name: 'Cuidades', icon: 'location_city', link: 'parametros/ciudad-list' },
        { name: 'Monedas', icon: 'paid', link: 'parametros/moneda-list' },
        { name: 'Cortes', icon: 'attach_money', link: 'parametros/corte-list' },
        { name: 'Tipo Corte', icon: 'credit_card', link: 'parametros/tipo-corte-list' },
        { name: 'Tipo Entidad Financieras', icon: 'euro', link: 'parametros/tipo-entidad-finaciera-list' },
        { name: 'Entidades Finacieras', icon: 'payments', link: 'parametros/entidad-financiera-list' },
        { name: 'Tipo Cuentas Bancarias', icon: 'savings', link: 'parametros/tipo-cuenta-bancaria-list' },
        { name: 'Cuentas Bancarias', icon: 'account_balance', link: 'parametros/cuenta-bancaria-list' },
        { name: 'Agencias', icon: 'apartment', link: 'parametros/agencia-list' },
        { name: 'Tipos Documentos', icon: 'badge', link: 'administracion/tipo-documento-list' },
      ]
    }

  ];
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  sidenav() {
    this.sidebarVisible = false
  }

  Admi() {
    this.admin = !this.admin;
  }
  param() {
    this.parm = !this.parm;
  }

  isCollapsed: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkSidebar();
  }

  checkSidebar() {
    const isCollapsedNewValue = window.innerWidth <= 1000;
    if (isCollapsedNewValue !== this.isCollapsed) {
      this.isCollapsed = isCollapsedNewValue;
      if (this.isCollapsed) {
        this.sidebarVisible = !this.sidebarVisible;
      }
    }
  }
  toggleMarcado(seccion: Seccion) {
    seccion.marcado = !seccion.marcado;
  }
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('datos');
    sessionStorage.removeItem('rol');
    this.router.navigateByUrl('/login');
  }
}
