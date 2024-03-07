import { Component, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { ocupacion, ocupacionDTO } from '../ocupacion-model/ocupacion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
@Component({
  selector: 'app-ocupacion-list',
  templateUrl: './ocupacion-list.component.html',
  styleUrls: ['./ocupacion-list.component.scss']
})
export class OcupacionListComponent {
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'parametros/ocupaciones'
  matDialogRef: any;
  pageSizeOptions = [10, 15]; 
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<ocupacion>,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: (data:any) => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<ocupacionDTO>(this.datos);
          this.dataSource.paginator = this.paginatior;
        },
        error: (err:any) => {
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
              error: (err:any) => {
                console.log('No puede eliminarse este registro')
              }
            }
          );
        }
      }
    );
  }

}
