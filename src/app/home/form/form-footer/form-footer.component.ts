import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss'],
})
export class FormFooterComponent {

  @Output() saveClicked = new EventEmitter<void>();
  @Input() regreso!: string;
  guardarHabilitado: boolean = true;
  save() {
    this.saveClicked.emit();
    /* if (this.guardarHabilitado) {
      
      this.saveClicked.emit();
      this.guardarHabilitado = false;
    } */


  }


}
