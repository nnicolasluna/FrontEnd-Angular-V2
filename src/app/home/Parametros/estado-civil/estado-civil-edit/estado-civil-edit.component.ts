import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { estadocivil } from '../estado-civil-model/estado-civil';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-estado-civil-edit',
  templateUrl: './estado-civil-edit.component.html',
  styleUrls: ['./estado-civil-edit.component.scss']
})
export class EstadoCivilEditComponent {
  private matDialogRef!: any;
  datos!: any;
  uuid!: any;

  private url = 'parametros/estados_civiles'
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    estado: new FormControl(),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private apiService: ApiService<estadocivil>,
  ) { }
  
  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.apiService.update(this.url, this.uuid, this.formGroup.value as estadocivil).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/parametros/estado-civil-list');
            this.formGroup.reset();
          },
          error: (err:any) => {
            this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
            this.matDialogRef.afterClosed().subscribe(() => {
              /* accion a determinar  */
            });
          }
        }
      );
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: (data:any) => {
          this.datos = data;
          this.formGroup.patchValue(this.datos);
        },
        error: (err:any) => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
            /* accion por determinar */
          );
          console.log('error al obtener datos de usuario')
        }
      }
    );
  }

}