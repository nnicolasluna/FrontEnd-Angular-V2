import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { agencia } from '../agencia-model/agencia';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-agencia-edit',
  templateUrl: './agencia-edit.component.html',
  styleUrls: ['./agencia-edit.component.scss']
})
export class AgenciaEditComponent {
  private matDialogRef!: any;
  url_endpoint_agencias = 'parametros/agencias'
  private url_endpoint_ciuades = 'parametros/ciudades'
  private url_endpoint_paises = 'parametros/paises'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  registros_ciudades: any[] = [];
  registros_paises: any[] = [];
  tipoCorte: any[] = [];
  datos_recuperados_agencia!: any;
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
    
  }
  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');

      this.apiService.update('parametros/agencias', this.uuid, this.formGroup.value as agencia).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/agencia-list');
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
    this.apiService.getAll(this.url_endpoint_ciuades).subscribe(
      {
        next: data => {
          this.registros_ciudades = data
        }
      }
    )
    this.apiService.getAll(this.url_endpoint_paises).subscribe(
      {
        next: data => {

          this.registros_paises = data
        },
        error: (error) => {
          console.log(error)
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      }
    )
  }
  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url_endpoint_agencias, this.uuid).subscribe(
      {
        next: data => {
    /*       console.log(data) */
          this.datos_recuperados_agencia = data
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
          );
          console.log('error al obtener datos de usuario',err)
        }
      }
    );
 
  }
}
