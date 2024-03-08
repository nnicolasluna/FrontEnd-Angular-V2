import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../menu-service/menu.service';
import { menu } from '../menu-model/menu';
import { SubsistemaService } from '../../subsistema/subsistema-service/subsistema.service';

import { data } from 'cypress/types/jquery';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent {
  private url = 'administracion/menus'
  private url1 = 'administracion/subsistemas'
  subsistemas: any[] = [];
  uuid_menu!: any;
  subsistemaFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    icono: new FormControl(''),
    estado: new FormControl(),
    subsistemas: this.subsistemaFormGroup
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  } get descripcionControl() {
    return this.formGroup.controls.descripcion;
  } get linkControl() {
    return this.formGroup.controls.link;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService<menu>,
  ) { }
  
  edit() {
    if (this.formGroup.valid) {
      this.uuid_menu = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid_menu;
      this.formGroup.value.subsistemas = this.subsistemaFormGroup.value;
      this.apiService.update(this.url, this.uuid_menu, this.formGroup.value as menu,).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/administracion/menulist');
            this.formGroup.reset();
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
          this.subsistemas = data;
        }
      }
    )
  }
  ngOnInit() {
    this.getSubsistemas();
    this.getmenu();
  }
  
  getmenu() {
    this.uuid_menu = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid_menu).subscribe(
      {
        next: data => {
          this.formGroup.patchValue(data);

        }
      }
    )

  }
}
