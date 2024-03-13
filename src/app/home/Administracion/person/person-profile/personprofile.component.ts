import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { person } from '../person-model/person';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
@Component({
  selector: 'app-personprofile',
  templateUrl: './personprofile.component.html',
  styleUrls: ['./personprofile.component.scss']
})
export class PersonprofileComponent {
  private url_personas = 'administracion/personas'
  private url_usuarios = 'administracion/usuarios'
  private url_foto = 'administracion/fotos'
  documents: any;
  uuid_persona: any = '';
  person_data!: any;
  user_data!: any;
  dataSource_roles: any;
  dataSource_documentos: any;
  selectedIndex!: any
  foto_persona!:any
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado'];
  displayedColumns1: string[] = ['documento', 'numero', 'estado', 'lugar', 'acciones'];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService<person>,
  ) { }

  ngOnInit() {
    this.Userdatos()
    this.route.queryParams.subscribe(params => {
      const selectedTabIndex = params['tabIndex'] ? +params['tabIndex'] : 0;
      this.selectedIndex = selectedTabIndex;
    });
  }
  disableCreateUser: boolean = false;
  disableEditUser: boolean = true;
  Userdatos() {
    this.uuid_persona = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url_personas, this.uuid_persona).subscribe(
      {
        next: data => {
          this.person_data = data

        },
        error: error => {
          console.log(error,'error en personas')
        }
      }
    )
    this.apiService.getOne(this.url_foto, this.uuid_persona).subscribe(
      {
        next: data => {
          this.foto_persona = data

        },
        error: error => {
          console.log(error,'error al obtener en foto-persona')
        }
      }
    )
    this.apiService.getOne(this.url_personas, this.uuid_persona + '/documentos').subscribe(
      {
        next: data => {
          this.documents = data
          this.dataSource_documentos = new MatTableDataSource<any>(this.documents);
          this.dataSource_documentos.paginator = this.paginatior;
        }
        ,
        error: error => {
          console.log(error,'error en documentos de personas')
        }
      }
    )
    this.apiService.getOne(this.url_usuarios, 'persona/' + this.uuid_persona).subscribe(
      {
        next: data => {
          this.user_data = data;
          this.disableCreateUser = true;
          this.disableEditUser = false;
          this.dataSource_roles = new MatTableDataSource<any>(this.user_data.roles);
          this.dataSource_roles.paginator = this.paginatior;
        },
        error: error => {
          console.log(error,'error en usuario de personas no se encontro')
        }
      }
    )
  }

}
