import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { agencia } from '../agencia-model/agencia';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';

interface Ciudad {
  uuid: string;
  nombre: string;
  abreviatura: string;
  estado: boolean;
  paises: any;
}

interface Pais {
  uuid: string;
  nombre: string;
  nacionalidad: string;
  bandera: string;
  opera: boolean;
  estado: boolean;
  ciudades: Ciudad[] | null;
}

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
  @Input() registros_paises: any[] = [];
  @Input() datos_recuperados_agencia: any;
  @Input() ejecutar_metodoDesdePadre: () => void = () => { };
  private matDialogRef!: any;
  ciudad!: any
  paises!: any
  private url_endpoint_paises = 'parametros/paises'
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
    paises: new FormControl('', [Validators.required]),
    ciudades: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
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
  get paisesControl() {
    return this.formGroup.controls.paises;
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
      console.log(this.datos_recuperados_agencia)
      this.getDatos('paises', this.formGroup.value.paises)
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
  getall() {
    this.apiService.getAll(this.url_endpoint_paises + '/con-ciudades').subscribe(
      {
        next: data => {
          this.registros_paises = data

        }
      }
    )
  }
  paisSeleccionado: Pais | null = null;
  ciudadesPorPais: Ciudad[] = [];

    onPaisChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const paisUuid = selectElement.value;
      this.registros_ciudades = [];
      const paisSeleccionado = this.registros_paises.find(pais => pais.uuid === paisUuid);
      if (paisSeleccionado && paisSeleccionado.ciudades) {
          this.registros_ciudades = paisSeleccionado.ciudades;
      } else {
          this.registros_ciudades = [];
      }
  }



}
