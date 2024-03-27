import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { SubsistemaService } from '../subsistema-service/subsistema.service';
import { subsistema } from '../subsistema-model/subsistema';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
@Component({
  selector: 'app-subsiscreate',
  templateUrl: './subsiscreate.component.html',
  styleUrls: ['./subsiscreate.component.scss']
})
export class SubsiscreateComponent {
  url_subsistemas = 'administracion/subsistemas'
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    icono: new FormControl(''),
    estado: new FormControl(true),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  } get descripcionControl() {
    return this.formGroup.controls.descripcion;
  } get linkControl() {
    return this.formGroup.controls.link;
  }
  get estadoControl() {
    return this.formGroup.controls.estado;
  }
  constructor( 
    private router: Router,
    private apiService: ApiService<subsistema>,
    ){}

    
  create() {
    if (this.formGroup.valid) {
      this.apiService.create(this.url_subsistemas, this.formGroup.value as subsistema).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/administracion/subsistemas');
            this.formGroup.reset();
          
        },
        }
      )
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
}
