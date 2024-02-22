import { Component, ViewChild } from '@angular/core';
import { EstadoCivilService } from '../estado-civil-service/estado-civil.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal/service/modal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { estadocivilDTO } from '../estado-civil-model/estado-civil';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';

@Component({
  selector: 'app-estado-civil-list',
  templateUrl: './estado-civil-list.component.html',
  styleUrls: ['./estado-civil-list.component.scss']
})
export class EstadoCivilListComponent {
  EstadoCivil: any;
  dataSource: any;
  private matDialogRef!: any;
  constructor(
    private estadoCivilservice: EstadoCivilService,
    private matDialog: MatDialog,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getEstadoCivil();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'estado', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getEstadoCivil() {
    this.estadoCivilservice.getAll().subscribe({
      next: data => { 
        this.EstadoCivil = data;
        this.dataSource = new MatTableDataSource<estadocivilDTO>(this.EstadoCivil);
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


  deleteEstadoCivil(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.estadoCivilservice.destroy(uuid).subscribe(
          {
            next: data => {
              this.getEstadoCivil();
            },
            error: err => {
              console.log('No puede eliminarse este registro')
            }
          }
        );
      }
    });
  }

}
