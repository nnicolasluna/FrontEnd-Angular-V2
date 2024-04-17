import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ComandoService } from '../comando-service/comando.service';
import { comando, comandoDTO } from '../comando-model/comando';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'cypress/types/jquery';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-comandolist',
  templateUrl: './comandolist.component.html',
  styleUrls: ['./comandolist.component.scss']
})
export class ComandolistComponent {
  registros_comandos: any;
  link_editar = ''
  link_crear = ''
  comandos_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'administracion/comandos'
  matDialogRef: any;
  pageSizeOptions = [10, 15];
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<comando>,
    private metodoGenerico: MetodoGenericoService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.obtener_permisos() 
/*     this.permisos() */
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.registros_comandos = data;
          this.comandos_dataSource = new MatTableDataSource<comandoDTO>(this.registros_comandos);
          this.comandos_dataSource.paginator = this.paginatior;
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
/*   permisos() {
    this.service.getDataAndSearch('Administracion', 'comandos', 'comando-edit').subscribe(
      {
        next: edit => {
          this.link_editar = '/home' + edit.link
        }
      }
    )
    this.service.getDataAndSearch('Administracion', 'comandos', 'comando-create').subscribe(
      {
        next: create => {
          console.log(create)
          this.link_crear = '/home' + create.link
        }
      }
    )
  } */
  permisos_editar: string | null = null;
  permisos_crear: string | null = null;
  permisos_borrar: string | null = null;
  obtener_permisos() {
    this.metodoGenerico.comando_menus(this.apiService.get_permisos()).subscribe(
      {
        next: data=>{
          this.permisos_editar=data.editar
          this.permisos_crear=data.crear
          this.permisos_borrar=data.borrar
        }
      }
    )
   
  }
}
