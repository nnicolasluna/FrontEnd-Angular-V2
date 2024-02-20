import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubsistemaService } from '../subsistema-service/subsistema.service';
import { subsistemaDTO } from '../subsistema-model/subsistema';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
@Component({
  selector: 'app-subsislist',
  templateUrl: './subsislist.component.html',
  styleUrls: ['./subsislist.component.scss']
})
export class SubsislistComponent {
  subsistema: any;
  dataSource: any;
  constructor(
    private subsistemaservice: SubsistemaService,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getSubsistemas();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'descripcion', 'link', 'estado', 'action'];
  getSubsistemas() {
    this.subsistemaservice.getSubsis().subscribe(
      {
        next: data => {

          this.subsistema = data;
          this.dataSource = new MatTableDataSource<subsistemaDTO>(this.subsistema);
          this.dataSource.paginator = this.paginatior;
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
            /* this.router.navigateByUrl('/login') */
          );
        }
      }
    );
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  private matDialogRef!: any;
  deleteSubsistema(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.subsistemaservice.destroy(uuid).subscribe((res: any) => {
          this.getSubsistemas();
        });
      }


    });
  }


}
