import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from '../person-service/person.service';
import { person, personDTO } from '../person-model/person';
import { MatDialog } from '@angular/material/dialog';
import { AdvertenciaBorrarComponent } from '../../modal/advertencia-borrar/advertencia-borrar.component';
import { ModalService } from '../../modal/service/modal.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api-generico/api.service';

@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.scss']
})
export class PersonlistComponent {
  /* private matDialogRef!: any;
  people: any;
  dataSource: any;
  constructor(
    private personservice: PersonService,
    private matDialog: MatDialog,
    private modalService: ModalService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getPeople();
  }
  @ViewChild(MatPaginator) paginatior !: MatPaginator;

  displayedColumns: string[] = ['nombres', 'primer_apellido', 'segundo_apellido', 'action'];
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getPeople() {
    this.personservice.getPeople().subscribe(
      {
        next: data => {
          this.people = data;
          this.dataSource = new MatTableDataSource<personDTO>(this.people);
          this.dataSource.paginator = this.paginatior;
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(

          );
        }

      }
    );
  }

  deletePerson(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(() => {
      if (this.matDialogRef.componentInstance.confirmado) {
        this.personservice.destroy(uuid).subscribe(
          {
            next: data => {
              this.getPeople();
            },
            error: err => {
              console.log('No puede eliminarse este registro')
            }
          }
        );
      }
    });
  }
 */
  datos: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  private url = 'personas'
  matDialogRef: any;
  pageSizeOptions = [5, 7]; 
  constructor(
    private modalService: ModalService,
    private apiService: ApiService<person>,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.apiService.getAll(this.url).subscribe(
      {
        next: data => {
          this.datos = data;
          this.dataSource = new MatTableDataSource<personDTO>(this.datos);
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



}