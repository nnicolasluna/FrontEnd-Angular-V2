import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from './cargo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private apiURL = 'http://localhost:8080/recursosHumanos/cargos';

  constructor(private http: HttpClient) { }

  obtenerCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.apiURL);
  }
}
