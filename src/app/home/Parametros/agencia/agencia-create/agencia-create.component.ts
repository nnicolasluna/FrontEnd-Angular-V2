import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { agencia } from '../agencia-model/agencia';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';
interface Ciudad {
  uuid: string;
  nombre: string;
  abreviatura: string;
  estado: boolean;
  paises: any;
}

interface Pais {
  uuid: string;
  nombre: string;
  nacionalidad: string;
  bandera: string;
  opera: boolean;
  estado: boolean;
  ciudades: Ciudad[] | null;
}
@Component({
  selector: 'app-agencia-create',
  templateUrl: './agencia-create.component.html',
  styleUrls: ['./agencia-create.component.scss']
})
export class AgenciaCreateComponent {
  url_endpoint_agencias = 'parametros/agencias'
  private url_endpoint_ciudades = 'parametros/ciudades'
  private url_endpoint_paises = 'parametros/paises'
  registros_ciudades: any[] = [];
  registros_paises: any[] = [];
  
  private matDialogRef!: any;
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    paises: new FormControl('', [Validators.required]),
    ciudades: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
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
    private metodogenerico: MetodoGenericoService
  ) { }
  ngOnInit() {
    this.getAll();

  }
  create() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.apiService.create('parametros/agencias', this.formGroup.value as agencia).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/parametros/agencia-list');
          this.formGroup.reset();
        },
        error: (error) => {
          console.log(error)
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }




      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  getAll() {
    this.apiService.getAll(this.url_endpoint_ciudades).subscribe(
      {
        next: data => {

          /* this.registros_ciudades = data */
        },
        error: (error) => {
          console.log(error)
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      }
    )
    this.apiService.getAll(this.url_endpoint_paises).subscribe(
      {
        next: data => {

          /* this.registros_paises = data */
        },
        error: (error) => {
          console.log(error)
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      }
    )
    this.apiService.getAll(this.url_endpoint_paises + '/con-ciudades').subscribe(
      {
        next:data=>{
          this.registros_paises=data
        }
      }
    )
  }
}
