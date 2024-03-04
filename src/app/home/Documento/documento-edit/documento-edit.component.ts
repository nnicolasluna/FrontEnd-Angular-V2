import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentoService } from '../documento-service/documento.service';
import { documento } from '../documento-model/documento';
import { TipoDocumentoService } from '../../tipoDocumento/tipo-documento-service/tipo-documento.service';
@Component({
  selector: 'app-documento-edit',
  templateUrl: './documento-edit.component.html',
  styleUrls: ['./documento-edit.component.scss']
})
export class DocumentoEditComponent {
  uuid!: any;
  tipodocuments: any;
  datos: any[] = [];
  personaFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  tipodocFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    numero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_emision: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
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
    this. getdocumento();
  }
  uuidx!: any;
  create() {
    if (this.formGroup.valid) {
      this.uuidx = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid=this.uuidx;
      this.formGroup.value.personas = this.personaFormGroup.value;
      console.log(this.formGroup.value)
      
      this.documentoService.update(this.formGroup.value as documento,this.uuidx).subscribe({

        next: (userData: any) => {
          if (userData) {
            this.router.navigate(['/home/personprofile/', this,this.formGroup.value.personas?.uuid]);

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
    this.tipoDocumentoService.getDocuments().subscribe((data) => {
      console.log(data);
      this.datos = data;

    });
  }

  getdocumento() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.documentoService.getdocumento(this.uuid).subscribe((data) => {
      console.log(data);
      this.datos = data;
      this.formGroup.patchValue(data);
    });
  }

}
