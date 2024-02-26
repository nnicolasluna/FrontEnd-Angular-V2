import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../modal/service/modal.service';
import { ApiService } from '../service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from '../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from '../modal/advertencia-borrar/advertencia-borrar.component';
@Component({
  selector: 'app-componente-listar',
  templateUrl: './componente-listar.component.html',
  styleUrls: ['./componente-listar.component.scss'],
  
})
export class ComponenteListarComponent<T> {
  @Input() titulo: string = '';
  @Input() adicionar: string = '';
  @Input() editar: string = '';
  @Input() borrar: string = '';
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() displayedColumns: string[] = [];
  @Input() ColumnsNames: string[] = [];
  @Input() pageSizeOptions: number[] = [5, 7, 10];
  @Input() url = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datos: any;
  private matDialogRef!: any;

  constructor(
    private modalService: ModalService,
    private apiService: ApiService<T>,
  ) { }

  ngOnChanges(): void {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource && this.dataSource.data) {
      // Si los datos se proporcionan, asignarlos a dataSource
      this.dataSource.data = this.dataSource.data;
    }
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  delete(id: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(
      () => {
        if (this.matDialogRef.componentInstance.confirmado) {
          this.apiService.delete(this.url, id).subscribe(
            {
              next: () => {
                console.log('borrado')
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
  isObjectType(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
