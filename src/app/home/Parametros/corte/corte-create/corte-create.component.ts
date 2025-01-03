import { Component } from '@angular/core';
import { corte } from '../corte-model/corte';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';
import { MetodoGenericoService } from 'src/app/home/service/metodo-generico/metodo-generico.service';


@Component({
  selector: 'app-corte-create',
  templateUrl: './corte-create.component.html',
  styleUrls: ['./corte-create.component.scss']
})
export class CorteCreateComponent {
  private url = 'parametros/cortes'
  private url1 = 'parametros/monedas'
  private url2 = 'parametros/tipo_cortes'
  operacion = 'Registrar'
  editar = ''
  moneda: any[] = [];
  tipoCorte: any[] = [];
  private matDialogRef!: any;
  formGroup = new FormGroup({
    valor: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    orden: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    monedas: new FormControl('', [Validators.required]),
    tipoCortes: new FormControl('', [Validators.required]),
    estado: new FormControl(true),
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
          this.router.navigateByUrl('/home/parametros/corte-list');
          this.formGroup.reset();

        },
        error: err => {
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(()=>{})
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
          this.moneda = data
        },
        error: ()=>{
          this.matDialogRef = this.modalService.openDialog(AdvertenciaErrorConexionComponent)
          this.matDialogRef.afterClosed().subscribe(()=>{})
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
}
