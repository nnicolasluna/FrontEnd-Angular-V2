import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { corte } from '../corte-model/corte';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api-generico/api.service';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-corte-generic',
  templateUrl: './corte-generic.component.html',
  styleUrls: ['./corte-generic.component.scss']
})
export class CorteGenericComponent {
  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() monedas: any[] = [];
  @Input() tipoCortes: any[] = [];
  @Input() Data: any;
  @Input() metodoDesdePadre: () => void = () => { };
  private matDialogRef!: any;
  moneda!: any
  tipoCorte!: any
  ejecutarCreate() {
    if (this.metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.metodoDesdePadre();
    }

  }
  formGroup = new FormGroup({
    valor: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    orden: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    monedas: new FormControl('', [Validators.required]),
    tipoCortes: new FormControl('', [Validators.required]),

  });

  get valorControl() {
    return this.formGroup.controls.valor;
  }
  get ordenControl() {
    return this.formGroup.controls.orden;
  }
  get monedasControl() {
    return this.formGroup.controls.monedas;
  }
  get tipoCortesControl() {
    return this.formGroup.controls.tipoCortes;
  }
  constructor(
    private metodogenerico: MetodoGenericoService,
    private router: Router,
    private apiService: ApiService<corte>,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ciudadData'] && changes['ciudadData'].currentValue) {
      this.formGroup.patchValue(this.Data);
      this.moneda = this.formGroup.value.monedas
      this.tipoCorte = this.formGroup.value.tipoCortes
      this.getDatos('monedas', this.moneda)
      this.getDatos('tipo_cortes', this.tipoCorte)
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
