import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { agencia } from '../agencia-model/agencia';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-agencia-create',
  templateUrl: './agencia-create.component.html',
  styleUrls: ['./agencia-create.component.scss']
})
export class AgenciaCreateComponent {
  private url = 'agencias'
  private url1 = 'ciudades'
  operacion = 'Registrar'
  editar = ''
  ciudad: any[] = [];
  tipoCorte: any[] = [];
  private matDialogRef!: any;
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
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
      const formData = this.metodogenerico.getFormGroupData();
      this.apiService.create(this.url, formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/agencia-list');
          this.formGroup.reset();
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  getAll() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
         
          this.ciudad = data
        },
        error: () => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      }
    )
 
  }
}
