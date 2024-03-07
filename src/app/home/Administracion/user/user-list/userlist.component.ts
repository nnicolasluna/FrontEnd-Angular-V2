import { Component, ViewChild, } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../user-service/user.service';
import { user, userDTO } from '../user-model/user';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})


export class UserlistComponent {
  private url = 'administracion/usuarios'
  roles: any;
  dataSource: any;
  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private apiService: ApiService<user>
  ) { }
  ngOnInit() {
    this.getUsers();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['usuario','nombre','primer_apellido','segundo_apellido', 'estado', 'acciones'];

  getUsers() {
    /*     this.userService.getRoles().subscribe(
          {
            next: data => {
              this.roles = data;
              this.dataSource = new MatTableDataSource<userDTO>(this.roles);
              this.dataSource.paginator = this.paginatior;
            },
            error: err => {
              this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
              this.matDialogRef.afterClosed().subscribe(
              );
            }
          }
    
    
        ); */
    this.apiService.getAll(this.url).subscribe(
      {
        next: (data:any) => {
          this.roles = data;
          this.dataSource = new MatTableDataSource<userDTO>(this.roles);
          this.dataSource.paginator = this.paginatior;
        },
        error: (err:any) => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
          );
        }
      }
    )
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  private matDialogRef!: any;
  deleteUsuario(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        /*   this.userService.destroy(uuid).subscribe((res: any) => {
            this.getUsers();
          }); */
        this.apiService.delete(this.url, uuid).subscribe(
          {
            next: () => {
              this.getUsers();
            }
          }
        )
      }


    });
  }


}
