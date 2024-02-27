import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { cuentaBancaria } from '../cuenta-bancaria-model/cuenta-bancaria';
import { switchMap } from 'rxjs';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-cuenta-bancaria-edit',
  templateUrl: './cuenta-bancaria-edit.component.html',
  styleUrls: ['./cuenta-bancaria-edit.component.scss']
})
export class CuentaBancariaEditComponent {
  private url = 'cuentas_bancarias'
  private url1 = 'monedas'
  private url2 = 'tipo_cuentas_bancarias'
  private url3 = 'entidades_financieras'
  private url4 = 'agencias'
  operacion = 'Registrar'
  editar = ''
  agencias: any[] = [];
  monedas: any[] = [];
  tipocuentas: any[] = [];
  entidadfinancieras: any[] = [];
  uuid!: any;
  datos!: any;
  private matDialogRef!: any;
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    numero_cuenta: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    fecha_apertura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    contrato: new FormControl('', [Validators.required]),
    tipoCuentasBancarias: new FormControl('', [Validators.required]),
    entidadesFinancieras: new FormControl('', [Validators.required]),
    monedas: new FormControl('', [Validators.required]),
    agencias: new FormControl('', [Validators.required]),
  });
  get numero_cuentaControl() {
    return this.formGroup.controls.numero_cuenta;
  }
  get fecha_aperturaControl() {
    return this.formGroup.controls.fecha_apertura;
  }
  get contratoControl() {
    return this.formGroup.controls.contrato;
  }
  get tipoCuentasBancariasControl() {
    return this.formGroup.controls.tipoCuentasBancarias;
  }
  get entidadesFinancierasControl() {
    return this.formGroup.controls.entidadesFinancieras;
  }
  get monedasControl() {
    return this.formGroup.controls.monedas;
  }
  get agenciasControl() {
    return this.formGroup.controls.agencias;
  }
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService<cuentaBancaria>,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getAll()
    this.getOne()
    this.route.paramMap.pipe(
      switchMap(params => {
        this.uuid = this.route.snapshot.paramMap.get('id');
        return this.apiService.getOne('agencias', this.uuid);
      })
    ).subscribe({
      next: (data) => {
        this.datos = data;
        console.log(this.datos)
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
      this.apiService.update(this.url, this.uuid, this.formGroup.value as cuentaBancaria).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/home/cuenta-bancaria-list');
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
          this.monedas = data
        }
      }
    )
    this.apiService.getAll(this.url2).subscribe(
      {
        next: data => {
          this.tipocuentas = data
        }
      }
    )
    this.apiService.getAll(this.url3).subscribe(
      {
        next: data => {
          this.entidadfinancieras = data
        }
      }
    )
    this.apiService.getAll(this.url4).subscribe(
      {
        next: data => {
          this.agencias = data
        }
      }
    )
  }
  getOne() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.apiService.getOne(this.url, this.uuid).subscribe(
      {
        next: data => {
          this.datos = data


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
