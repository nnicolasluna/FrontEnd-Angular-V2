import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { menu } from '../menu-model/menu';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/api/menus';
  getMenus() {
    return this.http.get<any>(this.url);
  }
  getmenu(uuid: string) {
    return this.http.get<any>(this.url + '/' + uuid);
  }
  create(data: menu): Observable<any> {
    
    return this.http.post<any>(this.url, data);
  }
  update(data: menu, uuid: string) {
    return this.http.put<any>(this.url + '/' + uuid, data);
  }
  destroy(uuid: string) {
    return this.http.delete(this.url + '/' + uuid);
  }
}
