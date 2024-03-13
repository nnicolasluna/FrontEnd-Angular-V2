import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { agencia } from 'src/app/home/Parametros/agencia/agencia-model/agencia';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-foto-generic',
  templateUrl: './foto-generic.component.html',
  styleUrls: ['./foto-generic.component.scss']
})
export class FotoGenericComponent {
  @Input() url_endpoint_foto: string = '';
  @Input() titulo_operacion: string = '';
  @Input() subtitulo_operacion: string = '';
  @Input() link_boton_regresar: string = '';
  @Input() datos_recuperados_foto: any;
  @Input() ejecutar_metodoDesdePadre: () => void = () => { };
  ciudad!: any
  ejecutarCreate() {
    if (this.ejecutar_metodoDesdePadre) {
      this.metodogenerico.setFormGroup(this.formGroup)
      this.ejecutar_metodoDesdePadre();
    }

  }
  formGroup = new FormGroup({
    foto: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    estado: new FormControl(true),
    personaUuid: new FormControl(''),
    
  });

  get fotoControl() {
    return this.formGroup.controls.foto;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }

  constructor(
    private metodogenerico: MetodoGenericoService,
    private router: Router,
    private apiService: ApiService<agencia>,
    private route: ActivatedRoute,
    private modalService: ModalService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos_recuperados_foto'] && changes['datos_recuperados_foto'].currentValue) {
      this.formGroup.patchValue(this.datos_recuperados_foto);
  

    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let base64String: string = reader.result as string;
      base64String = base64String.split(',')[1];
      this.formGroup.value.foto = base64String;
    };
    reader.readAsDataURL(file);
  }
}
