import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DocumentoService } from '../documento-service/documento.service';
import { documento, documentoDTO } from '../documento-model/documento';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-documento-edit',
  templateUrl: './documento-edit.component.html',
  styleUrls: ['./documento-edit.component.scss']
})
export class DocumentoEditComponent {
  uuid_documento!: any;
  uuid_persona!: string
  private url_endpoint_documentos = 'administracion/documentos'
  private url_endpoitn_tipoDocumentos = 'parametros/tipo_documentos'
  boton_cancelar='/home/administracion/personprofile/'
  registro_datos_tipoDocumento: any[] = [];
  documento_obtenido!: any;

  formGroup = new FormGroup({
    uuid: new FormControl(''),
    numero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_emision: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    tipoDocumentos: new FormControl(''),
    estado: new FormControl(),
    personas: new FormControl('')

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
    return this.formGroup.controls.tipoDocumentos;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService<any>,) { }

  ngOnInit() {
    this.gettipoDoc();
    this.getdocumento();
  }

  create() {
    if (this.formGroup.valid) {
      this.uuid_documento = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid_documento;
      this.formGroup.value.personas = this.documento_obtenido.personas
      this.apiService.update(this.url_endpoint_documentos, this.uuid_documento, this.formGroup.value as documento).subscribe(
        {
          next: () => {

            const navigationExtras: NavigationExtras = {
              queryParams: { tabIndex: 2 }
            };
            this.formGroup.reset();
            this.router.navigate(['/home/administracion/personprofile/', this.documento_obtenido.personas.uuid], navigationExtras);
          },

        }
      );
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  gettipoDoc() {
    this.apiService.getAll(this.url_endpoitn_tipoDocumentos).subscribe(
      {
        next: data => {

          this.registro_datos_tipoDocumento = data
        },

      }
    )

  }

  getdocumento() {
    this.uuid_documento = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url_endpoint_documentos, this.uuid_documento).subscribe(
      {
        next: data => {

          this.documento_obtenido = data
          this.uuid_persona = this.documento_obtenido.personas.uuid
          this.formGroup.patchValue(data);
          this.getDatos('tipoDocumentos', this.formGroup.value.tipoDocumentos)

        },

      }
    );
  }
  getDatos(param: string, atrib: any) {
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
  }
}
