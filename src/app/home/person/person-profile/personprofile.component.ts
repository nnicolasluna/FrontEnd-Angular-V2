import { Component, ViewChild } from '@angular/core';
import { PersonService } from '../person-service/person.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user-service/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { userDTO } from '../../user/user-model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-personprofile',
  templateUrl: './personprofile.component.html',
  styleUrls: ['./personprofile.component.scss']
})
export class PersonprofileComponent {
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
  ) { }

  ngOnInit() {
    this.documentos()
    this.Userdatos()
  }
  disableCreateUser: boolean = false;
  disableEditUser: boolean = true;
  Userdatos() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.userService.getPerson(this.uuid).subscribe((data) => {
      this.user = data;
      this.dataSource = new MatTableDataSource<any>(this.user.roles);
    
      this.disableCreateUser = true;
      this.disableEditUser = false;
    }, (error) => {
     
    });
    this.personService.getPerson(this.uuid).subscribe((data) => {
      this.person = data
      console.log(data)
    }, (error) => {
     
    });
  }
  documentos() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.personService.getDocuments(this.uuid).subscribe((data) => {
      console.log(data)
      this.documents = data
      this.dataSource1 = new MatTableDataSource<any>(this.documents);
    })
  }

}
