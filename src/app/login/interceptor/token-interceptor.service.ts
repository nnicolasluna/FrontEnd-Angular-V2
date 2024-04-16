import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AdvertenciaGenericaComponent } from 'src/app/home/modal/advertencia-generica/advertencia-generica.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';



@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  private matDialogRef!: any;

  constructor(
    private modalService: ModalService,
    private router: Router,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token_sesion = sessionStorage.getItem("token");

    if (token_sesion) {
      request = request.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_sesion}`,
          },
        }
      );
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('identify');
            this.router.navigateByUrl('/login');
          }
          this.matDialogRef = this.modalService.GenericDialog(AdvertenciaGenericaComponent, {
            data: {
              titulo: error.error.message,
            }
          })
          this.matDialogRef.afterClosed().subscribe(() => { })


          return throwError(error);
        })
      );
  }
}






