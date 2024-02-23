import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-componente-form',
  templateUrl: './componente-form.component.html',
  styleUrls: ['./componente-form.component.scss']
})
export class ComponenteFormComponent {
  @Input() titulo: string = '';
  @Input() formGroup: any;
}
