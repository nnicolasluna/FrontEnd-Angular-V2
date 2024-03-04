import { Component, Input, SimpleChanges } from '@angular/core';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { ModalService } from '../../modal/service/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api-generico/api.service';
import { tipoCuenta } from '../tipo-cuentas-bancarias-model/tipo-cuentas-bancarias';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-cuentas-bancarias-generic',
  templateUrl: './tipo-cuentas-bancarias-generic.component.html',
  styleUrls: ['./tipo-cuentas-bancarias-generic.component.scss']
})
export class TipoCuentasBancariasGenericComponent {
  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() Data: any;
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
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }

  constructor(
    private metodogenerico: MetodoGenericoService,
    private modalService: ModalService,
    private router: Router,
    private apiService: ApiService<tipoCuenta>,
    private route: ActivatedRoute,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Data'] && changes['Data'].currentValue) {
      this.formGroup.patchValue(this.Data);
  
      this.getDatos('tipo_entidades_financieras',this.pais)
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
