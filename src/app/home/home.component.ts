import { Component, HostListener } from '@angular/core';
import { LoginService } from '../login/login-service/login.service';
import { data } from 'cypress/types/jquery';
import { person } from './person/person-model/person';
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
        { name: 'Personas', icon: 'person', link: 'personlist' },
        { name: 'Usuarios', icon: '3p', link: 'userlist' },
        { name: 'Roles', icon: 'group', link: 'rolelist' },
        { name: 'Menus', icon: 'menu', link: 'menulist' },
        { name: 'Comandos', icon: 'terminal', link: 'comandolist' },
        { name: 'Subsistema', icon: 'badge', link: 'subsistemalist' },
        { name: 'Tipos Documentos', icon: 'badge', link: 'tipo-documento-list' },
              ]
    },
    {
      nombre: 'Parametricas', icono: 'archive', marcado: false, botones: [
        { name: 'Genero', icon: 'male', link: 'genero-list' },
        { name: 'Ocupación', icon: 'work', link: 'ocupacion-list' },
        { name: 'Estado Civil', icon: 'wc', link: 'estado-civil-list' },
        { name: 'Paises', icon: 'flag', link: 'pais-list' },
        { name: 'Cuidades', icon: 'location_city', link: 'ciudad-list' },
        { name: 'Monedas', icon: 'paid', link: 'moneda-list' },
        { name: 'Cortes', icon: 'attach_money', link: 'corte-list' },
        { name: 'Tipo Corte', icon: 'credit_card', link: 'tipo-corte-list' },
        { name: 'Tipo Entidad Financieras', icon: 'euro', link: 'tipo-entidad-finaciera-list' },
        { name: 'Entidades Finacieras', icon: 'payments', link: 'entidad-financiera-list' },
        { name: 'Tipo Cuentas Bancarias', icon: 'savings', link: 'tipo-cuenta-bancaria-list' },
        { name: 'Cuentas Bancarias', icon: 'account_balance', link: 'cuenta-bancaria-list' },
        { name: 'Agencias', icon: 'apartment', link: 'agencia-list' },

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
