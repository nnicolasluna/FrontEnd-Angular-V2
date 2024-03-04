import { Component, ViewChild } from '@angular/core';
import { ModalService } from '../../modal/service/modal.service';
import { pais, paisDTO } from '../pais-model/pais';
import { ApiService } from '../../service/api-generico/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html',
  styleUrls: ['./pais-list.component.scss']
})
export class PaisListComponent {
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  private matDialogRef!: any;
  private url = 'paises'
  datos: any;
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<pais>,
  ) { }
  ngOnInit():void {
    this.getAll();
    this.dataSource.paginator = this.paginatior;
  }
  
  displayedColumns: string[] = ['nombre', 'bandera', 'estado', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<paisDTO>(this.datos);
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
