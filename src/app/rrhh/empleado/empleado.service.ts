import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from './empleado';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiURL = "http://localhost:8080/recursosHumanos/empleados";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
 constructor(private httpClient: HttpClient) { }

 getEmpleados(numeroPagina: number, tamanoPagina: number): Observable<Empleado[]> {
    const params = new HttpParams()
    .set('numeroPagina', numeroPagina.toString())
    .set('tamanoPagina', tamanoPagina.toString());

    return this.httpClient.get<Empleado[]>(`${this.apiURL}`, { params })
    .pipe(
      catchError(this.errorHandler)
    )
}

createEmpleado(empleado:Empleado): Observable<Empleado> {
  return this.httpClient.post<Empleado>(this.apiURL, JSON.stringify(empleado), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

findEmpleado(uuid: string): Observable<Empleado> {
  return this.httpClient.get<Empleado>(`${this.apiURL}/${uuid}`)
    .pipe(
      catchError(this.errorHandler)
    );
}


updateEmpleado(uuid: string, empleado: Empleado): Observable<Empleado> {
  return this.httpClient.put<Empleado>(`${this.apiURL}/${uuid}`, JSON.stringify(empleado), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

deleteEmpleado(uuid: string){
  return this.httpClient.delete<Empleado>(`${this.apiURL}/${uuid}`, this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}
editarEstado(uuid: string): Observable<Empleado> {
  const url = `${this.apiURL}/edit-estado/${uuid}`;
  return this.httpClient.put<Empleado>(url, null) // Puedes enviar un cuerpo si es necesario
    .pipe(
      catchError(this.errorHandler)
    );
}

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
