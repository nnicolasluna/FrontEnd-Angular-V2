import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentoService } from '../documento-service/documento.service';
import { documento } from '../documento-model/documento';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-documento-edit',
  templateUrl: './documento-edit.component.html',
  styleUrls: ['./documento-edit.component.scss']
})
export class DocumentoEditComponent {
  uuid!: any;
  private url2 = 'administracion/documentos'
  private url1 = 'administracion/tipo_documentos'
  tipodocuments: any;
  datos: any[] = [];
  personaFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  tipodocFormGroup = new FormGroup({
    uuid: new FormControl('', [Validators.required]),
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    numero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_emision: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    tipoDocumentos: this.tipodocFormGroup,
    estado: new FormControl(),
    personas: this.personaFormGroup,

  });
  get numeroControl() {
    return this.formGroup.controls.numero;
  }
  get lugarControl() {
    return this.formGroup.controls.lugar_emision;
  }
  get estadoControl() {
    return this.formGroup.controls.estado;
  }
  get tipodoc() {
    return this.tipodocFormGroup.controls.uuid;
  }
  constructor(
    private router: Router,
    private documentoService: DocumentoService,
    private route: ActivatedRoute,

    private apiService: ApiService<documento>,) { }

  ngOnInit() {
    this.gettipoDoc();
    this.getdocumento();
  }
  uuidx!: any;
  create() {
    if (this.formGroup.valid) {
      this.uuidx = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuidx;
      this.formGroup.value.personas = this.personaFormGroup.value;

     /*  this.documentoService.update(this.formGroup.value as documento, this.uuidx).subscribe({

        next: (userData: any) => {
          if (userData) {
            this.router.navigate(['/home/personprofile/', this, this.formGroup.value.personas?.uuid]);

            this.formGroup.reset();
          }
          else {
            alert("Datos Incorrectos, Verifique sus datos");
          }
        },
      }); */
      this.apiService.update(this.url2, this.uuidx, this.formGroup.value as documento).subscribe(
        {
          next: (data) => {
            this.router.navigate(['/home/administracion/personprofile/', this, this.formGroup.value.personas?.uuid]);

            this.formGroup.reset();

          },
         
        }
      );
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  gettipoDoc() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
          this.datos = data
        },

      }
    )

  }

  getdocumento() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url2, this.uuid).subscribe(
      {
        next: data => {
          this.formGroup.patchValue(data);
        },

      }
    );
    /*    this.documentoService.getdocumento(this.uuid).subscribe((data) => {
         console.log(data);
         this.datos = data;
         this.formGroup.patchValue(data);
       }); */
  }

}
