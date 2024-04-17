import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoDocumentoService } from '../tipo-documento-service/tipo-documento.service';
import { tipoDocumento, tipoDocumentoDTO } from '../tipo-documento-model/tipoDocumento';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';

@Component({
  selector: 'app-tipo-documento-list',
  templateUrl: './tipo-documento-list.component.html',
  styleUrls: ['./tipo-documento-list.component.scss']
})
export class TipoDocumentoListComponent {
  permisos_editar: string | null = null;
  permisos_crear: string | null = null;
  permisos_borrar: string | null = null;
  registros_tipos_documentos!:any
  tipodocumentos_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'parametros/tipo_documentos'
  matDialogRef: any;
  pageSizeOptions = [10, 15]; 
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<tipoDocumento>,
    private metodoGenerico: MetodoGenericoService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.obtener_permisos()
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          console.log(data)
          this.registros_tipos_documentos = data;
          this.tipodocumentos_dataSource = new MatTableDataSource<tipoDocumentoDTO>(this.registros_tipos_documentos);
          this.tipodocumentos_dataSource.paginator = this.paginatior;
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
