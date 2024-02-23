import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../user-model/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/usuarios';

  
  getRoles(){
    return this.http.get<any>(this.url);
  }
  getRole(uuid:string){
    return this.http.get<any>(this.url+'/'+uuid);
  }
  create(data: user): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
  getPerson(uuid:string){
    return this.http.get<any>(this.url+'/persona/'+uuid);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url+'/'+uuid);
  }
  update(uuid: String, data: user) {
    console.log(data)
    console.log(uuid)
    return this.http.put<any>(this.url + '/' + uuid, data);
  }
}
