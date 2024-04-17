import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { person, personDTO } from '../person-model/person';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaDeshabilitarComponent } from 'src/app/home/modal/advertencia-deshabilitar/advertencia-deshabilitar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.scss'],
})
export class personasComponent {
  link_adicionar = "'/home/administracion/personcreate'"
  link_editar = '/home/administracion/personprofile'
  link_crear = '/home/administracion/personcreate'

  permisos_editar = ''
  permisos_crear = ''
  permisos_borrar = ''
  
  personas: any;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageIndex_datatable = 0;
  displayedColumns: string[] = ['nombres', 'primer_apellido', 'segundo_apellido', 'generos', 'estadosCiviles', 'estado', 'action']
  personas_dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private url_personas = 'administracion/personas/paginado'
  private url_personas_borrar = 'administracion/personas'
  matDialogRef: any;
  pageSizeOptions: number[] = [5, 10, 20];
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<person>,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
  ) {
    this.personas_dataSource = new MatTableDataSource<any>();
  }
  ngAfterViewInit() {
    this.personas_dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  pageEvent!: PageEvent;

  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.length = e.length;
    this.pageIndex = e.pageIndex;
    this.changePage(e.pageIndex);
    console.log(this.personas_dataSource)
  }

  ngOnInit(): void {
    this.getAll()
    this.getOne()
  }



  menu_uuid!: any;
  comando_list!: any
  getOne() {
    this.menu_uuid = this.apiService.get_permisos()
    this.apiService.getOne('api/auth/user/permisos', this.menu_uuid).subscribe(
      {
        next: (data) => {
          this.comando_list = data
          this.comando_list.forEach((item: any) => {

            switch (item.tipoOperacion) {
              case 'C':
                this.permisos_crear = item.linkMenu;
                break;
              case 'E':
                this.permisos_editar = item.linkMenu;
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
    this.apiService.getAllpageable(this.url_personas, String(this.pageIndex), String(this.pageSize)).subscribe(
      {
        next: (data) => {
          this.personas = data
          this.pageSize = this.personas.size
          this.length = this.personas.totalElements
          /* this.personas_dataSource = new MatTableDataSource<personDTO>(this.personas.content); */
          this.personas_dataSource.data = this.personas.content;
          this.changeDetectorRef.detectChanges();
        },
        error: error => {
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
          this.apiService.delete(this.url_personas_borrar, id).subscribe(
            {
              next: () => {
                this.getAll();
              },
              error: err => {
                console.log(err)
                console.log('No puede eliminarse este registro')
              },
              complete: () => {
                this._snackBar.open('Registro Borrado', 'Cerrar', { duration: 2000, horizontalPosition: 'start', verticalPosition: 'bottom' })
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
        console.log('gaaa')
        console.log(error);
      }
    });
  }
  actualizarDatosTabla(datos: any) {
    this.personas = datos;
    this.personas_dataSource = new MatTableDataSource<any>(this.personas.content);
    this.pageSize = this.personas.totalElements
    this.length = this.personas.totalElements
    console.log(this.personas)
  }
}