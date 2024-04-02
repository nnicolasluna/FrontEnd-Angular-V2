import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DocumentoService } from '../documento-service/documento.service';
import { documento } from '../documento-model/documento';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTab } from '@angular/material/tabs';
import { ApiService } from 'src/app/home/service/api-generico/api.service';


@Component({
  selector: 'app-documentocreate',
  templateUrl: './documentocreate.component.html',
  styleUrls: ['./documentocreate.component.scss']
})
export class DocumentocreateComponent {
  private url_endpoint_documentos = 'administracion/documentos'
  private url_endpoint_tipoDocumentos = 'parametros/tipo_documentos'
  private url='/home/administracion/personprofile'
  uuid!: any;
  boton_cancelar='/home/administracion/personprofile/'
  tipodocuments: any;
  datos: any[] = [];
 
  @ViewChild('tabGroup') tabGroup?: MatTabGroup;
  formGroup = new FormGroup({
    numero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_emision: new FormControl(''),
    tipoDocumentos: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
    personas: new FormControl(''),
  });
  get numeroControl() {
    return this.formGroup.controls.numero;
  }
  get lugarControl() {
    return this.formGroup.controls.lugar_emision;
  }
  get tipodoc() {
    return this.formGroup.controls.tipoDocumentos;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef,
    private apiService: ApiService<documento>,
    ) { }

  ngOnInit() {
    this.gettipoDoc();
    this.uuid = this.route.snapshot.paramMap.get('id');
  }
  onSelectChange(event: any) {

    this.cdr.detectChanges();
  }
  create() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
    /*   this.personaFormGroup.value.uuid = this.uuid; */
      this.formGroup.value.personas = this.uuid;
      const id = this.route.snapshot.paramMap.get('id');;
      console.log(this.formGroup.value)
      this.apiService.create(this.url_endpoint_documentos, this.formGroup.value as documento).subscribe(
        {
          next: () => {
           
            const navigationExtras: NavigationExtras = {
              queryParams: { tabIndex: 2 } // Establece el índice de la pestaña que deseas seleccionar
            };
            this.router.navigate(['/home/administracion/personprofile/', id],navigationExtras)
            this.formGroup.reset();
          },
      
        }
      )
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  volverA(identificador: string) {
    if (this.tabGroup) {
      const tab = (this.tabGroup._tabs.find(t => (t as any).id === identificador) as any);
      if (tab) {
        this.tabGroup.selectedIndex = this.tabGroup._tabs.toArray().indexOf(tab);
      }
    }
  }
  gettipoDoc() {
    this.apiService.getAll(this.url_endpoint_tipoDocumentos).subscribe(
      {
        next: data => {
          this.datos = data
        },
    
      }
    )

  }
}
