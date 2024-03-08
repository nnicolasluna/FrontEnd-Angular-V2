import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { agencia } from '../agencia-model/agencia';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';


@Component({
  selector: 'app-agencia-generic',
  templateUrl: './agencia-generic.component.html',
  styleUrls: ['./agencia-generic.component.scss']
})
export class AgenciaGenericComponent {
  @Input() url_endpoint_agencia: string = '';
  @Input() titulo_operacion: string = '';
  @Input() subtitulo_operacion: string = '';
  @Input() link_boton_regresar: string = '';
  @Input() registros_ciudades: any[] = [];
  @Input() datos_recuperados_agencia: any;
  @Input() ejecutar_metodoDesdePadre: () => void = () => { };
  private matDialogRef!: any;
  ciudad!: any
  ejecutarCreate() {
    if (this.ejecutar_metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.ejecutar_metodoDesdePadre();
    }

  }
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    ciudades: new FormControl('', [Validators.required]),
  });

  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  get direccionControl() {
    return this.formGroup.controls.direccion;
  }
  get telefonoControl() {
    return this.formGroup.controls.telefono;
  }
  get ciudadesControl() {
    return this.formGroup.controls.ciudades;
  }
  constructor(
    private metodogenerico: MetodoGenericoService,
    private router: Router,
    private apiService: ApiService<agencia>,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos_recuperados_agencia'] && changes['datos_recuperados_agencia'].currentValue) {
      this.formGroup.patchValue(this.datos_recuperados_agencia);
      this.ciudad = this.formGroup.value.ciudades

      this.getDatos('ciudades', this.formGroup.value.ciudades)

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
