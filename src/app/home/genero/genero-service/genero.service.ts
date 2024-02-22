import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { genero } from '../genero-model/genero';
@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/generos';
  getGeneros() {
    return this.http.get<any>(this.url);
  }
  getGenero(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(data: genero): Observable<any> {

    return this.http.post<any>(this.url, data);
  }
  update(data: genero, uuid: string): Observable<any> {
    return this.http.put<any>(this.url+ '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url+'/'+uuid);
  }
}
