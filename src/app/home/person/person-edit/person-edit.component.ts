import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person-service/person.service';
import { person } from '../person-model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent {
  datos: any;
  uuid!: any;
  private matDialogRef!: any;


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
      this.apiService.update(this.url, this.uuid, this.formGroup.value as person).subscribe(
        {
          next: () => {
            this.router.navigate(['/home/personprofile/', this.uuid]);
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
    this.getOne();
    this.getGeneros();
    this.getEstados();
    this.getOcupaciones();
  }

  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          console.log(data)
          this.formGroup.patchValue(data);

          this.estadosCiviles = this.formGroup.value.estadosCiviles
          this.ocuapaciones = this.formGroup.value.ocupaciones
          this.genero = this.formGroup.value.generos
          this.getDatos('generos',this.genero)
          this.getDatos('estadosCiviles',this.estadosCiviles)
          this.getDatos('ocupaciones',this.ocuapaciones)

        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
          });
        }
      }
    )
  }
  getDatos(param:string, atrib:any){
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
  }
  getGeneros() {
    this.apiService.getAll(this.url3).subscribe(
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
    this.apiService.getAll(this.url1).subscribe(
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
    this.apiService.getAll(this.url2).subscribe(
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

  private url = 'personas'
  private url1 = 'ocupaciones'
  private url2 = 'estados_civiles'
  private url3 = 'generos'
  persona!: any
  estadosCiviles!: any
  ocuapaciones!: any
  genero!: any
  generos: any[] = [];
  estado: any[] = [];
  ocupacion: any[] = [];
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
