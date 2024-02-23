  import { Component, ViewChild } from '@angular/core';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { moneda, monedaDTO } from '../moneda-model/moneda';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';

@Component({
  selector: 'app-moneda-list',
  templateUrl: './moneda-list.component.html',
  styleUrls: ['./moneda-list.component.scss']
})
export class MonedaListComponent {
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'monedas'
  matDialogRef: any;
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<moneda>,
  ) { }

  ngOnInit(): void {
   this.getAll()
    this.dataSource.paginator = this.paginatior;
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<monedaDTO>(this.datos);
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
