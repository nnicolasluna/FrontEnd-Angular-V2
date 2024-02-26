import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tipoEntidadFinanciera, tipoEntidadFinancieraDTO } from '../tipo-entidad-financiera-model/tipo-entidad-financiera';
import { ApiService } from '../../service/api-generico/api.service';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';

@Component({
  selector: 'app-tipo-entidad-financiera-list',
  templateUrl: './tipo-entidad-financiera-list.component.html',
  styleUrls: ['./tipo-entidad-financiera-list.component.scss']
})
export class TipoEntidadFinancieraListComponent {
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'tipo_entidades_financieras'
  matDialogRef: any;
  pageSizeOptions = [5, 7]; 
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<tipoEntidadFinanciera>,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<tipoEntidadFinancieraDTO>(this.datos);
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
