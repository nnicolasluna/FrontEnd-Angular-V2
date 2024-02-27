import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../modal/service/modal.service';
import { ApiService } from '../../service/api-generico/api.service';
import { cuentaBancaria } from '../cuenta-bancaria-model/cuenta-bancaria';
import { MetodoGenericoService } from '../../service/metodo-generico/metodo-generico.service';
import { AdvertenciaErrorConexionComponent } from '../../modal/advertencia-error-conexion/advertencia-error-conexion.component';

@Component({
  selector: 'app-cuenta-bancaria-create',
  templateUrl: './cuenta-bancaria-create.component.html',
  styleUrls: ['./cuenta-bancaria-create.component.scss']
})
export class CuentaBancariaCreateComponent {
  private url = 'cuentas_bancarias'
  private url1 = 'monedas'
  operacion = 'Registrar'
  editar = ''
  ciudad: any[] = [];
  tipoCorte: any[] = [];
  private matDialogRef!: any;
  formGroup = new FormGroup({
    numero_cuenta: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    fecha_apertura: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    contrato: new FormControl('', [Validators.required]),
    tipoCuentasBancarias: new FormControl('', [Validators.required]),
    entidadesFinancieras: new FormControl('',[Validators.required]),
    monedas: new FormControl('',[Validators.required]),
    agencias: new FormControl('',[Validators.required]),
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
    private metodogenerico: MetodoGenericoService
  ) { }
  ngOnInit() {
    this.getAll();

  }
  create() {
    if (this.formGroup.valid) {
      const formData = this.metodogenerico.getFormGroupData();
      this.apiService.create(this.url, formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/agencia-list');
          this.formGroup.reset();

        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  getAll() {
    this.apiService.getAll(this.url1).subscribe(
      {
        next: data => {
         
          this.ciudad = data
        },
        error: () => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(() => { })
        }
      }
    )
 
  }
}
