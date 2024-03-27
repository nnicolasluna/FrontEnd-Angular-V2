import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoService } from '../comando-service/comando.service';
import { comando, comandoDTO } from '../comando-model/comando';
import { MenuService } from '../../menu/menu-service/menu.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-comando-edit',
  templateUrl: './comando-edit.component.html',
  styleUrls: ['./comando-edit.component.scss']
})
export class ComandoEditComponent {
  url_menus = 'administracion/menus'
  url_comandos = 'administracion/comandos'
  comando_uuid!: any;
  comando_datos_recuperados!: comando;
  menus: any[] = [];
  menuFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  comando_formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
    estado: new FormControl(),
    menus: this.menuFormGroup,
  });
  matDialogRef: any;
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
    private route: ActivatedRoute,
    private modalService: ModalService,
    private apiService: ApiService<comando>,
  ) { }
  edit() {
    if (this.comando_formGroup.valid) {

      this.comando_uuid = this.route.snapshot.paramMap.get('id');
      this.comando_formGroup.value.uuid = this.comando_uuid;
      this.comando_formGroup.value.menus = this.menuFormGroup.value;
      this.apiService.update(this.url_comandos, this.comando_uuid, this.comando_formGroup.value as comando).subscribe(
        {
          next: (userData: any) => {
            this.router.navigateByUrl('/home/administracion/comandos');
            this.comando_formGroup.reset();
          }, error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {

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
    this.getComando();
  }

  getComando() {
    this.comando_uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url_comandos, this.comando_uuid).subscribe(
      {

        next: data => {
          this.comando_datos_recuperados = data;
          this.comando_formGroup.patchValue(this.comando_datos_recuperados);
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
