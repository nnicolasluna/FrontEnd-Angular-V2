import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { role } from '../role-model/role';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

interface menus {
  name: string;
  comandos?: comandos[];
}
interface comandos {
  uuid?: string
  name: string;
}

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent {
  private endpoint_permisos = 'administracion/subsistemas/permisos'
  private url = 'administracion/roles'
  private url1 = 'administracion/subsistemas'
  fg!: FormGroup
  permisos_data: any[] = []
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["rol", "eliminar"]

  personuuid!: any;
  roles: any[] = [];

  permisosFormGroup = new FormGroup({
    uuid: this.forBuilder.array([])
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    estado: new FormControl(),
    nivel: new FormControl('', [Validators.required]),
    comandos: this.permisosFormGroup,
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
  treeControl = new NestedTreeControl<any>(node => node.menus);
  dataSource = new MatTreeNestedDataSource<any>();
  constructor(
    private router: Router,
    private forBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private apiService: ApiService<role>,
  ) {}
  hasChild = (_: number, node: any) => !!node.menus && node.menus.length > 0;
  ngOnInit(): void {
    this.getpermisos()
    this.getrol()

  };
  toggleMarcado(seccion: any) {
    seccion.marcado = !seccion.marcado;
  }
  create() {
    if (this.formGroup.valid) {
      this.role_uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.role_uuid;
      this.formGroup.value.comandos = this.comando.value;
      console.log(this.formGroup.value)
      this.apiService.update(this.url, this.role_uuid, this.formGroup.value as role).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/administracion/roles');
            this.formGroup.reset();
            
          },
          complete:()=>{
            window.location.reload(); 
            this.router.navigateByUrl('/home/administracion/roles');
          }
        }
      )
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  getSubsistemas() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
          this.roles = data;
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
  datos: any;
  role_uuid!: any;
  comandosSeleccionados: { uuid: string }[] = [];
  comandosRegistrados!: string[]
  getrol() {
    this.role_uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.role_uuid).subscribe(
      {
        next: data => {
          this.datos = data;

          this.formGroup.patchValue(data);
          this.formGroup.value.comandos=this.datos.comandos
          console.log(this.formGroup.value)

          const comandosRegistrados: string[] = this.datos.comandos.map((cmd: any) => cmd.uuid);
          const comandosArray = this.permisosFormGroup.get('uuid') as FormArray
          comandosArray.clear(); // Limpiar los comandos seleccionados actuales
  
          comandosRegistrados.forEach((uuid: string) => {
            comandosArray.push(this.forBuilder.group({ uuid }));
          });
  
          this.comandosSeleccionados = this.datos.comandos.map((cmd: any) => ({ uuid: cmd.uuid }));
        }
      }
    )
  }
  isComandoSeleccionado(uuid: string): boolean {
    return this.comandosSeleccionados.some(item => item.uuid === uuid);
  }
  getpermisos() {
    this.apiService.getAll(this.endpoint_permisos).subscribe(
      {
        next: data => {
          this.permisos_data = data
          console.log(data)
          this.dataSource.data = this.permisos_data;
        }
      }
    )
  }
  get comando() {
    return this.permisosFormGroup.controls['uuid'] as FormArray
  }
  toggleComando(uuid: string, event: any) {
    const isChecked = event.target.checked;
    const index = (this.permisosFormGroup.get('uuid') as FormArray).controls.findIndex(control => control.value.uuid === uuid)
    if (isChecked && index === -1) {
      (this.permisosFormGroup.get('uuid') as FormArray).push(this.forBuilder.control({ uuid }));
    } else {
      if (index !== -1) {
        (this.permisosFormGroup.get('uuid') as FormArray).removeAt(index)
      }
    }
  }
}
