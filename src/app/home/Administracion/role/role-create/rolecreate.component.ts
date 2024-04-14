import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { role } from '../role-model/role';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

const TREE_DATA: any[] = [
  {
    nombre: 'Administracion',
    children: [
      {
        nombre: 'Personas',
        children: [
          {
            nombre: 'Crear',
          },
          {
            nombre: 'Borrar',
          },
        ],
      },
      {
        nombre: 'Comandos',
        children: [
          {
            nombre: 'Crear',
          },
          {
            nombre: 'Borrar',
          },
        ],
      },
      {
        nombre: 'Subsistemas',
        children: [
          {
            nombre: 'Crear',
          },
          {
            nombre: 'Borrar',
          },
        ],
      }],
  },
  
];

@Component({
  selector: 'app-rolecreate',
  templateUrl: './rolecreate.component.html',
  styleUrls: ['./rolecreate.component.scss']
})
export class RolecreateComponent {

  private url = 'administracion/roles'
  private url1 = 'administracion/subsistemas'
  private endpoint_permisos = 'administracion/subsistemas/permisos'
  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["rol", "eliminar"]
  uuid = new FormControl('')
  personuuid!: any;
  roles: any[] = [];
  /*   permisos_data: any[] = []
    permisosFormGroup = new FormGroup({
      uuid: this.forBuilder.array([''])
    }); */
  permisosFormGroup!: FormGroup;
  permisos_data: any[] = [];
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    estado: new FormControl(true),
    nivel: new FormControl('', [Validators.required]),
    subsistemas: this.permisosFormGroup,
  });

  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  get estadoControl() {
    return this.formGroup.controls.estado;
  }
  get nivelControl() {
    return this.formGroup.controls.nivel;
  }

  constructor(
    private router: Router,
    private forBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService<role>,
    private formBuilder: FormBuilder
  ) { }

  uuidFormArray = this.permisosFormGroup.get('uuid') as FormArray;
  /* ngOnInit(): void {
    this.getpermisos()
    this.getSubsistemas();
    this.fg = this.forBuilder.group({
      uuidrole: this.uuid,
      promos: this.forBuilder.array([])
    });

  }; */
  ngOnInit() {
    this.permisos_data=TREE_DATA
    this.permisosFormGroup = this.formBuilder.group({});

    // Iterar sobre permisos_data para construir el formulario
    /*   this.permisos_data.forEach(subsistema => {
        const subsistemaGroup = this.formBuilder.group({});
        subsistema.menus.forEach(menu => {
          const menuGroup = this.formBuilder.group({});
          const comandosArray = this.formBuilder.array([]);
          menu.comandos.forEach(comando => {
            comandosArray.push(this.formBuilder.control(false)); // Inicializar checkbox con false
          });
          menuGroup.addControl(menu.uuid, comandosArray);
          subsistemaGroup.addControl(menu.uuid, menuGroup);
        });
        this.permisosFormGroup.addControl(subsistema.uuid, subsistemaGroup);
      }); */
  }

  getComandoControl(subsistemaId: string, menuId: string, comandoId: string): FormControl {
    return this.permisosFormGroup.get(`${subsistemaId}.${menuId}.${comandoId}`) as FormControl;
  }

  submitForm() {
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    console.log(this.permisosFormGroup.value);
    // Por ejemplo, puedes hacer una solicitud HTTP para guardar los permisos
  }
  create() {
    const valores = this.uuidFormArray.value; // Obtener los valores del FormArray

    console.log(valores)
    console.log('UUIDs Seleccionados:', this.uuidsSeleccionados);
    /*     if (this.formGroup.valid) {
          this.formGroup.value.subsistemas = this.promos.value;
          this.apiService.create(this.url, this.formGroup.value as role).subscribe(
            {
              next: () => {
                this.router.navigateByUrl('/home/administracion/roles');
                this.formGroup.reset();
    
              },
            }
          )
        }
        else {
          this.formGroup.markAllAsTouched();
        } */
  }
  getSubsistemas() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {

          this.roles = data
        }
      }
    )
  }
  getpermisos() {
    this.apiService.getAll(this.endpoint_permisos).subscribe(
      {
        next: data => {
          this.permisos_data = data
          console.log(data)
          
        }
      }
    )
  }
  get promos() {
    return this.fg.controls["promos"] as FormArray;
  };
  addLesson(): void {
    const lessonForm = this.forBuilder.group({
      uuid: [''],
    });
    this.promos.push(lessonForm);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);
    this.cd.detectChanges();
  };
  deleteLesson(lessonIndex: number): void {

    this.promos.removeAt(lessonIndex);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);

  };
  uuidsSeleccionados: string[] = [];
  toggleSeleccion(uuid: string, event: any) {
    if (event.target) {
      /* const uuidFormArray = this.permisosFormGroup.get('uuid') as FormArray; */

      const isChecked = event.target.checked;
      if (isChecked) {
        // Añadir UUID al array si está marcado
        this.uuidsSeleccionados.push(uuid);
        /* uuidFormArray.push(this.formBuilder.group({ uuid: uuid })); */

      } else {
        // Quitar UUID del array si está desmarcado
        const index = this.uuidsSeleccionados.indexOf(uuid);
        if (index !== -1) {
          this.uuidsSeleccionados.splice(index, 1);
        }
      }
    }
  }


}
