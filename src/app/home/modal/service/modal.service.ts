import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private matDialog: MatDialog) { }

  openDialog(data: any) {
    return this.matDialog.open(data);
  }
  GenericDialog(data: any,message:any) {
    return this.matDialog.open(data,message);
  }
}
