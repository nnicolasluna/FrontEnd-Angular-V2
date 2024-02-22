import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { estadocivil, estadocivilDTO } from '../estado-civil-model/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/estado-civiles';
  getAll() {
    return this.http.get<any>(this.url);
  }
  getOne(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(data: estadocivil): Observable<any> {

    return this.http.post<any>(this.url, data);
  }
  update(data: estadocivilDTO, uuid: string): Observable<any> {
    return this.http.put<any>(this.url + '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
}
