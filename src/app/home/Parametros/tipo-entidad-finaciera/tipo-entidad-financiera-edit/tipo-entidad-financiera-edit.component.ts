import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tipoEntidadFinanciera } from '../tipo-entidad-financiera-model/tipo-entidad-financiera';
import { switchMap } from 'rxjs';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';


@Component({
  selector: 'app-tipo-entidad-financiera-edit',
  templateUrl: './tipo-entidad-financiera-edit.component.html',
  styleUrls: ['./tipo-entidad-financiera-edit.component.scss']
})
export class TipoEntidadFinancieraEditComponent {
  private matDialogRef!: any;
  private url = 'tipo_entidades_financieras'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  datos!:  any;
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
    private modalService: ModalService,
    private apiService: ApiService<tipoEntidadFinanciera>,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => {
        
        this.uuid = this.route.snapshot.paramMap.get('id');
        
        return this.apiService.getOne('tipo_entidades_financieras', this.uuid);
      })
    ).subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (err) => {
        console.log(this.uuid)
        console.error('Error al obtener los datos:', err);
      }
    });
  }
  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: (data:any) => {
          console.log('Datos recibidos:', data); 
          this.datos = data;
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
  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.apiService.update(this.url, this.uuid, this.formGroup.value as tipoEntidadFinanciera).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/tipo-entidad-finaciera-list');
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
}
