import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comando } from '../comando-model/comando';
@Injectable({
  providedIn: 'root'
})
export class ComandoService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/comandos';
  getComands() {
    return this.http.get<any>(this.url);
  }
  getComand(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(data: comando): Observable<any> {

    return this.http.post<any>(this.url, data);
  }
  edit(data: comando, uuid: string): Observable<any> {
    return this.http.put<any>(this.url+ '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url+'/'+uuid);
  }
}
