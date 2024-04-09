import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EmpleadoService } from '../empleado.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { Empleado } from '../empleado';
import { CargoService } from '../../cargo/cargo.service';
import { AreaService } from '../../area/area.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.scss']
})
export class EmpleadoEditComponent implements OnInit {
  
  empleadoId: string = "";
  generos: any[] = [];
  estados: any[] = [];
  ocupaciones: any[] = [];
  cargos: any[] = [];
  area: any[] = [];

  private url_ocupaciones = 'parametros/ocupaciones'
  private url_estados_civiles = 'parametros/estados_civiles'
  private url_generos = 'parametros/generos'
  private matDialogRef!: any;
 
  empleado_formGroup!: FormGroup;
  initForm(): void {
    this.empleado_formGroup = this.formBuilder.group({
      uuid:[''],
      uuidPersona: [''],
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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private empleadoService: EmpleadoService, 
    private cargoService:CargoService, 
    private areaService: AreaService, 
    private apiService: ApiService<Empleado> 
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getGeneros();
    this.getEstados();
    this.getOcupaciones();
    this.getAreas();
    this.getCargos();
    this.route.params.subscribe(params => {
      this.empleadoId = params['uuid'];
      this.loadEmpleado(this.empleadoId);
    });
  }

  loadEmpleado(id: string): void {
    if (this.empleadoId) { 
      this.empleadoService.findEmpleado(this.empleadoId)
        .subscribe(
          empleado => {
            this.empleado_formGroup.patchValue({
              uuid: empleado.uuid,
              nombres: empleado.persona.nombres,
              primer_apellido: empleado.persona.primer_apellido,
              segundo_apellido: empleado.persona.segundo_apellido,
              fecha_nacimiento: empleado.persona.fecha_nacimiento,
              lugar_nacimiento: empleado.persona.lugar_nacimiento,
              celular: empleado.persona.celular,
              direccion: empleado.direccion,
              email: empleado.email,
              uuidPersona: empleado.persona.uuid
            });
            this.patchValue_select('generos', empleado.persona.generos);
            this.patchValue_select('estado_civil', empleado.persona.estadosCiviles);
            this.patchValue_select('ocupacion', empleado.persona.ocupaciones);
            this.patchValue_select('area', empleado.areas);
            this.patchValue_select('cargos', empleado.cargos);
          },
          error => {
            console.error('Error al cargar el empleado:', error);
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
            });
          }
        );
    } else {
      console.error('UUID no encontrado en los parámetros de la ruta.');
    }
  }
  
  patchValue_select(controlName: string, value: any): void {
    const control = this.empleado_formGroup.get(controlName);
    if (control && value && value.uuid) {
      control.setValue(value.uuid);
    }
  }
  update(): void {
    if (this.empleado_formGroup.valid) {
      const empleadoData = this.empleado_formGroup.value;
      
      if (empleadoData) { 
        const empleadoToUpdate: Empleado = {
          uuid: empleadoData.uuid, 
          direccion: empleadoData.direccion,
          email: empleadoData.email,
          areas: empleadoData.area,
          cargos: empleadoData.cargos,
          fechaActualizacionSegip: new Date(),
          actualizadoDesdeSegip: false,
          persona: {
            uuid: empleadoData.uuidPersona,
            nombres: empleadoData.nombres,
            primer_apellido: empleadoData.primer_apellido,
            segundo_apellido: empleadoData.segundo_apellido,
            fecha_nacimiento: empleadoData.fecha_nacimiento,
            lugar_nacimiento: empleadoData.lugar_nacimiento,
            celular: empleadoData.celular,
            generos: empleadoData.generos,
            estadosCiviles: empleadoData.estado_civil,
            ocupaciones: empleadoData.ocupacion
          }
        };
      this.empleadoService.updateEmpleado(empleadoData.uuid, empleadoToUpdate)
        .subscribe(
          updatedEmpleado => {
            console.log('Empleado actualizado:', updatedEmpleado);
            this.router.navigate(['/home/rrhh/empleado-profile/', empleadoData.uuid]);
          },
          error => {
            console.error('Error al actualizar el empleado:', error);
          }
        );
    } else {
      console.error('El formulario no contiene un uuid válido en la persona.');
    }
  } else {
    console.log('El formulario no es válido. Verifique los campos.');
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