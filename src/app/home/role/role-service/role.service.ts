import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { role } from '../role-model/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/roles';


  getRoles() {
    return this.http.get<any>(this.url);
  }
  getRol(uuid: String) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  update(uuid: String, data: role) {
    return this.http.put<any>(this.url + '/' + uuid, data);
  }

  create(credentials: role): Observable<any> {
    return this.http.post<any>(this.url, credentials);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
}
