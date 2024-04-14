import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { user } from '../user-model/user';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { RoleService } from '../../role/role-service/role.service';
import * as bcrypt from 'bcryptjs';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss']
})
export class UsercreateComponent {
  private url = 'administracion/usuarios/user-create'
  private url1 = 'administracion/roles'
  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["rol", "eliminar"]
  uuid = new FormControl('')
  personuuid!: any;
  roles: any[] = [];
  rolesFormGroup = new FormGroup({
    uuid: this._fb.array([''])
  });
  formGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    correoCorporativo: new FormControl('', [Validators.required, Validators.email]),
    correoPersonal: new FormControl('', [Validators.required, Validators.email]),
    estado: new FormControl(true),
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
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService<user>,
    ) { }

  private salt: string = '$2a$10$5pTYs/37QMz6j3ShLlSYEO';
  hashPassword(password: string, salt: string): string {
    const newpassword = bcrypt.hashSync(password, salt);
    return newpassword;
  }
  create() {
   
    if (this.formGroup.valid) {
      const currentPassword = this.formGroup.value.password;
      if (currentPassword !== undefined && currentPassword !== null) {
        this.formGroup.value.password = this.hashPassword(currentPassword, this.salt);
      } else {
        console.error("El valor actual de password es undefined o null");
      }
      this.personuuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.personaUuid = this.personuuid;
      this.formGroup.value.roles = this.promos.value;
      const id = this.formGroup.value.personaUuid;
      console.log(this.formGroup.value)
      this.apiService.create(this.url, this.formGroup.value as user).subscribe(
        {
          next: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: { tabIndex: 2 } // Establece el índice de la pestaña que deseas seleccionar
            };
            this.router.navigate(['/home/administracion/personprofile/', id],navigationExtras);
            this.formGroup.reset();
          },
        }
      )
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getroles();
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

/* fg!: FormGroup
dataSourcePacks!: MatTableDataSource<any>;
displayedColumns = ["cantDesde", "eliminar"]
uuid = new FormControl('')
constructor(private _fb: FormBuilder, private cd: ChangeDetectorRef) { }
ngOnInit(): void {
  this.fg = this._fb.group({
    uuid: this.uuid,
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
onSubmit() {
  console.log(this.promos.value)
} */