import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoCorte } from '../tipo-corte-model/tipo-corte';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-tipo-corte-create',
  templateUrl: './tipo-corte-create.component.html',
  styleUrls: ['./tipo-corte-create.component.scss']
})
export class TipoCorteCreateComponent {
  private matDialogRef!: any;
  private url = 'tipo-cortes'

  operacion = 'Registrar'
  editar = ''
  paises: any[] = [];
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
    private apiService: ApiService<TipoCorte>,
    private metodogenerico: MetodoGenericoService
  ) { }


  create() {
    if (this.formGroup.valid) {
      const formData = this.metodogenerico.getFormGroupData();
      this.apiService.create(this.url, formData).subscribe({
        next: () => {
  
          this.router.navigateByUrl('/home/tipo-corte-list');
          this.formGroup.reset();
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => { });
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
