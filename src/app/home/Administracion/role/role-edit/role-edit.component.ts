import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../role-service/role.service';
import { role } from '../role-model/role';
import { MatTableDataSource } from '@angular/material/table'
import { SubsistemaService } from '../../subsistema/subsistema-service/subsistema.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent {
  private url = 'administracion/roles'
  private url1 = 'administracion/subsistemas'
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
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    estado: new FormControl(),
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
    private route: ActivatedRoute,
    private apiService: ApiService<role>,
  ) { }


  ngOnInit(): void {
    this.getSubsistemas();
    this.fg = this.forBuilder.group({
      uuidrole: this.uuid,
      promos: this.forBuilder.array([])
    });
    this.getrol();
  };
  create() {
    if (this.formGroup.valid) {
      this.uuidx = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuidx;
      this.formGroup.value.subsistemas = this.promos.value;
      this.apiService.update(this.url, this.uuidx, this.formGroup.value as role).subscribe(
        {
          next: (userData: any) => {
            this.router.navigateByUrl('/home/administracion/roles');
            this.formGroup.reset();
          },
        }
      )
      /* this.roleservice.update(this.uuidx,this.formGroup.value as role).subscribe({

        next: (userData: any) => {
         
            this.router.navigateByUrl('/home/rolelist');
            this.formGroup.reset();
         
        },
      }); */
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
    /*  this.subsistemaService.getSubsis().subscribe((data) => {
       console.log(data);
    
 
     }); */
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
  uuidx!: any;
  getrol() {
    this.uuidx = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuidx).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(data);
        }
      }
    )
    /*   this.roleservice.getRol(this.uuidx).subscribe((data) => {
        this.datos = data;
        this.formGroup.patchValue(data);
      }); */
  }
}
