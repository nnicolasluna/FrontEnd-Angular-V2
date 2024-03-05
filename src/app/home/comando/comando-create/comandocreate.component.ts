import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoService } from '../comando-service/comando.service';
import { comando } from '../comando-model/comando';
import { MenuService } from '../../menu/menu-service/menu.service';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ApiService } from '../../service/api-generico/api.service';
@Component({
  selector: 'app-comandocreate',
  templateUrl: './comandocreate.component.html',
  styleUrls: ['./comandocreate.component.scss']
})
export class ComandocreateComponent {
  menus: any[] = [];
  url = 'menus'
  url1 = 'comandos'
  private matDialogRef!: any;
  menuFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    estado: new FormControl(true),
    menus: this.menuFormGroup
  });
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
  create() {
    if (this.formGroup.valid) {
      this.formGroup.value.menus = this.menuFormGroup.value;
      this.apiService.create(this.url1, this.formGroup.value as comando).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/comandolist');
            this.formGroup.reset();
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
  }

}
