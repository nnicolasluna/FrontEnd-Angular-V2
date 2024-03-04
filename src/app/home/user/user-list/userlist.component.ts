import { Component, ViewChild, } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../user-service/user.service';
import { userDTO } from '../user-model/user';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})


export class UserlistComponent {
  roles: any;
  dataSource: any;
  constructor(
    private userService: UserService,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getUsers();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['usuario', 'CorreoCorporativo', 'estado', 'acciones'];

  getUsers() {
    this.userService.getRoles().subscribe(
      {
        next: data =>{
          this.roles = data;
          this.dataSource = new MatTableDataSource<userDTO>(this.roles);
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
  deleteUsuario(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.userService.destroy(uuid).subscribe((res: any) => {
          this.getUsers();
        });
      }


    });
  }


}
