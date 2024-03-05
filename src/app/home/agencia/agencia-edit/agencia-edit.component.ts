import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { agencia } from '../agencia-model/agencia';
import { switchMap } from 'rxjs';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-agencia-edit',
  templateUrl: './agencia-edit.component.html',
  styleUrls: ['./agencia-edit.component.scss']
})
export class AgenciaEditComponent {
  private matDialogRef!: any;
  private url = 'agencias'
  private url1 = 'ciudades'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  paises: any[] = [];
  tipoCorte: any[] = [];
  datos!: any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    ciudades: new FormControl(''),
    estado: new FormControl(),
  });

  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  get direccionControl() {
    return this.formGroup.controls.direccion;
  }
  get telefonoControl() {
    return this.formGroup.controls.telefono;
  }
  get ciudadesControl() {
    return this.formGroup.controls.ciudades;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<agencia>,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getAll()
    this.getOne()
    this.route.paramMap.pipe(
      switchMap(params => {
        this.uuid = this.route.snapshot.paramMap.get('id');
        return this.apiService.getOne('agencias', this.uuid);
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

      this.apiService.update(this.url, this.uuid, this.formGroup.value as agencia).subscribe(
        {
          next: (data) => {
            this.router.navigateByUrl('/home/agencia-list');
            this.formGroup.reset();

          },
          error: err => {
            console.log(err)
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
          this.datos = data
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
          );
          console.log('error al obtener datos de usuario')
        }
      }
    );
  }
}
