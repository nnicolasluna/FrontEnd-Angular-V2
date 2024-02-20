import { Component } from '@angular/core';
import {
  MatDialog,

} from '@angular/material/dialog';

@Component({
  selector: 'app-advertencia-borrar',
  templateUrl: './advertencia-borrar.component.html',
  styleUrls: ['./advertencia-borrar.component.scss']
})
export class AdvertenciaBorrarComponent {
  private confirmado: boolean = false;
  constructor(public matDialog: MatDialog) { }
  confirmDelete() {
    this.confirmado = true;
  }
}
