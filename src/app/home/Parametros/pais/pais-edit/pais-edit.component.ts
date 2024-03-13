import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pais } from '../pais-model/pais';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';


@Component({
  selector: 'app-pais-edit',
  templateUrl: './pais-edit.component.html',
  styleUrls: ['./pais-edit.component.scss']
})
export class PaisEditComponent {
  private matDialogRef!: any;
  dato!: any;
  uuid!: any;
  private url = 'parametros/paises'
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    nacionalidad: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    bandera: new FormControl(''),
    estado: new FormControl(),
    opera:new FormControl(),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get nacionalidadControl() {
    return this.formGroup.controls.nacionalidad;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private apiService: ApiService<pais>,
  ) { }

  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.apiService.update(this.url, this.uuid, this.formGroup.value as pais).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/pais-list');
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

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.dato = data;
          this.formGroup.patchValue(this.dato);
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
