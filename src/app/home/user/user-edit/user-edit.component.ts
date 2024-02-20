import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { user } from '../user-model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { RoleService } from '../../role/role-service/role.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
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
    correoCorporativo: new FormControl('@gambarte.com', [Validators.required, Validators.email]),
    correoPersonal: new FormControl('@gmail.com', [Validators.required, Validators.email]),
    estado: new FormControl(false, [Validators.required]),
    personaUuid: new FormControl(''),
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

  constructor(private router: Router, private userservice: UserService, private route: ActivatedRoute, private _fb: FormBuilder, private cd: ChangeDetectorRef, private rolservice: RoleService) { }

  create() {
    if (this.formGroup.valid) {
      this.personuuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.personaUuid = this.personuuid;
      this.formGroup.value.roles = this.promos.value;
      const id = this.formGroup.value.personaUuid;
      this.userservice.create(this.formGroup.value as user).subscribe({

        next: (userData: any) => {
          if (userData) {

            this.router.navigate(['/home/personprofile/', id]);
            this.formGroup.reset();
          }
          else {
            alert("Datos Incorrectos, Verifique sus datos");
          }
        },
      });
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
      promos: this._fb.array(['nicolas'])
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
    this.rolservice.getRoles().subscribe((data) => {
      this.roles = data;

    });
  }
  uuidUser!: any;
  x!: any;

  getUser() {
    this.uuidUser = this.route.snapshot.paramMap.get('id');
    this.userservice.getRole(this.uuidUser).subscribe((data) => {
      this.x = data
      this.formGroup.patchValue(data);
      this.fg.patchValue(this.x.roles[1])

      console.log(this.fg.value)
    })
  }
  getData(): any {
    this.uuidUser = this.route.snapshot.paramMap.get('id');
    this.userservice.getRole(this.uuidUser).subscribe((data) => {
      this.x = data
      return this.x.roles;
    })
  }
}
