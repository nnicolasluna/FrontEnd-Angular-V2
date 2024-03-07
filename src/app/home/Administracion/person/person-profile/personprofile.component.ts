import { Component, ViewChild } from '@angular/core';
import { PersonService } from '../person-service/person.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user-service/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { userDTO } from '../../user/user-model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { person } from '../person-model/person';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-personprofile',
  templateUrl: './personprofile.component.html',
  styleUrls: ['./personprofile.component.scss']
})
export class PersonprofileComponent {
  private url = 'administracion/personas'
  private url1 = 'administracion/usuarios'
  documents: any;
  uuid: any = '';
  person: any = null;
  user: any = null;
  roles: any;
  dataSource: any;
  dataSource1: any;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado'];
  displayedColumns1: string[] = ['documento', 'numero', 'estado', 'lugar', 'acciones'];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService<person>,
  ) { }

  ngOnInit() {
    this.Userdatos()
  }
  disableCreateUser: boolean = false;
  disableEditUser: boolean = true;
  Userdatos() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.person = data
          this.dataSource = new MatTableDataSource<any>(this.user.roles);
          this.dataSource.paginator = this.paginatior;
        }
      }
    )
    this.apiService.getOne(this.url, this.uuid + '/documentos').subscribe(
      {
        next: data => {
          this.documents = data
          this.dataSource1 = new MatTableDataSource<any>(this.documents);
          this.dataSource1.paginator = this.paginatior;
        }
      }
    )
    this.apiService.getOne(this.url1, 'persona/' + this.uuid).subscribe(
      {
        next: data => {
          this.user = data;
          this.disableCreateUser = true;
          this.disableEditUser = false;
        }
      }
    )
  }


}
