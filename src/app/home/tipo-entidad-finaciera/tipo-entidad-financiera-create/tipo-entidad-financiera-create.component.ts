import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tipoEntidadFinanciera } from '../tipo-entidad-financiera-model/tipo-entidad-financiera';
import { Router } from '@angular/router';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-tipo-entidad-financiera-create',
  templateUrl: './tipo-entidad-financiera-create.component.html',
  styleUrls: ['./tipo-entidad-financiera-create.component.scss']
})
export class TipoEntidadFinancieraCreateComponent {

  private matDialogRef!: any;
  private url = 'tipo_entidades_financieras'

  operacion = 'Registrar'
  editar = ''
 
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
    private apiService: ApiService<tipoEntidadFinanciera>,
    private metodogenerico: MetodoGenericoService
  ) { }
  create() {
    if (this.formGroup.valid) {
      const formData = this.metodogenerico.getFormGroupData();

      this.apiService.create(this.url, formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/tipo-entidad-finaciera-list');
          this.formGroup.reset();
          console.log('todo correcto papu')
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => { });
          console.log(err)
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
