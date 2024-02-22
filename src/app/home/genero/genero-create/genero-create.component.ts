import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { genero } from '../genero-model/genero';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-genero-create',
  templateUrl: './genero-create.component.html',
  styleUrls: ['./genero-create.component.scss']
})
export class GeneroCreateComponent {
  private matDialogRef!: any;
  private url = 'generos'
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<genero>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as genero).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/genero-list');
            this.formGroup.reset();
          },
          error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
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
