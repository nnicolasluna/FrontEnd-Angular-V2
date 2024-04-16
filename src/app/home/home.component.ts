import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api-generico/api.service';
import { ModalService } from './modal/service/modal.service';
import { WelcomeComponent } from './modal/welcome/welcome.component';

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
  private matDialogRef!: any;
  constructor(
    private router: Router,
    private apiService: ApiService<any>,
    private modalService: ModalService,
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
          this.userData = data
          this.openWelcomeDialog()
 /*          this.matDialogRef = this.modalService.GenericDialog(WelcomeComponent, {
            data: {
              titulo: 'Bienvenid@,' + ' ' + this.userData.personaDTO.nombres + ' ' + this.userData.personaDTO.primer_apellido + ' ' + this.userData.personaDTO.segundo_apellido,
            }
          })
          this.matDialogRef.afterClosed().subscribe(() => { }) */

        },
        error: error => {
          console.log(error)
        }
      }
    )
  }
  openWelcomeDialog() {
    const isloged = sessionStorage.getItem('identify');
    const welcome='welcome'
    
    if(!isloged){
  /*     console.log('gg') */
      console.log(isloged)
      this.matDialogRef = this.modalService.GenericDialog(WelcomeComponent, {
        data: {
          titulo: 'Bienvenid@,' + ' ' + this.userData.personaDTO.nombres + ' ' + this.userData.personaDTO.primer_apellido + ' ' + this.userData.personaDTO.segundo_apellido,
        }
      })
      this.matDialogRef.afterClosed().subscribe(() => { })
      sessionStorage.setItem("identify", welcome);
    }
  
  }
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('identify');
    this.router.navigateByUrl('/login');
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }


}
