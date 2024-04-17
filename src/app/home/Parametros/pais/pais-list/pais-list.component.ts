import { Component, ViewChild } from '@angular/core';

import { pais, paisDTO } from '../pais-model/pais';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html',
  styleUrls: ['./pais-list.component.scss']
})
export class PaisListComponent {
  permisos_editar: string | null = null;
  permisos_crear: string | null = null;
  permisos_borrar: string | null = null;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  private matDialogRef!: any;
  private url = 'parametros/paises'
  datos: any;
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<pais>,
    private metodoGenerico: MetodoGenericoService
  ) { }
  ngOnInit():void {
    this.getAll();
    this.dataSource.paginator = this.paginatior;
    this.obtener_permisos()
  }
  
  displayedColumns: string[] = ['nombre', 'bandera', 'estado', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<paisDTO>(this.datos);
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
