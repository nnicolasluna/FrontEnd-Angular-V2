import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroService } from '../genero-service/genero.service';
import { ModalService } from '../../modal/service/modal.service';
import { genero, generoDTO } from '../genero-model/genero';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-genero-edit',
  templateUrl: './genero-edit.component.html',
  styleUrls: ['./genero-edit.component.scss']
})
export class GeneroEditComponent {
  private matDialogRef!: any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    abreviatura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });
  get nombreControl() {
    return this.formGroup.controls.nombre;
  }
  get abreviaturaControl() {
    return this.formGroup.controls.abreviatura;
  }
  constructor(
    private router: Router,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }
uuidx!:any;
  update() {
    this.uuidx=this.route.snapshot.paramMap.get('id')
    this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.generoService.update(this.formGroup.value as genero,this.uuid).subscribe({

        next: (userData: any) => {
          if (userData) {

            this.router.navigateByUrl('/home/genero-list');
            this.formGroup.reset();
          }
          else {
            alert("Datos Incorrectos, Verifique sus datos");
          }
        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(() => {
            /* accion a determinar  */
          });
        }
      });
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.getGenero();
  }
  uuid!: any;
  datos!: generoDTO;
  getGenero() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.generoService.getGenero(this.uuid).subscribe(
      {
        next: data => {
          this.datos = data;
          this.formGroup.patchValue(this.datos);
        },
        error: err =>{
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent);
          this.matDialogRef.afterClosed().subscribe(
            /* this.router.navigateByUrl('/login') */
          );
          console.log('error al obtener datos de usuario')
        }
      }
    )
  }
}
