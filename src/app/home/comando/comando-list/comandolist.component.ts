import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ComandoService } from '../comando-service/comando.service';
import { comandoDTO } from '../comando-model/comando';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { data } from 'cypress/types/jquery';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-comandolist',
  templateUrl: './comandolist.component.html',
  styleUrls: ['./comandolist.component.scss']
})
export class ComandolistComponent {
  comando: any;
  dataSource: any;
  private matDialogRef!: any;
  constructor(
    private comandoservice: ComandoService,
    private matDialog: MatDialog,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getComandos();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'descripcion', 'link', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getComandos() {
    this.comandoservice.getComands().subscribe({
      next: data => {
        this.comando = data;
        this.dataSource = new MatTableDataSource<comandoDTO>(this.comando);
        this.dataSource.paginator = this.paginatior;
      },
      error: err => {
        this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
        this.matDialogRef.afterClosed().subscribe(() => {
        });
      }

    }
    );
  }

  deleteComando(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.comandoservice.destroy(uuid).subscribe((res: any) => {
          this.getComandos();

        });
      }


    });
  }
}
