import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person-service/person.service';
import { person } from '../person-model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api.service';
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
    private personservice: PersonService,
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
  }

  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.formGroup.patchValue(data);
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
          });
        }
      }
    )
  }

  private url = 'personas'
  private url1 = 'ocupaciones'
  private url2 = 'estados_civiles'
  private url3 = 'generos'
  persona!: any
  generos: any[] = [];
  estado: any[] = [];
  ocupacion: any[] = [];
  ocupacionFormGroup = new FormGroup(
    {
      uuid: new FormControl('', Validators.required),
    }
  );
  generoFormGroup = new FormGroup(
    {
      uuid: new FormControl('', Validators.required),
    }
  );
  estadoFormGroup = new FormGroup(
    {
      uuid: new FormControl('', Validators.required),
    }
  );
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    genero: this.generoFormGroup,
    ocupacion: this.ocupacionFormGroup,
    estado_civil: this.estadoFormGroup,
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

  get fnacimientoControl() {
    return this.formGroup.controls.fecha_nacimiento;
  }
  get lnacimientoControl() {
    return this.formGroup.controls.lugar_nacimiento;
  }
  get ocupacionControl() {
    return this.ocupacionFormGroup.controls.uuid;
  }
  get estadoControl() {
    return this.estadoFormGroup.controls.uuid;
  }
  get generoControl() {
    return this.generoFormGroup.controls.uuid;
  }
  get celularControl() {
    return this.formGroup.controls.celular;
  }
}
