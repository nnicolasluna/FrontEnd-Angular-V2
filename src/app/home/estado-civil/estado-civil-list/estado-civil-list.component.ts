import { Component, ViewChild } from '@angular/core';
import { EstadoCivilService } from '../estado-civil-service/estado-civil.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal/service/modal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { estadocivil, estadocivilDTO } from '../estado-civil-model/estado-civil';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-estado-civil-list',
  templateUrl: './estado-civil-list.component.html',
  styleUrls: ['./estado-civil-list.component.scss']
})
export class EstadoCivilListComponent {
  EstadoCivil: any;
  dataSource: any;
  datos: any;
  private url = 'estados_civiles'
  private matDialogRef!: any;
  constructor(
    private apiService: ApiService<estadocivil>,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getAll();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'estado', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getAll() {
    this.apiService.getAll(this.url).subscribe(
    {
      next: data => {
        this.datos = data;
        this.dataSource = new MatTableDataSource<estadocivilDTO>(this.datos);
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
