import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/paises';

  getPaises(){
    return this.http.get<any>(this.url);
  }
  getPais(uuid: string){
    return this.http.get<any>(this.url+'/'+uuid);
  }
}
