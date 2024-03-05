import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDocumentoService } from '../tipo-documento-service/tipo-documento.service';
import { tipoDocumento } from '../tipo-documento-model/tipoDocumento';
import { ApiService } from '../../service/api-generico/api.service';
import { pais } from '../../pais/pais-model/pais';

@Component({
  selector: 'app-tipo-documento-create',
  templateUrl: './tipo-documento-create.component.html',
  styleUrls: ['./tipo-documento-create.component.scss']
})
export class TipoDocumentoCreateComponent {
  private url ='paises'
  paises: any[] = [];
  paisFormGroup = new FormGroup({
    uuid: new FormArray([]),
  });
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    estado: new FormControl(true),
    /* paises: this.paisFormGroup */
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
    private apiService: ApiService<pais>,

    ){}
  
  create() {
    if (this.formGroup.valid) {
      /* this.formGroup.value.paises = this.paisFormGroup.value; */
      console.log(this.formGroup.value)
      this.tipoDocumentoService.createTipoDoc(this.formGroup.value as tipoDocumento).subscribe({
        
        next: (userData:any) => {
          if (userData) {
            this.router.navigateByUrl('/home/tipo-documento-list');
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
  getPaises() {
    this.apiService.getAll(this.url).subscribe({
      next:data=>{
        this.paises = data;
      }
    })
  
  }
  ngOnInit() {
    this.getPaises();
  }
}
