import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cuidad } from '../cuidad-model/cuidad';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-cuidad-create',
  templateUrl: './cuidad-create.component.html',
  styleUrls: ['./cuidad-create.component.scss']
})
export class CuidadCreateComponent {
  private matDialogRef!: any;
  private url = 'ciudades'
  private url1 = 'paises'
  operacion = 'Registrar'
  editar = ''
  paises: any[] = [];
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    pais: new FormControl('', [Validators.required]),

  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }

  get paisControl() {
    return this.formGroup.controls.pais;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<cuidad>,
    private metodogenerico: MetodoGenericoService
  ) { }
  ngOnInit() {
    this.getAll();

  }

  /*   create() {
      if (this.formGroup.valid) {
        
        this.apiService.create(this.url, this.formGroup.value as cuidad).subscribe(
          {
            next: () => {
              this.router.navigateByUrl('/home/ciudad-list');
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
    } */
  create() {
    if (this.formGroup.valid) {
      const formData = this.metodogenerico.getFormGroupData();

      this.apiService.create(this.url, formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/ciudad-list');
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

  getAll() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
          this.paises = data
        }
      }
    )
  }
}
