import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../role-service/role.service';
import { role } from '../role-model/role';
import { MatTableDataSource } from '@angular/material/table'
import { SubsistemaService } from '../../subsistema/subsistema-service/subsistema.service';
import { ApiService } from '../../service/api-generico/api.service';
@Component({
  selector: 'app-rolecreate',
  templateUrl: './rolecreate.component.html',
  styleUrls: ['./rolecreate.component.scss']
})
export class RolecreateComponent {
  private url = 'roles'
  private url1 = 'subsistemas'
  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["rol", "eliminar"]
  uuid = new FormControl('')
  personuuid!: any;
  roles: any[] = [];

  subsistemasFormGroup = new FormGroup({
    uuid: this.forBuilder.array([''])
  });
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    estado: new FormControl(true),
    nivel: new FormControl('', [Validators.required]),
    subsistemas: this.subsistemasFormGroup,
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
    private roleservice: RoleService,
    private forBuilder: FormBuilder,
    private subsistemaService: SubsistemaService,
    private cd: ChangeDetectorRef,
    private apiService: ApiService<role>,
  ) { }


  ngOnInit(): void {
    this.getSubsistemas();
    this.fg = this.forBuilder.group({
      uuidrole: this.uuid,
      promos: this.forBuilder.array([])
    });

  };
  create() {
    if (this.formGroup.valid) {
      this.formGroup.value.subsistemas = this.promos.value;
      /*  this.roleservice.create(this.formGroup.value as role).subscribe({
         next: (userData: any) => {
             this.router.navigateByUrl('/home/rolelist');
             this.formGroup.reset();
         
         },
       }); */
      this.apiService.create(this.url, this.formGroup.value as role).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/rolelist');
            this.formGroup.reset();

          },
        }
      )
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  getSubsistemas() {

    /* this.subsistemaService.getSubsis().subscribe((data) => {
      this.roles = data;

    }); */
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {

          this.roles = data
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
}
