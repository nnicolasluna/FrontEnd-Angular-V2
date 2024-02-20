import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { subsistema } from '../subsistema-model/subsistema';
@Injectable({
  providedIn: 'root'
})
export class SubsistemaService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/subsistemas';

  getSubsis() {
    return this.http.get<any>(this.url);
  }
  getSub(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(credentials: subsistema): Observable<any> {
    return this.http.post<any>(this.url, credentials);
  }
  update(uuid: string, data: subsistema) {
    return this.http.put<any>(this.url + '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
}
