import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { moneda } from '../moneda-model/moneda';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';


@Component({
  selector: 'app-moneda-edit',
  templateUrl: './moneda-edit.component.html',
  styleUrls: ['./moneda-edit.component.scss']
})
export class MonedaEditComponent {
  private matDialogRef!: any;
  private url = 'parametros/monedas'
  private url1 = 'parametros/paises'
  uuid!: any
  operacion = 'Editar'
  editar = 'Editar'
  datos!: any;
  paises: any[] = [];
  pais!:any
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    pais: new FormControl('', [Validators.required]),
    estado: new FormControl(),
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
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.getAll();
    this.getOne();

  }
  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as moneda).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/moneda-list');
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
  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          console.log(data)
          this.formGroup.patchValue(this.datos);
          this.pais = this.formGroup.value.pais

          this.getDatos('pais', this.pais)
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
            /* accion por determinar */
          );
          console.log('error al obtener datos de usuario')
        }
      }
    );
  }
  getDatos(param: string, atrib: any) {
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
  }
}
