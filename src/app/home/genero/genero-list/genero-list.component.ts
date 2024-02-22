import { Component, ViewChild } from '@angular/core';
import { GeneroService } from '../genero-service/genero.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal/service/modal.service';
import { MatPaginator } from '@angular/material/paginator';
import { genero, generoDTO } from '../genero-model/genero';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { MatTableDataSource } from '@angular/material/table';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.scss']
})
export class GeneroListComponent {
  genero: any;
  dataSource: any;
  private matDialogRef!: any;
  private url = 'generos'
  datos: any;
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<genero>,

  ) { }
  ngOnInit() {
    this.getGeneros();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'estado', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getGeneros() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<generoDTO>(this.datos);
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
  deleteGenero(id: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(
      () => {
        if (this.matDialogRef.componentInstance.confirmado) {
          this.apiService.delete(this.url, id).subscribe(
            {
              next: () => {
                this.getGeneros();
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
