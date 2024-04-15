import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { role, roles } from '../role-model/role';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';


@Component({
  selector: 'app-rolecreate',
  templateUrl: './rolecreate.component.html',
  styleUrls: ['./rolecreate.component.scss']
})
export class RolecreateComponent {
  comandosSeleccionados: string[] = [];

  private url = 'administracion/roles'
  private url1 = 'administracion/subsistemas'
  private endpoint_permisos = 'administracion/subsistemas/permisos'
  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["rol", "eliminar"]
  roles: any[] = [];
  permisosFormGroup = new FormGroup({
    uuid: this.forBuilder.array([])
  });
  permisos_data: any[] = [];
  formGroup_roles!: FormGroup;
  initFormGroup(): void {
    this.formGroup_roles = this.forBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      estado: [true],
      nivel: [0, [Validators.required]],
      comandos: this.forBuilder.array([])
    });
  }
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    estado: new FormControl(true),
    nivel: new FormControl(0, [Validators.required]),
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

  constructor(
    private router: Router,
    private forBuilder: FormBuilder,
    private apiService: ApiService<role>,
  ) { }

  /* uuidFormArray = this.permisosFormGroup.get('uuid') as FormArray; */
  /* ngOnInit(): void {
    this.getpermisos()
    this.getSubsistemas();
    this.fg = this.forBuilder.group({
      uuidrole: this.uuid,
      promos: this.forBuilder.array([])
    });

  }; */
  ngOnInit() {
    this.getpermisos()
    /*   this.permisos_data=TREE_DATA
      this.permisosFormGroup = this.formBuilder.group({}); */

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

  /*   getComandoControl(subsistemaId: string, menuId: string, comandoId: string): FormControl {
      return this.permisosFormGroup.get(`${subsistemaId}.${menuId}.${comandoId}`) as FormControl;
    } */



  create() {
    console.log(this.formGroup.value)
    /*    const permiso: Permiso = {
         nombre: "nombre_permiso",
         nivel: 200,
         descripcion: "descripción_permiso",
         comandos: this.comandosSeleccionados.map(uuid => ({ uuid }))
       };
    */
    // Aquí puedes enviar 'permiso' al servidor o hacer lo que necesites con él
    /* console.log(permiso); */
    /*  console.log(this.permisosFormGroup.value.uuid) */
    /*  const valores = this.uuidFormArray.value; */ // Obtener los valores del FormArray

    /*  console.log(valores)
     console.log('UUIDs Seleccionados:', this.uuidsSeleccionados); */
    /*     const comandogroup=this.permisosFormGroup.value.uuid */
    if (this.formGroup.valid) {
      /*    if(comandogroup){
           this.formGroup.value.comandos = comandogroup.values
         } */

      console.log(this.permisosFormGroup.value.uuid)
      this.formGroup.value.comandos = this.comando.value
      this.apiService.create(this.url, this.formGroup.value as any).subscribe(
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
    }
  }
  /*   toggleComando(uuid: string, event: any) {
      const isChecked = event.target.checked;
  
      if (isChecked) {
        // Agregar el UUID a la lista de comandos seleccionados
        this.comandosSeleccionados.push(uuid);
      } else {
        // Remover el UUID de la lista de comandos seleccionados
        const index = this.comandosSeleccionados.indexOf(uuid);
        if (index !== -1) {
          this.comandosSeleccionados.splice(index, 1);
        }
      }
    } */
    fga!: FormGroup
  get comando(){
    return this.permisosFormGroup.controls['uuid'] as FormArray
  }
  toggleComando(uuid: string, event: any) {
    const isChecked = event.target.checked;
    const index = (this.permisosFormGroup.get('uuid') as FormArray).controls.findIndex(control => control.value.uuid === uuid)
    if (isChecked && index === -1) {
      // Agregar el UUID a la lista de comandos seleccionados
      /* this.comandosSeleccionados.push(uuid); */
      /* (this.permisosFormGroup.get('uuid') as FormArray).push(this.forBuilder.group({ uuid })) */
      (this.permisosFormGroup.get('uuid') as FormArray).push(this.forBuilder.control({uuid}));
    } else {
      // Remover el UUID de la lista de comandos seleccionados

      if (index !== -1) {
        (this.permisosFormGroup.get('uuid') as FormArray).removeAt(index)
      }
    }
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

        }
      }
    )
  }




}
