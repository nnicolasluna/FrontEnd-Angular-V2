import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tipoDocumento } from '../tipo-documento-model/tipoDocumento';
@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/tipo_documentos';

  getDocuments() {
    return this.http.get<any>(this.url);
  }
  getDocument(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  createTipoDoc(credentials: tipoDocumento): Observable<any> {
    return this.http.post<any>(this.url, credentials);
  }
  update(data: tipoDocumento, uuid: string,) {
    return this.http.put<any>(this.url + '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
}
