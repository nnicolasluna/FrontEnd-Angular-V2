import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-advertencia-deshabilitar',
  templateUrl: './advertencia-deshabilitar.component.html',
  styleUrls: ['./advertencia-deshabilitar.component.scss']
})
export class AdvertenciaDeshabilitarComponent {
  private confirmado: boolean = false;
  constructor(public matDialog: MatDialog) { }
  confirmDisable() {
    this.confirmado = true;
  }
}
