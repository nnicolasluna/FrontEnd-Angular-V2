import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { corte, corteDTO } from '../corte-model/corte';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';

@Component({
  selector: 'app-corte-list',
  templateUrl: './corte-list.component.html',
  styleUrls: ['./corte-list.component.scss']
})
export class CorteListComponent {
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'cortes'
  matDialogRef: any;
  pageSizeOptions = [5, 7]; 
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<corte>,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<corteDTO>(this.datos);
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
  delete(id: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(
      () => {
        if (this.matDialogRef.componentInstance.confirmado) {
          this.apiService.delete(this.url, id).subscribe(
            {
              next: () => {
                this.getAll();
              },
              error: err => {
                console.log('No puede eliminarse este registro')
              }
            }
          );
        }
      }
    );
  }

}