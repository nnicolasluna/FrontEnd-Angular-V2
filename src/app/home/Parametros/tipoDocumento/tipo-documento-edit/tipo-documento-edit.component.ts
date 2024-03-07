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
  paisFormGroup = new FormGroup({
    uuid: new FormArray([]),
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
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
  constructor(
    private router: Router,
    private tipoDocumentoService: TipoDocumentoService,
    private route: ActivatedRoute,
    private apiService: ApiService<tipoDocumento>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid;
      /*  this.tipoDocumentoService.update(this.formGroup.value as tipoDocumento,this.uuid ).subscribe({
         next: (userData: any) => {
             this.router.navigateByUrl('/home/administracion/tipodocumentolist');
             this.formGroup.reset();
         },
       }); */
      this.apiService.update(this.url1, this.uuid, this.formGroup.value as tipoDocumento).subscribe(
        {
          next: (userData: any) => {
            this.router.navigateByUrl('/home/parametros/tipodocumentolist');
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
  /*   this.tipoDocumentoService.getDocument(this.uuid).subscribe((data) => {
      this.datos = data;
      this.formGroup.patchValue(data);
    }); */
    this.apiService.getOne(this.url1,this.uuid).subscribe(
      {
        next: data =>{
          this.datos = data;
      this.formGroup.patchValue(data);
        }
      }
    )
  }
}
