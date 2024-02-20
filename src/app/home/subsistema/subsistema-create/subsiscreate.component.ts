import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { SubsistemaService } from '../subsistema-service/subsistema.service';
import { subsistema } from '../subsistema-model/subsistema';
@Component({
  selector: 'app-subsiscreate',
  templateUrl: './subsiscreate.component.html',
  styleUrls: ['./subsiscreate.component.scss']
})
export class SubsiscreateComponent {
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    icono: new FormControl(''),
    estado: new FormControl(false, [Validators.required]),
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
  constructor( private router: Router,private personservice: SubsistemaService){}

    
  create() {
    if (this.formGroup.valid) {

      this.personservice.create(this.formGroup.value as subsistema).subscribe({
        
        next: (userData:any) => {
          if (userData) {
            this.router.navigateByUrl('/home/subsistemalist');
            this.formGroup.reset();
          }
          else {
            alert("Datos Incorrectos, Verifique sus datos");
          }
        },
      });
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
}
