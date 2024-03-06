import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { corte } from '../corte-model/corte';
import { switchMap } from 'rxjs';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-corte-edit',
  templateUrl: './corte-edit.component.html',
  styleUrls: ['./corte-edit.component.scss']
})
export class CorteEditComponent {

  private matDialogRef!: any;
  private url = 'cortes'
  private url1 = 'monedas'
  private url2 = 'tipo_cortes'
  operacion = 'Registrar'
  uuid!: any;
  editar = ''
  moneda: any[] = [];
  tipoCorte: any[] = [];
  datos!:  any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    valor: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    orden: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    monedas: new FormControl('', [Validators.required]),
    tipoCortes: new FormControl('', [Validators.required]),
    estado: new FormControl(),
  });
  get valorControl() {
    return this.formGroup.controls.valor;
  }
  get ordenControl() {
    return this.formGroup.controls.orden;
  }

  get paisControl() {
    return this.formGroup.controls.monedas;
  }
  get tipoCorteControl() {
    return this.formGroup.controls.tipoCortes;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<corte>,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getAll()
    this.getOne()
    this.route.paramMap.pipe(
      switchMap(params => {
        this.uuid = this.route.snapshot.paramMap.get('id');
        return this.apiService.getOne('monedas', this.uuid);
      })
    ).subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos:', err);
      }
    });
  }
  update() {
    if (this.formGroup.valid) {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id');
      this.uuid = this.route.snapshot.paramMap.get('id');
      this.apiService.update(this.url, this.uuid, this.formGroup.value as corte).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/corte-list');
            this.formGroup.reset();
          },
          error: err => {
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
  getAll() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
          this.moneda = data
        }
      }
    )
    this.apiService.getAll(this.url2).subscribe(
      {
        next: data => {
          this.tipoCorte = data
        }
      }
    )
  }
  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.datos=data
          console.log('Datos recibidos:', data); 

        },
        error: err => {
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
