import { Injectable } from '@angular/core';
import { LoginRequest } from '../login-model/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080/login';
  constructor(private http: HttpClient) { }
  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials)
    /* return this.http.post<any>('http://localhost:8080/login',credentials); */
    return this.http.post<any>(this.url, credentials);

  }
}
