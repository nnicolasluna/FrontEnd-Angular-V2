import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from './area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiURL = 'http://localhost:8080/recursosHumanos/areas';

  constructor(private http: HttpClient) { }

  obtenerAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiURL);
  }
}
