import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { documento } from '../documento-model/documento';
@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/documentos';
  getdocumentos() {
    return this.http.get<any>(this.url);
  }
  getdocumento(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(data: documento): Observable<any> {

    return this.http.post<any>(this.url, data);
  }
  update(data: documento, uuid: string): Observable<any> {
    return this.http.put<any>(this.url + '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
}
