import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { tipoCuenta } from '../tipo-cuentas-bancarias-model/tipo-cuentas-bancarias';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-tipo-cuentas-bancarias-create',
  templateUrl: './tipo-cuentas-bancarias-create.component.html',
  styleUrls: ['./tipo-cuentas-bancarias-create.component.scss']
})
export class TipoCuentasBancariasCreateComponent {

  private matDialogRef!: any;
  private url = 'tipo_cuentas_bancarias'

  operacion = 'Registrar'
  editar = ''

  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
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
    private apiService: ApiService<tipoCuenta>,
    private metodogenerico: MetodoGenericoService
  ) { }
  create() {
    if (this.formGroup.valid) {
      const formData = this.metodogenerico.getFormGroupData();

      this.apiService.create(this.url, formData).subscribe({
        next: () => {

          this.formGroup.reset();

        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => { });
          console.log(err)
        },
        complete: () => {
          this.router.navigateByUrl('/home/tipo-cuenta-bancaria-list');
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
