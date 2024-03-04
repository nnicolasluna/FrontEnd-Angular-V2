import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../menu-service/menu.service';
import { menu } from '../menu-model/menu';
import { SubsistemaService } from '../../subsistema/subsistema-service/subsistema.service';

@Component({
  selector: 'app-menucreate',
  templateUrl: './menucreate.component.html',
  styleUrls: ['./menucreate.component.scss']
})
export class MenucreateComponent {
  subsistemas: any[] = [];
  subsistemaFormGroup = new FormGroup({
    uuid: new FormControl(''),
  });
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    link: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    icono: new FormControl(''),
    estado: new FormControl(false, [Validators.required]),
    subsistemas: this.subsistemaFormGroup
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  } get descripcionControl() {
    return this.formGroup.controls.descripcion;
  } get linkControl() {
    return this.formGroup.controls.link;
  }
  get estadoControl() {
    return this.formGroup.controls.estado;
  }
  constructor(private router: Router,
    private menuservice: MenuService,
    private route: ActivatedRoute,
    private subsistemaService: SubsistemaService
  ) { }

  create() {
    if (this.formGroup.valid) {

      this.formGroup.value.subsistemas = this.subsistemaFormGroup.value;
      this.formGroup.value.subsistemas = this.subsistemaFormGroup.value;
      this.menuservice.create(this.formGroup.value as menu).subscribe({

        next: () => {
          this.formGroup.reset();
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.router.navigateByUrl('/home/menulist');
        }
      });
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  getSubsistemas() {
    this.subsistemaService.getSubsis().subscribe(
      {
        next: (data) => {
          console.log(data);
          this.subsistemas = data;

        },
        error: err => {
          console.log('no se puede acceder al servicio')
        }
      }
    );
  }
  ngOnInit() {
    this.getSubsistemas();
  }
}
