import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tipoCuenta, tipoCuentaDTO } from '../tipo-cuentas-bancarias-model/tipo-cuentas-bancarias';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';


@Component({
  selector: 'app-tipo-cuentas-bancarias-list',
  templateUrl: './tipo-cuentas-bancarias-list.component.html',
  styleUrls: ['./tipo-cuentas-bancarias-list.component.scss']
})
export class TipoCuentasBancariasListComponent {
  permisos_editar: string | null = null;
  permisos_crear: string | null = null;
  permisos_borrar: string | null = null;
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'parametros/tipo_cuentas_bancarias'
  matDialogRef: any;
  pageSizeOptions = [10, 15]; 
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<tipoCuenta>,
    private metodoGenerico: MetodoGenericoService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.obtener_permisos()
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: (data:any) => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<tipoCuentaDTO>(this.datos);
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
