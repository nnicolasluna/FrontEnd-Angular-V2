import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoService } from '../comando-service/comando.service';
import { comando } from '../comando-model/comando';
import { MenuService } from '../../menu/menu-service/menu.service';
import { error } from 'cypress/types/jquery';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ApiService } from '../../service/api-generico/api.service';

@Component({
  selector: 'app-comando-edit',
  templateUrl: './comando-edit.component.html',
  styleUrls: ['./comando-edit.component.scss']
})
export class ComandoEditComponent {
  url = 'administracion/menus'
  url1 = 'administracion/comandos'
  menus: any[] = [];
  menuFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    estado: new FormControl(),
    menus: this.menuFormGroup,
  });
  matDialogRef: any;
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  get linkControl() {
    return this.formGroup.controls.link;
  }
  get estadoControl() {
    return this.formGroup.controls.estado;
  }
  constructor(
    private router: Router,
    private comandoservice: ComandoService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private modalService: ModalService,
    private apiService: ApiService<comando>,
  ) { }
  uuidx!: any;
  edit() {
    if (this.formGroup.valid) {

      this.uuidx = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuidx;
      this.formGroup.value.menus = this.menuFormGroup.value;
      this.apiService.update(this.url1, this.uuidx, this.formGroup.value as comando).subscribe(
        {
          next: (userData: any) => {
            this.router.navigateByUrl('/home/comandolist');
            this.formGroup.reset();
          }, error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {

            });
          }
        }
      )
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  getMenus() {
    this.apiService.getAll(this.url).subscribe(
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
    this.getComando();
  }
  uuid!: any;
  datos: any;
  getComando() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url1, this.uuid).subscribe(
      {

        next: data => {
          this.datos = data;
          this.formGroup.patchValue(this.datos);
        },
        error: () => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {

          });
        }

      }
    )
  }
}
