import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api-generico/api.service';
import { cuentaBancaria } from '../cuenta-bancaria-model/cuenta-bancaria';
import { ModalService } from '../../modal/service/modal.service';

@Component({
  selector: 'app-cuenta-bancaria-generic',
  templateUrl: './cuenta-bancaria-generic.component.html',
  styleUrls: ['./cuenta-bancaria-generic.component.scss']
})
export class CuentaBancariaGenericComponent {
  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() agencias: any[] = [];
  @Input() monedas: any[] = [];
  @Input() entidadfinancieras: any[] = [];
  @Input() tipocuentas: any[] = [];
  @Input() Data: any;
  @Input() metodoDesdePadre: () => void = () => { };
  private matDialogRef!: any;
  moneda!: any  
  agencia!:any
  entidadfinanciera!:any
  tipocuenta!:any
  ejecutarCreate() {
    if (this.metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.metodoDesdePadre();
    }

  }
  formGroup = new FormGroup({
    numero_cuenta: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    fecha_apertura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    contrato: new FormControl('', [Validators.required]),
    tipoCuentasBancarias: new FormControl('', [Validators.required]),
    entidadesFinancieras: new FormControl('',[Validators.required]),
    monedas: new FormControl('',[Validators.required]),
    agencias: new FormControl('',[Validators.required]),
  });
  get numero_cuentaControl() {
    return this.formGroup.controls.numero_cuenta;
  }
  get fecha_aperturaControl() {
    return this.formGroup.controls.fecha_apertura;
  }
  get contratoControl() {
    return this.formGroup.controls.contrato;
  }
  get tipoCuentasBancariasControl() {
    return this.formGroup.controls.tipoCuentasBancarias;
  }
  get entidadesFinancierasControl() {
    return this.formGroup.controls.entidadesFinancieras;
  }
  get monedasControl() {
    return this.formGroup.controls.monedas;
  }
  get agenciasControl() {
    return this.formGroup.controls.agencias;
  }
  constructor(
    private metodogenerico: MetodoGenericoService,
    private router: Router,
    private apiService: ApiService<cuentaBancaria>,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Data'] && changes['Data'].currentValue) {
      this.formGroup.patchValue(this.Data);
      this.moneda = this.formGroup.value.monedas
      this.agencia = this.formGroup.value.agencias
      this.entidadfinanciera = this.formGroup.value.entidadesFinancieras
      this.tipocuenta = this.formGroup.value.tipoCuentasBancarias
      this.getDatos('monedas', this.moneda)
      this.getDatos('agencias', this.agencia)
      this.getDatos('entidadesFinancieras', this.entidadfinanciera)
      this.getDatos('tipoCuentasBancarias', this.tipocuenta)
    }
  }
  getDatos(param: string, atrib: any) {
    const control = this.formGroup.get(param);
    if (control) {
      const UUID = atrib.uuid;
      control.setValue(UUID);
    }
  }
}
