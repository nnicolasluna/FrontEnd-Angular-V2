import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api-generico/api.service';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { TipoCorte } from '../tipo-corte-model/tipo-corte';

@Component({
  selector: 'app-tipo-corte-generic',
  templateUrl: './tipo-corte-generic.component.html',
  styleUrls: ['./tipo-corte-generic.component.scss']
})
export class TipoCorteGenericComponent {

  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() Data: any;
  @Input() metodoDesdePadre: () => void = () => { };


  ejecutarCreate() {
    if (this.metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.metodoDesdePadre();
    }
    else{
      console.log('nada papi')
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
    private router: Router,
    private apiService: ApiService<TipoCorte>,
    private route: ActivatedRoute,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Data'] && changes['Data'].currentValue) {
      this.formGroup.patchValue(this.Data);

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
