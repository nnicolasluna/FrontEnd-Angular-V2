import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { entidadesFinancieras } from '../entidades-financieras-model/entidades-financieras';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-entidades-financieras-create',
  templateUrl: './entidades-financieras-create.component.html',
  styleUrls: ['./entidades-financieras-create.component.scss']
})
export class EntidadesFinancierasCreateComponent {
  private url = 'entidades_financieras'
  private url1 = 'tipo_entidades_financieras'
  operacion = 'Registrar'
  editar = ''
  data: any[] = [];

  private matDialogRef!: any;
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    descripcion: new FormControl('', [Validators.required]),
    tipoEntidadesFinancieras: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
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
          this.router.navigateByUrl('/home/entidad-financiera-list');
          this.formGroup.reset();

        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(()=>{})
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
          this.data = data
        },
        error: ()=>{
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(()=>{})
        }
      }
    )
 
  }
}
