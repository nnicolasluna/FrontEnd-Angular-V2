import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoService } from '../comando-service/comando.service';
import { comando } from '../comando-model/comando';
import { MenuService } from '../../menu/menu-service/menu.service';
import { error } from 'cypress/types/jquery';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-comando-edit',
  templateUrl: './comando-edit.component.html',
  styleUrls: ['./comando-edit.component.scss']
})
export class ComandoEditComponent {
  menus: any[] = [];
  menuFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    estado: new FormControl(false, [Validators.required]),
    menus: this.menuFormGroup
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
    private modalService: ModalService
  ) { }
  uuidx!: any;
  edit() {
    if (this.formGroup.valid) {

      this.uuidx = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuidx;
      this.formGroup.value.menus = this.menuFormGroup.value;
      this.comandoservice.edit(this.formGroup.value as comando, this.uuidx).subscribe({

        next: (userData: any) => {
          if (userData) {
            this.router.navigateByUrl('/home/comandolist');

            this.formGroup.reset();
          }
          else {
            alert("Datos Incorrectos, Verifique sus datos");
          }
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
            /* accion a determinar  */
          });
        }
      });
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  getMenus() {
    this.menuService.getMenus().subscribe((data) => {
      this.menus = data;
    });
  }
  ngOnInit() {
    this.getMenus();
    this.getComando();
  }
  uuid!: any;
  datos: any;
  getComando() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.comandoservice.getComand(this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(this.datos);
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
            /* accion a determinar  */
          });
        }
      }
    );
  }
}
