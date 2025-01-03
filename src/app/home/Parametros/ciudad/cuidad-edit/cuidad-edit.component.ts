import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { cuidad } from '../cuidad-model/cuidad';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-cuidad-edit',
  templateUrl: './cuidad-edit.component.html',
  styleUrls: ['./cuidad-edit.component.scss']
})
export class CuidadEditComponent {

  private matDialogRef!: any;
  private url = 'parametros/ciudades'
  private url1 = 'parametros/paises'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  paises: any[] = [];
  datos!: any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    pais: new FormControl('', [Validators.required]),
    estado: new FormControl(),
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
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getAll()
    this.getOne
    this.route.paramMap.pipe(
      switchMap(params => {
        this.uuid = this.route.snapshot.paramMap.get('id');
        return this.apiService.getOne('parametros/ciudades', this.uuid);
      })
    ).subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos:', err);
      }
    });
  }
  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.apiService.update(this.url, this.uuid, this.formGroup.value as cuidad).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/ciudad-list');
            this.formGroup.reset();
          },
          error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
              /* accion a determinar  */
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
          console.log(data)
          this.datos = data;
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
}
