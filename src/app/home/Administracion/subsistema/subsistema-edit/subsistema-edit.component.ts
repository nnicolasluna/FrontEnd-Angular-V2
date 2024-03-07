import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { SubsistemaService } from '../subsistema-service/subsistema.service';
import { subsistema } from '../subsistema-model/subsistema';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
@Component({
  selector: 'app-subsistema-edit',
  templateUrl: './subsistema-edit.component.html',
  styleUrls: ['./subsistema-edit.component.scss']
})
export class SubsistemaEditComponent {
  url = 'administracion/subsistemas'
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    icono: new FormControl(''),
    estado: new FormControl(),
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
    private apiService: ApiService<subsistema>,
  ) { }


  create() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid;
      this.susbistema.update(this.uuid, this.formGroup.value as subsistema).subscribe({

        next: (userData: any) => {
          this.router.navigateByUrl('/home/subsistemalist');
          this.formGroup.reset();
        },
      });
      this.apiService.update(this.url, this.uuid, this.formGroup.value as subsistema).subscribe(
        {
          next: (userData: any) => {
            this.router.navigateByUrl('/home/subsistemalist');
            this.formGroup.reset();
          },
        }
      )
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
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(data);
        }
      }
    )
    /*     this.susbistema.getSub(this.uuid).subscribe((data) => {
          this.datos = data;
          console.log(this.datos)
          this.formGroup.patchValue(data);
        }); */

  }
}
