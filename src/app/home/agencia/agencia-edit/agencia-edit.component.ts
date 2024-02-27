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
  private url1 = 'paises'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  paises: any[] = [];
  tipoCorte: any[] = [];
  datos!:  any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
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
  get ciudadControl() {
    return this.formGroup.controls.ciudad;
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
      this.apiService.update(this.url, this.uuid, this.formGroup.value as agencia).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/agencias-list');
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
          this.datos=data
          console.log('Datos recibidos:', data); 

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
