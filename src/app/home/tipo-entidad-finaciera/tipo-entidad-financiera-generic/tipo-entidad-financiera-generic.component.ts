import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tipoEntidadFinanciera } from '../tipo-entidad-financiera-model/tipo-entidad-financiera';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api-generico/api.service';
import { ModalService } from '../../modal/service/modal.service';

@Component({
  selector: 'app-tipo-entidad-financiera-generic',
  templateUrl: './tipo-entidad-financiera-generic.component.html',
  styleUrls: ['./tipo-entidad-financiera-generic.component.scss']
})
export class TipoEntidadFinancieraGenericComponent {
  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() paises: any[] = [];
  @Input() ciudadData: any;
  @Input() metodoDesdePadre: () => void = () => { };
  
  pais!: any
  ejecutarCreate() {
    if (this.metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.metodoDesdePadre();
    }
  }
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  
  });

  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }

  constructor(
    private metodogenerico: MetodoGenericoService,
    private modalService: ModalService,
    private router: Router,
    private apiService: ApiService<tipoEntidadFinanciera>,
    private route: ActivatedRoute,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ciudadData'] && changes['ciudadData'].currentValue) {
      this.formGroup.patchValue(this.ciudadData);
  
      this.getDatos('paises',this.pais)
    }
  }
  getDatos(param:string, atrib:any){
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
  }

}
