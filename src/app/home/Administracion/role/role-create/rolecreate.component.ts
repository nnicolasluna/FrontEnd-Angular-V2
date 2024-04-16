import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { role } from '../role-model/role';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from 'src/app/home/service/api-generico/api.service';

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

  toggleMarcado(seccion: any) {
    seccion.marcado = !seccion.marcado;
  }

  permisosFormGroup = new FormGroup({
    uuid: this.forBuilder.array([])
  });
  permisos_data: any[] = [];

  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    estado: new FormControl(true),
    nivel: new FormControl(null, [Validators.required]),
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

  ngOnInit() {
    this.getpermisos()
  }


  create() {
    if (this.formGroup.valid) {
      console.log(this.permisosFormGroup.value.uuid)
      this.formGroup.value.comandos = this.comando.value
      console.log(this.formGroup.value)
      this.apiService.create(this.url, this.formGroup.value as any).subscribe(
        {

          next: () => {

            this.router.navigateByUrl('/home/administracion/roles');
            this.formGroup.reset();
            /* window.location.reload(); */

          },
          complete: () => {
            console.log('guardado papi')
          }
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
