import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DocumentoService } from '../documento-service/documento.service';
import { documento } from '../documento-model/documento';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTab } from '@angular/material/tabs';
import { ApiService } from 'src/app/home/service/api-generico/api.service';


interface CustomMatTab extends MatTab {
  id: string;
}
@Component({
  selector: 'app-documentocreate',
  templateUrl: './documentocreate.component.html',
  styleUrls: ['./documentocreate.component.scss']
})
export class DocumentocreateComponent {
  private url2 = 'administracion/documentos'
  private url1 = 'parametros/tipo_documentos'
  private url='/home/administracion/personprofile'
  uuid!: any;
  tipodocuments: any;
  datos: any[] = [];
 
  @ViewChild('tabGroup') tabGroup?: MatTabGroup;
  personaFormGroup = new FormGroup(
    {
      uuid: new FormControl(''),
    }
  );
/*   tipodocFormGroup = new FormGroup(
    {
      uuid: new FormControl('',[Validators.required]),
    }
  ); */
  formGroup = new FormGroup({
    numero: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    lugar_emision: new FormControl(''),
    tipoDocumentos: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
    personas: this.personaFormGroup
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
    private documentoService: DocumentoService,
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
      this.personaFormGroup.value.uuid = this.uuid;
      this.formGroup.value.personas = this.personaFormGroup.value;
      const id = this.route.snapshot.paramMap.get('id');;
      this.apiService.create(this.url2, this.formGroup.value as documento).subscribe(
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
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
          this.datos = data
        },
    
      }
    )

  }
}
