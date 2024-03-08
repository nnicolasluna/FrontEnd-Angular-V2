import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person-service/person.service';
import { person, personDTO } from '../person-model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent {
  datos: any;
  uuid!: any;
  private matDialogRef!: any;
  private url_personas = 'administracion/personas'
  private url_ocupaciones = 'parametros/ocupaciones'
  private url_estados_civiles = 'parametros/estados_civiles'
  private url_generos = 'parametros/generos'
  persona!: personDTO
  estadosCiviles_recuperado!: any
  ocuapaciones_recuperado!: any
  genero_recuperado!: any
  generos: any[] = [];
  estado: any[] = [];
  ocupacion: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private apiService: ApiService<person>,
  ) { }

  update() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid;
      this.apiService.update(this.url_personas, this.uuid, this.formGroup.value as person).subscribe(
        {
          next: () => {
            this.router.navigate(['/home/administracion/personprofile/', this.uuid]);
            this.formGroup.reset();
          },
          error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(
              () => {
              }
            );
          }
        });
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }


  ngOnInit() {
    this.get_persona();
    this.getGeneros();
    this.getEstados();
    this.getOcupaciones();
  }

  get_persona() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url_personas, this.uuid).subscribe(
      {
        next: data => {

          this.formGroup.patchValue(data);
          this.patchValue_select('generos',this.formGroup.value.generos)
          this.patchValue_select('estadosCiviles',this.formGroup.value.estadosCiviles)
          this.patchValue_select('ocupaciones',this.formGroup.value.ocupaciones)

        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
          });
        }
      }
    )
  }
  patchValue_select(param:string, atrib:any){
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
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

  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    generos: new FormControl('', [Validators.required]),
    ocupaciones: new FormControl('', [Validators.required]),
    estadosCiviles: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    estado: new FormControl(),
  });

  get nombreControl() {
    return this.formGroup.controls.nombres;
  }
  get papellidoControl() {
    return this.formGroup.controls.primer_apellido;
  }
  get sapellidoControl() {
    return this.formGroup.controls.segundo_apellido;
  }
  get ocupacionControl() {
    return this.formGroup.controls.ocupaciones;
  }
  get estadoControl() {
    return this.formGroup.controls.estadosCiviles;
  }
  get generoControl() {
    return this.formGroup.controls.generos;
  }
  get fnacimientoControl() {
    return this.formGroup.controls.fecha_nacimiento;
  }
  get lnacimientoControl() {
    return this.formGroup.controls.lugar_nacimiento;
  }
  get celularControl() {
    return this.formGroup.controls.celular
  }

}
