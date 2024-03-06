import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { genero } from '../genero-model/genero';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-genero-create',
  templateUrl: './genero-create.component.html',
  styleUrls: ['./genero-create.component.scss']
})
export class GeneroCreateComponent {
  private matDialogRef!: any;
  private url = 'parametros/generos'
  titulo: string;
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    estado: new FormControl(true),
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
  ) { 
    this.titulo = 'Datos del Genero';
  }

  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as genero).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/genero-list');
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
