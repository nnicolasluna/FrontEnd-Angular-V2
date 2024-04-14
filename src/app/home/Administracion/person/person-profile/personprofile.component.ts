import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { person } from '../person-model/person';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { any } from 'cypress/types/bluebird';
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
  foto: string = ''
  dataSource_documentos: any;
  selectedIndex!: any
  foto_persona!: any
  disableCreateUser: boolean = false;
  disableEditUser: boolean = true;
  disableCreateFOTO: boolean = false;
  disableEditFOTO: boolean = true;
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

  Userdatos() {
    this.uuid_persona = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url_personas, this.uuid_persona).subscribe(
      {
        next: data => {
          this.person_data = data

        },
        error: error => {
          console.log(error, 'error en personas gaaaaaaaa')
        }
      }
    )

    this.apiService.getOne(this.url_personas, this.uuid_persona + '/foto').subscribe(
      {
        next: data => {
          this.foto_persona = data
          this.foto = 'data:image/jpeg;base64,' + this.foto_persona.foto.foto
          this.disableCreateFOTO = true;
          this.disableEditFOTO = false;
        },
        error: error => {
          console.log(error, 'error al obtener en foto-persona')
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
          console.log(error, 'error en documentos de personas')
        }
      }
    )
    this.apiService.getOne(this.url_usuarios, 'persona/' + this.uuid_persona).subscribe(
      {
        next: data => {
          if (data) {
            this.user_data = data;
            this.disableCreateUser = true;
            this.disableEditUser = false;
            this.dataSource_roles = new MatTableDataSource<any>(this.user_data.roles);
            this.dataSource_roles.paginator = this.paginatior;
          } else{
            console.log('usuario no registrado')
          }
        },
        error: error => {
          if (error.status === 404) {
            console.log('La persona no fue encontrada en el servidor.');
            console.log('gaaaa')
          } else {
            console.log(error, 'error en usuario de personas no se encontró');
          }
        }
      }
    )
  }
}
