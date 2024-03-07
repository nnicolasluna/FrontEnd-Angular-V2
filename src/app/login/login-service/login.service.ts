import { Injectable } from '@angular/core';
import { LoginRequest } from '../login-model/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
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

  login(credentials: LoginRequest): Observable<any> {

    /* return this.http.post<any>(this.url, credentials); */

    return this.http.post<any>(this.baseUrl+this.url, credentials).pipe(
      tap((userData) => {
        console.log(userData)
        sessionStorage.setItem("token", userData.token);
        const personaDTO = userData.personaDTO;
        sessionStorage.setItem("datos", JSON.stringify(personaDTO));
        const rol = userData.roles;
        /* sessionStorage.setItem("roles", userData.roles); */
        sessionStorage.setItem("rol", JSON.stringify(rol));
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),

    );
  }
  get userToken():String{
    return this.currentUserData.value;
  }

  setDatos(datos: any) {
    this.user = datos;
  }
  getDatos() {
    return this.user;
  }
}
