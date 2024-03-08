import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoService } from '../comando-service/comando.service';
import { comando } from '../comando-model/comando';
import { MenuService } from '../../menu/menu-service/menu.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-comandocreate',
  templateUrl: './comandocreate.component.html',
  styleUrls: ['./comandocreate.component.scss']
})
export class ComandocreateComponent {
  menus: any[] = [];
  url_menus = 'administracion/menus'
  url_comandos = 'administracion/comandos'
  private matDialogRef!: any;
  menuFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  comando_formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    estado: new FormControl(true),
    menus: this.menuFormGroup
  });
  get nombreControl() {
    return this.comando_formGroup.controls.nombre;
  }
  get descripcionControl() {
    return this.comando_formGroup.controls.descripcion;
  }
  get linkControl() {
    return this.comando_formGroup.controls.link;
  }
  get estadoControl() {
    return this.comando_formGroup.controls.estado;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<comando>,
  ) { }
  create() {
    if (this.comando_formGroup.valid) {
      this.comando_formGroup.value.menus = this.menuFormGroup.value;
      this.apiService.create(this.url_comandos, this.comando_formGroup.value as comando).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/administracion/comandolist');
            this.comando_formGroup.reset();
          },
          error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
              console.log(err)
            });
          }
        }
      )
    }
    else {
      this.comando_formGroup.markAllAsTouched();
    }
  }
  getMenus() {
    this.apiService.getAll(this.url_menus).subscribe(
      {
        next: data => {

          this.menus = data
        },
        error: () => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      }
    )
  }
  ngOnInit() {
    this.getMenus();
  }

}
