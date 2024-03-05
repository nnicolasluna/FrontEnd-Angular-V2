import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { SubsistemaService } from '../subsistema-service/subsistema.service';
import { subsistema } from '../subsistema-model/subsistema';
@Component({
  selector: 'app-subsistema-edit',
  templateUrl: './subsistema-edit.component.html',
  styleUrls: ['./subsistema-edit.component.scss']
})
export class SubsistemaEditComponent {
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    icono: new FormControl(''),
    estado: new FormControl(true, [Validators.required]),
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
    private susbistema: SubsistemaService,
    private route: ActivatedRoute,
    ) { }


  create() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid=this.uuid;
      this.susbistema.update(this.uuid,this.formGroup.value as subsistema).subscribe({

        next: (userData: any) => {
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
  ngOnInit() {
    this.getsubsistema();
  }
  datos: any;
  uuid!: any;

  getsubsistema() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.susbistema.getSub(this.uuid).subscribe((data) => {
      this.datos = data;
      console.log(this.datos)
      this.formGroup.patchValue(data);
    });
  }
}
