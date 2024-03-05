import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ocupacion } from '../ocupacion-model/ocupacion';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-ocupacion-edit',
  templateUrl: './ocupacion-edit.component.html',
  styleUrls: ['./ocupacion-edit.component.scss']
})
export class OcupacionEditComponent {
  private matDialogRef!: any;
  datos!: any;
  uuid!: any;
  private url = 'ocupaciones'
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    estado: new FormControl(),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private apiService: ApiService<ocupacion>,
  ) { }

  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.apiService.update(this.url, this.uuid, this.formGroup.value as ocupacion).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/ocupacion-list');
            this.formGroup.reset();
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
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(this.datos);
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
            /* accion por determinar */
          );
          console.log('error al obtener datos de usuario')
        }
      }
    );
  }

}
