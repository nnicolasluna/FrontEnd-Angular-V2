import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentoService } from '../documento-service/documento.service';
import { documento } from '../documento-model/documento';
import { TipoDocumentoService } from '../../tipoDocumento/tipo-documento-service/tipo-documento.service';
@Component({
  selector: 'app-documentocreate',
  templateUrl: './documentocreate.component.html',
  styleUrls: ['./documentocreate.component.scss']
})
export class DocumentocreateComponent {
  uuid!: any;
  tipodocuments: any;
  datos: any[] = [];
  personaFormGroup = new FormGroup(
    {
      uuid: new FormControl(''),
    }
  );
  tipodocFormGroup = new FormGroup(
    {
      uuid: new FormControl(''),
    }
  );
  formGroup = new FormGroup({
    numero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_emision: new FormControl('', /* [Validators.required, Validators.maxLength(30), Validators.minLength(3)] */),
    tipoDocumentos: this.tipodocFormGroup,
    estado: new FormControl(false, [Validators.required]),
    personas: this.personaFormGroup
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
  constructor(
    private router: Router,
    private documentoService: DocumentoService,
    private route: ActivatedRoute,
    private tipoDocumentoService: TipoDocumentoService) { }

  ngOnInit() {
    this.gettipoDoc();
    this.uuid = this.route.snapshot.paramMap.get('id');
  }

  create() {
    if (this.formGroup.valid) {

      this.uuid = this.route.snapshot.paramMap.get('id');
      this.personaFormGroup.value.uuid = this.uuid;
      this.formGroup.value.personas = this.personaFormGroup.value;
      console.log(this.formGroup.value)
      const id = this.route.snapshot.paramMap.get('id');;
      this.documentoService.create(this.formGroup.value as documento).subscribe({

        next: (userData: any) => {
          if (userData) {
            this.router.navigate(['/home/personprofile/', id]);

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

  gettipoDoc() {
    this.tipoDocumentoService.getDocuments().subscribe(
      {
        next: (data) => {
          this.datos = data;
        },
        error: err =>{
          console.log('no se pueden obteneder los datos de tipo de documento')
        }
      }
    );
  }
}
