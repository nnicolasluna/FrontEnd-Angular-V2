import { Component, ViewChild } from '@angular/core';
import { MenuService } from '../menu-service/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { menuDTO } from '../menu-model/menu';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent {
  menu: any;
  dataSource: any;
  constructor(
    private menuservice: MenuService,
    private modalService: ModalService,
  ) { }
  ngOnInit() {
    this.getMenus();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'descripcion', 'link', 'action'];

  getMenus() {
    this.menuservice.getMenus().subscribe(
      {
        next: data => {

          this.menu = data;
          this.dataSource = new MatTableDataSource<menuDTO>(this.menu);
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
  deleteMenu(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.menuservice.destroy(uuid).subscribe((res: any) => {
          this.getMenus();
        });
      }


    });
  }

}
