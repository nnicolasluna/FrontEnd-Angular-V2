import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvertenciaErrorConexionComponent } from 'src/app/home/modal/advertencia-error-conexion/advertencia-error-conexion.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { ApiService } from 'src/app/home/service/api-generico/api.service';

@Component({
  selector: 'app-foto-edit',
  templateUrl: './foto-edit.component.html',
  styleUrls: ['./foto-edit.component.scss']
})
export class FotoEditComponent {
  url_endpoint_foto = 'administracion/fotos'
  titulo_operacion = 'Editar Foto'
  subtitulo_operacion = 'Datos de Foto'
  
  foto_base64String!: any
  private url_personas = 'administracion/personas'
  private matDialogRef!: any;
  persona_uuid = this.route.snapshot.paramMap.get('id');
  link_boton_regresar = '/home/administracion/personprofile/'+this.persona_uuid
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    foto: new FormControl(''),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    personaUuid: new FormControl(''),
    estado: new FormControl(true),
  });
  get fotoControl() {
    return this.formGroup.controls.foto;
  }
  get descripcionControl() {
    return this.formGroup.controls.descripcion;
  }
  constructor(
    private router: Router,
    private apiService: ApiService<any>,
    private modalService: ModalService,
    private route: ActivatedRoute,
  ) { }
  editar() {
    if (this.formGroup.valid) {
      this.formGroup.value.personaUuid = this.persona_uuid;
      this.formGroup.value.foto = this.foto_base64String;
      console.log(this.formGroup.value)
      this.apiService.update(this.url_endpoint_foto,this.persona_uuid!, this.formGroup.value).subscribe({
        next: () => {

          this.router.navigate(['/home/administracion/personprofile/', this.formGroup.value.personaUuid]);
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let base64String: string = reader.result as string;
      this.foto_base64String = base64String.split(',')[1];

    };
    reader.readAsDataURL(file);
  }
  getphoto() {
    this.apiService.getOne(this.url_personas, this.persona_uuid!+'/foto').subscribe(
      {
        next: data => {
          this.formGroup.patchValue(data.foto);
        },
        error(err) {
          console.log(err)
        },
      }
    )
  }
  ngOnInit() {
    this.getphoto()
  }
}
