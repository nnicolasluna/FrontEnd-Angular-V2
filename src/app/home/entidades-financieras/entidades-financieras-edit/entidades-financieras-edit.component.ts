import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { entidadesFinancieras } from '../entidades-financieras-model/entidades-financieras';
import { switchMap } from 'rxjs';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-entidades-financieras-edit',
  templateUrl: './entidades-financieras-edit.component.html',
  styleUrls: ['./entidades-financieras-edit.component.scss']
})
export class EntidadesFinancierasEditComponent {

  private matDialogRef!: any;
  private url = 'entidades_financieras'
  private url1 = 'tipo_entidades_financieras'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  tipoEntidadesFinancierases: any[] = [];
  datos!:  any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    descripcion: new FormControl('', [Validators.required]),
    tipoEntidadesFinancieras: new FormControl('', [Validators.required]),

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
  get tipoEntidadesFinancierasControl() {
    return this.formGroup.controls.tipoEntidadesFinancieras;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<entidadesFinancieras>,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getAll()
    this.getOne()
    this.route.paramMap.pipe(
      switchMap(params => {
        this.uuid = this.route.snapshot.paramMap.get('id');
        return this.apiService.getOne('entidades_financieras', this.uuid);
      })
    ).subscribe({
      next: (data) => {
        this.datos = data;
        console.log(this.datos)
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
      this.apiService.update(this.url, this.uuid, this.formGroup.value as entidadesFinancieras).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/entidad-financiera-list');
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
          this.tipoEntidadesFinancierases = data
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
