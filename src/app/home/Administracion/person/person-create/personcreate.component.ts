import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { person } from '../person-model/person';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-personcreate',
  templateUrl: './personcreate.component.html',
  styleUrls: ['./personcreate.component.scss']
})
export class PersoncreateComponent {
  private url_personas = 'administracion/personas'
  private url_ocupaciones = 'parametros/ocupaciones'
  private url_estados_civiles = 'parametros/estados_civiles'
  private url_generos = 'parametros/generos'
  generos: any[] = [];
  estado: any[] = [];
  ocupacion: any[] = [];
  private matDialogRef!: any;
  persona_formGroup = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    generos: new FormControl('', [Validators.required]),
    ocupaciones: new FormControl('', [Validators.required]),
    estadosCiviles: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(7)]),
    estado: new FormControl(true),
  });

  get nombreControl() {
    return this.persona_formGroup.controls.nombres;
  }
  get papellidoControl() {
    return this.persona_formGroup.controls.primer_apellido;
  }
  get sapellidoControl() {
    return this.persona_formGroup.controls.segundo_apellido;
  }
  get ocupacionControl() {
    return this.persona_formGroup.controls.ocupaciones;
  }
  get estadoControl() {
    return this.persona_formGroup.controls.estadosCiviles;
  }
  get generoControl() {
    return this.persona_formGroup.controls.generos;
  }
  get fnacimientoControl() {
    return this.persona_formGroup.controls.fecha_nacimiento;
  }
  get lnacimientoControl() {
    return this.persona_formGroup.controls.lugar_nacimiento;
  }
  get celularControl() {
    return this.persona_formGroup.controls.celular
  }

  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<person>,
  ) { }

  create() {
    if (this.persona_formGroup.valid) {
      this.apiService.create(this.url_personas, this.persona_formGroup.value as person).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/administracion/personlist');
            this.persona_formGroup.reset();
          },
          error: err => {
            console.log(err)
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
            });
          }
        }
      );
    }
    else {
      this.persona_formGroup.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.getGeneros();
    this.getEstados();
    this.getOcupaciones();
  }
  getGeneros() {
    this.apiService.getAll(this.url_generos).subscribe(
      {
        next: data => {
          this.generos = data
        },
        error: err => {
          console.log('No se pueden obtener datos de genero')
        }
      }
    )
  }
  getOcupaciones() {
    this.apiService.getAll(this.url_ocupaciones).subscribe(
      {
        next: data => {
          this.ocupacion = data
        },
        error: err => {
          console.log('No se pueden obtener datos de ocupaciones')
        }
      }
    )
  }
  getEstados() {
    this.apiService.getAll(this.url_estados_civiles).subscribe(
      {
        next: data => {
          this.estado = data
        },
        error: err => {
          console.log('No se pueden obtener datos de estado civil')
        }
      }
    )
  }


}
