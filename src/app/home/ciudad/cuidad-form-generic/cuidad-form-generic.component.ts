import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cuidad } from '../cuidad-model/cuidad';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-cuidad-form-generic',
  templateUrl: './cuidad-form-generic.component.html',
  styleUrls: ['./cuidad-form-generic.component.scss']
})
export class CuidadFormGenericComponent {
  private matDialogRef!: any;

  private url1 = 'paises'
  @Input() url: string = '';
  @Input() operacion: string = '';
  @Input() editar: string = '';
  @Input() regreso: string = '';
  @Input() paises: any[] = [];
  @Input() metodoDesdePadre: () => void = () => {};
  constructor(
    private metodogenerico: MetodoGenericoService,
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<cuidad>,
    
  ) { }
  ejecutarCreate() {
    if (this.metodoDesdePadre) {
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
  
  ngOnInit(): void {
   
    this.metodogenerico.setFormGroup(this.formGroup)
  }

}
