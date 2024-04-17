import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TipoCorte, TipoCorteDTO } from '../tipo-corte-model/tipo-corte';
import { MatPaginator } from '@angular/material/paginator';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';


@Component({
  selector: 'app-tipo-corte-list',
  templateUrl: './tipo-corte-list.component.html',
  styleUrls: ['./tipo-corte-list.component.scss']
})
export class TipoCorteListComponent {
  permisos_editar: string | null = null;
  permisos_crear: string | null = null;
  permisos_borrar: string | null = null;
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'parametros/tipo_cortes'
  matDialogRef: any;
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<TipoCorte>,
    private metodoGenerico: MetodoGenericoService
  ) { }

  ngOnInit(): void {
   this.getAll()
   this.obtener_permisos()
    this.dataSource.paginator = this.paginatior;
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: (data:any) => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<TipoCorteDTO>(this.datos);
          this.dataSource.paginator = this.paginatior;
        },
        error: (err:any) => {
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
              error: (err:any) => {
                console.log('No puede eliminarse este registro')
              }
            }
          );
        }
      }
    );
  }
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
