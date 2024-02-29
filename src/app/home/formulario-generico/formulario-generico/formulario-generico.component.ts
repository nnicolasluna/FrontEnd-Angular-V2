import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../formulario-generico-model/formulario-generico';


@Component({
  selector: 'app-formulario-generico',
  templateUrl: './formulario-generico.component.html',
  styleUrls: ['./formulario-generico.component.scss']
})
export class FormularioGenericoComponent {
  @Input() formFields: FormField[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});


}
