import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { estadocivil } from '../estado-civil-model/estado-civil';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';


@Component({
  selector: 'app-estado-civil-create',
  templateUrl: './estado-civil-create.component.html',
  styleUrls: ['./estado-civil-create.component.scss']
})
export class EstadoCivilCreateComponent {
  private matDialogRef!: any;
  private url = 'parametros/estados_civiles'
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
    private apiService: ApiService<estadocivil>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as estadocivil).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/estado-civil-list');
            this.formGroup.reset();
          },
          error: (err:any) => {
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
