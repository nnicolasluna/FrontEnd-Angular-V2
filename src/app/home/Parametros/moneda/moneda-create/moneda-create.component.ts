import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { moneda } from '../moneda-model/moneda';
import { data } from 'cypress/types/jquery';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-moneda-create',
  templateUrl: './moneda-create.component.html',
  styleUrls: ['./moneda-create.component.scss']
})
export class MonedaCreateComponent {
  private matDialogRef!: any;
  private url = 'monedas'
  private url1 = 'paises'
  operacion='Registrar'
  editar=''
  paises: any[] = [];
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    pais: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  get paisControl() {
    return this.formGroup.controls.pais;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<moneda>,
  ) { }
  ngOnInit() {
    this.getAll();
 

  }
  create() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.apiService.create(this.url, this.formGroup.value as moneda).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/moneda-list');
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
