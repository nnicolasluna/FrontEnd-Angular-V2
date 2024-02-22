import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../modal/service/modal.service';
import { ApiService } from '../service/api.service';
import { AdvertenciaErrorConexionComponent } from '../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from '../modal/advertencia-borrar/advertencia-borrar.component';
@Component({
  selector: 'app-componente-listar',
  templateUrl: './componente-listar.component.html',
  styleUrls: ['./componente-listar.component.scss']
})
export class ComponenteListarComponent<T> implements OnInit{
  @Input() titulo: string = '';
  @Input() adicionar: string = '';
  @Input() editar: string = '';
  @Input() borrar: string = '';
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() displayedColumns: string[] = [];
  @Input() pageSizeOptions: number[] = [5, 7];
  @Input() url = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datos: any;
  private matDialogRef!: any;
  
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<T>,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          console.log(data)
          this.datos = data;
          this.dataSource = new MatTableDataSource<T>(this.datos);
          this.dataSource.paginator = this.paginator;
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
