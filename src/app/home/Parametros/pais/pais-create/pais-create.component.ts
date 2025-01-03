import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { pais } from '../pais-model/pais';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';


@Component({
  selector: 'app-pais-create',
  templateUrl: './pais-create.component.html',
  styleUrls: ['./pais-create.component.scss']
})
export class PaisCreateComponent {
  private matDialogRef!: any;
  private url = 'parametros/paises'
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    nacionalidad: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    bandera: new FormControl(''),
    estado: new FormControl(true),
    opera:new FormControl(false),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get nacionalidadControl() {
    return this.formGroup.controls.nacionalidad;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<pais>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as pais).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/pais-list');
            this.formGroup.reset();
          },
          error: err => {
            
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
              console.log(err)
            });
          }
        }
      );
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

}
