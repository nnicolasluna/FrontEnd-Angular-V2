import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { role, roleDTO } from '../role-model/role';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.scss']
})
export class RolelistComponent {
  registros_roles: any;
  roles_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url_endpoint_roles = 'administracion/roles'
  matDialogRef: any;
  pageSizeOptions = [10, 15];
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<role>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getOne() 
  }
  permisos_adicionar = ''
  permisos_editar = ''
  permisos_crear = ''
  permisos_borrar = ''
  link_adicionar = '/home/administracion/rolecreate'
  link_editar = '/home/administracion/roledit'
  link_crear = ''
  link_borrar = ''

  menu_uuid!: any;
  comando_list!: any
  getOne() {
    this.menu_uuid = this.apiService.get_permisos()
    this.apiService.getOne('api/auth/user/permisos', this.menu_uuid).subscribe(
      {
        next: (data) => {
          this.comando_list = data
          console.log(data)
          this.comando_list.forEach((item: any) => {

            switch (item.tipoOperacion) {
              case 'C':
                this.permisos_crear = item.linkMenu;
                break;
              case 'E':
                this.permisos_editar = item.linkMenu;
                break;
              case 'L':
                this.permisos_adicionar = item.linkMenu;
                break;
              case 'B':
                this.permisos_borrar = item.linkMenu;
                break;
              default:
                break;
            }
          });

        }

      }
    )
  }

  getAll() {
    this.apiService.getAll(this.url_endpoint_roles).subscribe(
      {
        next: data => {
          this.registros_roles = data;
          this.roles_dataSource = new MatTableDataSource<roleDTO>(this.registros_roles);
          this.roles_dataSource.paginator = this.paginatior;
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
          this.apiService.delete(this.url_endpoint_roles, id).subscribe(
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
