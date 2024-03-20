import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { person, personDTO } from '../person-model/person';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaDeshabilitarComponent } from 'src/app/home/modal/advertencia-deshabilitar/advertencia-deshabilitar.component';



@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.scss']
})
export class PersonlistComponent {
  link_adicionar = "'/home/administracion/personcreate'"
  link_editar = '/home/administracion/personprofile'
  personas: any;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  length!:number;
  pageSize = 10;
  pageIndex = 0;
  pageIndex_datatable = 0;
  displayedColumns: string[] = ['nombres', 'primer_apellido', 'segundo_apellido', 'generos', 'estadosCiviles', 'estado', 'action']
  personas_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url_personas = 'administracion/personas/paginado'
  matDialogRef: any;
  pageSizeOptions: number[] = [5,10,20];
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<person>,
  ) { }

  pageEvent!: PageEvent;

  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.length = e.length;
    this.pageIndex = e.pageIndex;
    this.changePage(e.pageIndex);
  }

  ngOnInit(): void {
    this.getAll()
    this.personas_dataSource.paginator = this.paginatior;
  }

  ngAfterViewInit() {
    this.getAll()
  }
  actualizarDatosTabla(datos: any) {
    this.personas = datos;
    this.personas_dataSource = new MatTableDataSource<personDTO>(this.personas);

    console.log(this.personas)
  }
  getAll() {
    this.apiService.getAllpageable(this.url_personas, String(this.pageIndex),String(this.pageSize)).subscribe(
      {
        next: (data) => {
          this.personas = data
          this.pageSize=this.personas.size
          this.length=this.personas.totalElements
          this.personas_dataSource = new MatTableDataSource<personDTO>(this.personas.content);
        },
        error: error=>{
          console.log(error)
        }
      }
    )
  }
  delete(id: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(
      () => {
        if (this.matDialogRef.componentInstance.confirmado) {
          this.apiService.delete(this.url_personas, id).subscribe(
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
  disable(id: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaDeshabilitarComponent);
    this.matDialogRef.afterClosed().subscribe(
      () => {
        if (this.matDialogRef.componentInstance.confirmado) {
          this.apiService.disable(this.url_personas + '/edit-estado', id).subscribe(
            {
              next: () => {
                window.location.reload();
                console.log('deshabilitado')
              },
              error: err => {
                console.log(err)
                console.log('No puede deshabilitar este registro')
              }
            }
          )
        }
      }
    );

  }
  isObjectType(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  find_advanced() { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.personas_dataSource.filter = filterValue;
  }
  changePage(pageNumber: number) {

    this.apiService.getAllpageable(this.url_personas, pageNumber.toString(), String(this.pageSize)).subscribe({
      next: (data) => {
        this.personas = data;
        this.personas_dataSource = new MatTableDataSource<personDTO>(this.personas.content);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}