import { Component, ViewChild } from '@angular/core';
import { PersonService } from '../person-service/person.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user-service/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { userDTO } from '../../user/user-model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { person } from '../person-model/person';
import { ApiService } from '../../service/api-generico/api.service';
@Component({
  selector: 'app-personprofile',
  templateUrl: './personprofile.component.html',
  styleUrls: ['./personprofile.component.scss']
})
export class PersonprofileComponent {
  private url = 'personas'
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
    private personService: PersonService,
    private userService: UserService,
    private apiService: ApiService<person>,
  ) { }

  ngOnInit() {
    this.documentos()
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
          this.user = data;
          this.dataSource = new MatTableDataSource<any>(this.user.roles);
          this.disableCreateUser = true;
          this.disableEditUser = false;
        }
      }
    )

  }
  documentos() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid + '/documentos').subscribe(
      {
        next: data => {
          this.documents = data
          this.dataSource1 = new MatTableDataSource<any>(this.documents);
        }
      }
    )
  }

}
