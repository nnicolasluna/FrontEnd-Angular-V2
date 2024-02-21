import { Injectable } from '@angular/core';
import { LoginRequest } from '../login-model/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080/api/auth';
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<any> {

    /* return this.http.post<any>(this.url, credentials); */

    return this.http.post<any>(this.url, credentials).pipe(
      tap((userData) => {
        console.log(userData)
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),

    );
  }
  get userToken():String{
    return this.currentUserData.value;
  }
}
