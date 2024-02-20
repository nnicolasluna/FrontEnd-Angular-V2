import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { PersonService } from '../person-service/person.service';
import { Router } from '@angular/router';
import { person } from '../person-model/person';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-personcreate',
  templateUrl: './personcreate.component.html',
  styleUrls: ['./personcreate.component.scss']
})
export class PersoncreateComponent {
  private matDialogRef!: any;
  formGroup = new FormGroup({
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

  constructor(
    private router: Router,
    private personservice: PersonService,
    private modalService: ModalService,
  ) { }

  create() {
    if (this.formGroup.valid) {

      this.personservice.create(this.formGroup.value as person).subscribe({

        next: () => {
          this.router.navigateByUrl('/home/personlist');
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


}
