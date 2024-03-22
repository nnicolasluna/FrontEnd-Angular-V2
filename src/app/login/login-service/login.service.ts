import { Injectable } from '@angular/core';
import { LoginRequest } from '../login-model/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiBaseUrl;
  private url = 'api/auth';
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: any;
  constructor(private http: HttpClient) { }
  token: string = ''
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.url, credentials).pipe(
      tap(userData => {
        this.token = userData.token
        sessionStorage.setItem("token", userData.token);
        const personaDTO = userData.personaDTO;
        sessionStorage.setItem("datos", JSON.stringify(personaDTO));
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
        return throwError('Error al iniciar sesión. Por favor, intenta nuevamente.');
      })

    );
  }
  isAuth() {
    return this.token.length > 0
  }
  get userToken(): String {
    return this.currentUserData.value;
  }
  setDatos(datos: any) {
    this.user = datos;
  }
  getDatos() {
    return this.user;
  }
}
