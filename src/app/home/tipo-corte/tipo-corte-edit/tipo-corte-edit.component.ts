import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoCorte } from '../tipo-corte-model/tipo-corte';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { switchMap } from 'rxjs';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-tipo-corte-edit',
  templateUrl: './tipo-corte-edit.component.html',
  styleUrls: ['./tipo-corte-edit.component.scss']
})
export class TipoCorteEditComponent {

  private matDialogRef!: any;
  private url = 'tipo_cortes'
 
  operacion = 'Registrar'
  uuid!: any;
  editar = ''

  datos!:  any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    estado: new FormControl(),

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
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => {
        this.uuid = this.route.snapshot.paramMap.get('id');
        return this.apiService.getOne('tipo_cortes', this.uuid);
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
      this.apiService.update(this.url, this.uuid, this.formGroup.value as TipoCorte).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/tipo-corte-list');
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

  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {

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
