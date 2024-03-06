import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cuidad } from '../cuidad-model/cuidad';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';


@Component({
  selector: 'app-cuidad-form-generic',
  templateUrl: './cuidad-form-generic.component.html',
  styleUrls: ['./cuidad-form-generic.component.scss']
})
export class CuidadFormGenericComponent {
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
    paises: new FormControl('', [Validators.required]),

  });

  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  get paisControl() {
    return this.formGroup.controls.paises;
  }
  constructor(
    private metodogenerico: MetodoGenericoService,
    private apiService: ApiService<cuidad>,
    private route: ActivatedRoute,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ciudadData'] && changes['ciudadData'].currentValue) {
      this.formGroup.patchValue(this.ciudadData);
      this.pais = this.formGroup.value.paises
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
