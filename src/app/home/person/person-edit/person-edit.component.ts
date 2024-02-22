import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { PersonService } from '../person-service/person.service';
import { person } from '../person-model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from '../../modal/service/modal.service';
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
  ) { }

  update() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid;

      this.personservice.update(this.formGroup.value as person, this.uuid).subscribe({
        next: (userData: any) => {
          this.router.navigate(['/home/personprofile/', this.uuid]);
          this.formGroup.reset();
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
          
          });
        }
      });
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }


  ngOnInit() {
    this.getPerson();
  }

  getPerson() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.personservice.getPerson(this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(data);
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
          });
        }
      }
    );
  }

  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    estado_civil: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_nacimiento: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    genero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    ocupacion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
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
  get ecivilControl() {
    return this.formGroup.controls.estado_civil;
  }
  get fnacimientoControl() {
    return this.formGroup.controls.fecha_nacimiento;
  }
  get lnacimientoControl() {
    return this.formGroup.controls.lugar_nacimiento;
  }
  get generoControl() {
    return this.formGroup.controls.genero;
  }
  get ocupacionControl() {
    return this.formGroup.controls.ocupacion;
  }
  get celularControl() {
    return this.formGroup.controls.celular;
  }
}
