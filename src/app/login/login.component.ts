import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login-service/login.service';
import { LoginRequest } from './login-model/loginRequest';
import { Subject, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { ModalService } from '../home/modal/service/modal.service';
import { AdvertenciaCredencialesComponent } from '../home/modal/advertencia-credenciales/advertencia-credenciales.component';
import { AdvertenciaDesactivadoComponent } from '../home/modal/advertencia-desactivado/advertencia-desactivado.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {
  private matDialogRef!: any;
  sitekey: string;
  private trigger: Subject<void> = new Subject<void>();
  preview: string = '';

  hasCamera: boolean = false;

  ngOnInit(): void {
    this.checkCamera();
  }
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }
  snapshot(event: WebcamImage) {
    this.preview = event.imageAsBase64;
  }
  formGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    recaptcha: new FormControl('', [Validators.required]),
    foto: new FormControl(''),
  });

  get userControl() {
    return this.formGroup.controls.usuario;
  }
  get passwordControl() {
    return this.formGroup.controls.password;
  }
  get recaptchaControl() {
    return this.formGroup.controls.recaptcha;
  }


  constructor(
    private router: Router,
    private loginService: LoginService,
    private modalService: ModalService,
  ) {

    this.sitekey = '6LdX8EwpAAAAAHmEyXWLsVNyf9iXdArqhjoBtT89';
  }


  private salt: string = '$2a$10$5pTYs/37QMz6j3ShLlSYEO';
  hashPassword(password: string, salt: string): string {
    const newpassword = bcrypt.hashSync(password, salt);
    return newpassword;
  }

  login() {
    if (this.formGroup.valid) {
      /* this.router.navigateByUrl('/home'); */

      const currentPassword = this.formGroup.value.password;
      if (currentPassword !== undefined && currentPassword !== null) {
        this.formGroup.value.password = this.hashPassword(currentPassword, this.salt);
        const valid = bcrypt.compareSync('passoword', this.formGroup.value.password);

      } else {
        console.error("El valor actual de password es undefined o null");
      }
      this.trigger.next();
      this.formGroup.value.foto = this.preview;

      this.loginService.login(this.formGroup.value as LoginRequest).subscribe(
        {
          next: (token) => {
            sessionStorage.setItem("token", token.token);
            this.router.navigate(['/home']);
            this.formGroup.reset();
          },
          
          /*        error: (error) => {
                   this.matDialogRef = this.modalService.openDialog(AdvertenciaCredencialesComponent);
                   //  AdvertenciaDesactivadoComponent
                   this.matDialogRef.afterClosed().subscribe(() => {
                     window.location.reload();
                   });
                 } */
        }
      );
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  isFocused: boolean = false;

  onInputFocus() {
    this.isFocused = true;
  }
  onInputBlur() {
    this.isFocused = false;
  }
  checkCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        this.hasCamera = true;
      })
      .catch(() => {
        this.hasCamera = false;
      });
  }
}
