import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { person } from '../person-model/person';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/personas';

  getPeople() {
    return this.http.get<any>(this.url);
  }
  getPerson(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(data: person): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
  update(data: person, uuid: string) {
    return this.http.put(this.url + '/' + uuid, data);
  }
  getDocuments(uuid: string) {
    return this.http.get(this.url + '/' + uuid + '/documentos');
  }
}
