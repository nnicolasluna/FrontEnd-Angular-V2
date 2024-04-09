import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api-generico/api.service';
import { error } from 'cypress/types/jquery';

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

  constructor(
    private router: Router,
    private apiService: ApiService<any>
  ) { }
  ngOnInit(): void {
    this.call_data()
  }

  secciones: Seccion[] = [
    {
      nombre: 'Administracion', icono: 'settings', marcado: false, botones: [
        { name: 'Personas', icon: 'person', link: 'administracion/personas' },
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
    },
    {
      nombre: 'Recursos Humanos', icono: 'supervisor_account', marcado: false, botones: [
        { name: 'General', icon: 'space_dashboard', link: '' },
        { name: 'Empleados', icon: 'person_apron', link: 'rrhh/empleado-list' },
        { name: 'Contratos', icon: 'assignment_ind', link: '' },
        { name: 'Asistencia', icon: 'how_to_reg', link: '' },
        { name: 'Vacaciones', icon: 'event_available', link: '' },
        { name: 'Planillas mensuales', icon: 'topic', link: '' },
        { name: 'Memorandums', icon: 'article', link: '' },
        { name: 'Certificados de trabajo', icon: 'description', link: '' },
        { name: 'Gestión del organigrama', icon: 'schema', link: '' }
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
  call_data() {
    this.apiService.auth_data("api/auth/user").subscribe(
      {
        next: data => {
          this.userData=data
/*           console.log(this.secciones)
          console.log(this.userData.subsistemas) */
        }
      }
    )
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
