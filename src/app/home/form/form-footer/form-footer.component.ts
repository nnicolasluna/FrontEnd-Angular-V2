import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent {

  @Output() saveClicked = new EventEmitter<void>();
  @Input() regreso!: string;

  save() {
    this.saveClicked.emit();

  }
  

}
