import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoDocumentoService } from '../tipo-documento-service/tipo-documento.service';
import { tipoDocumento } from '../tipo-documento-model/tipoDocumento';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
@Component({
  selector: 'app-tipo-documento-edit',
  templateUrl: './tipo-documento-edit.component.html',
  styleUrls: ['./tipo-documento-edit.component.scss']
})
export class TipoDocumentoEditComponent {
  private url = 'parametros/paises'
  private url1 = 'parametros/tipo_documentos'
  paises: any[] = [];
  /*   paisFormGroup = new FormGroup({
      uuid: new FormArray([]),
    }); */
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    paises: new FormControl(''),
    estado: new FormControl(),

  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  get estadoControl() {
    return this.formGroup.controls.estado;
  }
  get paisesControl() {
    return this.formGroup.controls.paises;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService<tipoDocumento>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid;
      this.apiService.update(this.url1, this.uuid, this.formGroup.value as tipoDocumento).subscribe(
        {
          next: (userData: any) => {
            this.router.navigateByUrl('/home/parametros/tipo-documento-list');
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

    this.getTipoDoc();
  }
  datos: any;
  uuid!: any;

  getTipoDoc() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url1, this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(data);
          this.getDatos('paises', this.formGroup.value.paises)
        }
      }
    )
    this.apiService.getAll(this.url).subscribe({
      next: data => {
        this.paises = data;
      }
    })
  }
  getDatos(param: string, atrib: any) {
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
  }
}
