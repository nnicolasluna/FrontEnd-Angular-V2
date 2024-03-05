import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ApiService } from '../../service/api-generico/api.service';
import { person } from '../person-model/person';

@Component({
  selector: 'app-personcreate',
  templateUrl: './personcreate.component.html',
  styleUrls: ['./personcreate.component.scss']
})
export class PersoncreateComponent {
  private matDialogRef!: any;
  private url = 'personas'
  private url1 = 'ocupaciones'
  private url2 = 'estados_civiles'
  private url3 = 'generos'
  generos: any[] = [];
  estado: any[] = [];
  ocupacion: any[] = [];

  formGroup = new FormGroup({
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

  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<person>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url, this.formGroup.value as person).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/personlist');
            this.formGroup.reset();
          },
          error: err => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
            });
          }
        }
      );
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.getGeneros();
    this.getEstados();
    this.getOcupaciones();
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


}
