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
    private menuservice: MenuService,
    private route: ActivatedRoute,
    private subsistemaService: SubsistemaService,
    private apiService: ApiService<menu>,
  ) { }

  create() {
    if (this.formGroup.valid) {
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.formGroup.value.uuid = this.uuid;
      this.formGroup.value.subsistemas = this.subsistemaFormGroup.value;

      /*       this.menuservice.update(this.formGroup.value as menu, this.uuid).subscribe(
              {
                next: (userData: any) => {
                  if (userData) {
                    this.router.navigateByUrl('/home/menulist');
      
                    this.formGroup.reset();
                  }
                  else {
                    alert("Datos Incorrectos, Verifique sus datos");
                  }
                },
              }); */
      this.apiService.update(this.url, this.uuid, this.formGroup.value as menu,).subscribe(
        {
          next: (userData: any) => {

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
        next:data =>{
          this.subsistemas = data;
        }
      }
    )
  /*   this.subsistemaService.getSubsis().subscribe((data) => {



    }); */
  }
  ngOnInit() {
    this.getSubsistemas();
    this.getmenu();
  }
  datos: any;
  uuid!: any;
  getmenu() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url,this.uuid).subscribe(
      {
        next: data =>{ this.datos = data;
          this.formGroup.patchValue(data);

        }
      }
    )
  
  }
}
