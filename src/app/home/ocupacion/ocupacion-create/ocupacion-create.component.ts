import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { ocupacion } from '../ocupacion-model/ocupacion';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ocupacion-create',
  templateUrl: './ocupacion-create.component.html',
  styleUrls: ['./ocupacion-create.component.scss']
})
export class OcupacionCreateComponent {
  private matDialogRef!: any;
  private url = 'ocupaciones'
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    estado: new FormControl(true),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<ocupacion>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as ocupacion).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/ocupacion-list');
            this.formGroup.reset();
          },
          error: err => {
            /* this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent); */
            this.matDialogRef = this.modalService.openDialog(OcupacionCreateComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
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
