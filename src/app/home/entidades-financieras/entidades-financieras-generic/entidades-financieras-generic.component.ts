import { Component, Input, SimpleChanges } from '@angular/core';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { entidadesFinancieras } from '../entidades-financieras-model/entidades-financieras';
import { ApiService } from '../../service/api-generico/api.service';
import { ModalService } from '../../modal/service/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entidades-financieras-generic',
  templateUrl: './entidades-financieras-generic.component.html',
  styleUrls: ['./entidades-financieras-generic.component.scss']
})
export class EntidadesFinancierasGenericComponent {
  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() tipoEntidad: any[] = [];
  @Input() Data: any;
  @Input() metodoDesdePadre: () => void = () => { };
  private matDialogRef!: any;
  tipo!: any

  ejecutarCreate() {
    if (this.metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.metodoDesdePadre();
    }

  }
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    descripcion: new FormControl('', [Validators.required]),
    tipoEntidadesFinancieras: new FormControl('', [Validators.required]),

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
  get tipoEntidadesFinancierasControl() {
    return this.formGroup.controls.tipoEntidadesFinancieras;
  }
  constructor(
    private metodogenerico: MetodoGenericoService,
    private router: Router,
    private apiService: ApiService<entidadesFinancieras>,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Data'] && changes['Data'].currentValue) {
      this.formGroup.patchValue(this.Data);
      this.tipo = this.formGroup.value.tipoEntidadesFinancieras
      console.log(this.tipo)
      this.getDatos('tipoEntidadesFinancieras', this.tipo)
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
