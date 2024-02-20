import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '../role-service/role.service';
import { roleDTO } from '../role-model/role';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.scss']
})
export class RolelistComponent {
  roles: any;
  dataSource: any;

  constructor(
    private rolesService: RoleService,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getRoles();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'acciones'];

  getRoles() {
    this.rolesService.getRoles().subscribe(
      {
        next: data => {

          this.roles = data;
          this.dataSource = new MatTableDataSource<roleDTO>(this.roles);
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
  deleteRol(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.rolesService.destroy(uuid).subscribe((res: any) => {
          this.getRoles();
        });
      }


    });
  }
}
