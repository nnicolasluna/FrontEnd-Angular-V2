import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-advertencia-generica',
  templateUrl: './advertencia-generica.component.html',
  styleUrls: ['./advertencia-generica.component.scss']
})
export class AdvertenciaGenericaComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {}
}
