import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../service/api-generico/api.service';
import { generoDTO } from '../../Parametros/genero/genero-model/genero';
import { estadocivilDTO } from '../../Parametros/estado-civil/estado-civil-model/estado-civil';
import { ocupacionDTO } from '../../Parametros/ocupacion/ocupacion-model/ocupacion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { buscar } from './buscar_mode/buscar_personas';

@Component({
  selector: 'app-form-buscar',
  templateUrl: './form-buscar.component.html',
  styleUrls: ['./form-buscar.component.scss']
})
export class FormBuscarComponent {
  searchText: string = '';
  generos: generoDTO[] = []
  ocupaciones: ocupacionDTO[] = []
  estados_civiles: estadocivilDTO[] = []
  personas:any
  length!:number;
  pageSize = 10;
  pageIndex = 0;
  private url_generos = 'parametros/generos'
  private url_estado_civil = 'parametros/estados_civiles'
  private url_ocupaciones = 'parametros/ocupaciones'
  private url_buscar_avanzado = 'administracion/personas/buscar-paginado'

  buscar_formGroup = new FormGroup({
    nombres: new FormControl('', [Validators.maxLength(30), Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.maxLength(30), Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.maxLength(30), Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.maxLength(30), Validators.minLength(3)]),
    lugar_nacimiento: new FormControl('', [Validators.maxLength(30), Validators.minLength(3)]),
    generos: new FormControl(''),
    ocupaciones: new FormControl(''),
    estadosCiviles: new FormControl(''),
    numeroDocumento: new FormControl('', [Validators.maxLength(30), Validators.minLength(7)]),
    celular: new FormControl(''),
    estado: new FormControl(''),
  });

  @Output() datosEncontrados = new EventEmitter<any[]>();

  constructor(
    private apiService: ApiService<generoDTO>,
    private apiService_buscar: ApiService<buscar>,
  ) { }
  ngOnInit() {
    this.get_gender()
    this.get_estado_civil()
    this.get_ocupaciones()
  }

  find_advanced() {
    this.apiService_buscar.find_register(this.url_buscar_avanzado,String(this.pageIndex),String(this.pageSize), this.buscar_formGroup.value as buscar).subscribe(
      {
        next: (data) => {
          this.personas=data
         /*  console.log(this.personas) */
          this.datosEncontrados.emit(this.personas);
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }
  get_gender() {
    this.apiService.getAll(this.url_generos).subscribe(
      {
        next: data => {
          this.generos = data
        },
        error: err => {
          console.log('No se pueden obtener datos de genero')
        }
      }
    )
  }
  get_estado_civil() {
    this.apiService.getAll(this.url_estado_civil).subscribe(
      {
        next: data => {
          this.estados_civiles = data
        },
        error: err => {
          console.log('No se pueden obtener datos de genero')
        }
      }
    )
  }
  get_ocupaciones() {
    this.apiService.getAll(this.url_ocupaciones).subscribe(
      {
        next: data => {
          this.ocupaciones = data
        },
        error: err => {
          console.log('No se pueden obtener datos de genero')
        }
      }
    )
  }
}
