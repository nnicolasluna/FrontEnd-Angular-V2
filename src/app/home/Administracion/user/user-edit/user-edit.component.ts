import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { user } from '../user-model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { RoleService } from '../../role/role-service/role.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  private url = 'administracion/usuarios'
  private url1 = 'administracion/roles'
  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["rol", "eliminar"]
  uuid = new FormControl('')
  usueariouuid!: any;
  roles: any[] = [];

  rolesFormGroup = new FormGroup({
    uuid: this._fb.array([''])
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    usuario: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    correoCorporativo: new FormControl('@gambarte.com', [Validators.required, Validators.email]),
    correoPersonal: new FormControl('@gmail.com', [Validators.required, Validators.email]),
    estado: new FormControl(),
    personaUuid: new FormControl(''),
    foto: new FormControl(''),
    roles: this.rolesFormGroup
  });

  get usuarioControl() {
    return this.formGroup.controls.usuario;
  }
  get contControl() {
    return this.formGroup.controls.password;
  }
  get correoCControl() {
    return this.formGroup.controls.correoCorporativo;
  }
  get correoPControl() {
    return this.formGroup.controls.correoPersonal;
  }

  constructor(
    private router: Router,
    private userservice: UserService,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private rolservice: RoleService,
    private apiService: ApiService<user>,
  ) { }

  edit() {
    if (this.formGroup.valid) {
      this.usueariouuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.usueariouuid;
      this.formGroup.value.roles = this.promos.value;
      const id = this.formGroup.value.personaUuid;
      /*    this.userservice.update(this.usueariouuid, this.formGroup.value as user).subscribe(
           {
             next: () => {
               this.router.navigate(['/home/administracion/personprofile/', id]);
               this.formGroup.reset();
   
             },
             error: (error) => {
               console.log('no se puede editar papu')
             }
           }
         ); */
      this.apiService.update(this.url, this.usueariouuid, this.formGroup.value as user).subscribe(
        {
          next: () => {
            this.router.navigate(['/home/administracion/personprofile/', id]);
            this.formGroup.reset();

          },
          error: (error) => {
            console.log('no se puede editar papu')
          }
        }
      )

    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getroles();
    this.getUser();
    this.fg = this._fb.group({
      uuidrole: this.uuid,
      promos: this._fb.array([])
    });

  };
  get promos() {
    return this.fg.controls["promos"] as FormArray;
  };
  addLesson(): void {
    const lessonForm = this._fb.group({
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
  getroles() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {

          this.roles = data
        }
      }
    )
  }
  uuidUser!: any;
  datosUsuario!: any;

  getUser() {
    this.uuidUser = this.route.snapshot.paramMap.get('id');
    /*     this.userservice.getRole(this.uuidUser).subscribe(
          {
            next: (data) => {
              this.datosUsuario = data
              this.formGroup.patchValue(data);
              this.fg.patchValue(this.datosUsuario.roles[1])
              this.formGroup.value.personaUuid = this.datosUsuario.personaUuid
            },
            error: () => {
              console.log('error al obtener datos del usuario')
            }
          }
        ) */
    this.apiService.getOne(this.url, this.uuidUser).subscribe(
      {
        next: (data) => {
          this.datosUsuario = data
          this.formGroup.patchValue(data);
          this.fg.patchValue(this.datosUsuario.roles[1])
          this.formGroup.value.personaUuid = this.datosUsuario.personaUuid
        },
        error: () => {
          console.log('error al obtener datos del usuario')
        }
      }
    )
  }
  getData(): any {
    this.uuidUser = this.route.snapshot.paramMap.get('id');
    this.userservice.getRole(this.uuidUser).subscribe((data) => {
      this.datosUsuario = data
      return this.datosUsuario.roles;
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let base64String: string = reader.result as string;
      base64String = base64String.split(',')[1];
      this.formGroup.value.foto = base64String;
    };
    reader.readAsDataURL(file);
  }
}
