import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { Empleado } from '../empleado';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { CargoService } from '../../cargo/cargo.service';
import { AreaService } from '../../area/area.service';

@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styleUrls: ['./empleado-create.component.scss']
})
export class EmpleadoCreateComponent {
  generos: any[] = [];
  estados: any[] = [];
  ocupaciones: any[] = [];
  cargos: any[] = [];
  area: any[] = [];

  private url_ocupaciones = 'parametros/ocupaciones'
  private url_estados_civiles = 'parametros/estados_civiles'
  private url_generos = 'parametros/generos'
 
  empleado_formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService, 
    private cargoService:CargoService, 
    private areaService: AreaService, 
    private apiService: ApiService<Empleado> 
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getGeneros();
    this.getOcupaciones();
    this.getEstados();
    this.getCargos();
    this.getAreas();
  }

  initForm(): void {
    this.empleado_formGroup = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      primer_apellido: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      segundo_apellido: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      fecha_nacimiento: ['', Validators.required],
      lugar_nacimiento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(7)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.minLength(3) ]],
      generos: ['', Validators.required],
      ocupacion: ['', Validators.required],
      estado_civil: ['', Validators.required],
      cargos: ['', Validators.required],
      area: ['', Validators.required]
    });
  }
  create(): void {
    if (this.empleado_formGroup.valid) {
      const empleadoData = this.empleado_formGroup.value;
  
      // Construir el objeto de empleado con la estructura requerida
      const empleado: any = {
        direccion: empleadoData.direccion,
        email: empleadoData.email,
        areas: empleadoData.area ,
        cargos: empleadoData.cargos,
        persona: {
          nombres: empleadoData.nombres,
          primer_apellido: empleadoData.primer_apellido,
          segundo_apellido: empleadoData.segundo_apellido,
          fecha_nacimiento: empleadoData.fecha_nacimiento,
          lugar_nacimiento: empleadoData.lugar_nacimiento,
          celular: empleadoData.celular,
          generos: empleadoData.generos,
          estadosCiviles: empleadoData.estado_civil ,
          ocupaciones: empleadoData.ocupacion 
        }
      };
  
      console.log('Empleado que será creado:', empleado);
      
      // Llama al servicio para crear el empleado
      this.empleadoService.createEmpleado(empleado).subscribe(
        (response) => {
          console.log('Empleado creado exitosamente:', response);
          // Redirigir a la página de perfil del empleado recién creado
          this.router.navigate(['/home/rrhh/empleado-profile', response.uuid]);
        },
        (error: any) => {
          console.error('Error al crear el empleado:', error);
        }
      );
    } else {
      console.error('El formulario no es válido. Por favor, completa correctamente todos los campos.');
    }
  }
  
  get f() {
    return this.empleado_formGroup.controls;
  }

  getGeneros() {
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
  getAreas() {
    this.areaService.obtenerAreas().subscribe(
      {
        next: data => {
          this.area = data
        },
        error: err => {
          console.log('No se pueden obtener datos de area')
        }
      }
    )
  }
  getCargos() {
    this.cargoService.obtenerCargos().subscribe(
      {
        next: data => {
          this.cargos = data
        },
        error: err => {
          console.log('No se pueden obtener datos de cargo')
        }
      }
    )
  }

  getOcupaciones() {
    this.apiService.getAll(this.url_ocupaciones).subscribe(
      {
        next: data => {
          this.ocupaciones = data
        },
        error: err => {
          console.log('No se pueden obtener datos de ocupaciones')
        }
      }
    )
  }

  getEstados() {
    this.apiService.getAll(this.url_estados_civiles).subscribe(
      {
        next: data => {
          this.estados = data
        },
        error: err => {
          console.log('No se pueden obtener datos de estado civil')
        }
      }
    )
  }
}