import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Subject } from 'rxjs';
import { tap } from 'cypress/types/lodash';
@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  private baseUrl = environment.apiBaseUrl;
  private disableSubject = new Subject<void>();
  disableComplete$ = this.disableSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAll(resourceUrl: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + resourceUrl);
  }

  getOne(resourceUrl: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${resourceUrl}/${id}`);
  }

  create(resourceUrl: string, data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + resourceUrl, data);
  }

  update(resourceUrl: string, id: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${resourceUrl}/${id}`, data);
  }

  delete(resourceUrl: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${resourceUrl}/${id}`);
  }

  disable(resourceUrl: string, id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}${resourceUrl}/${id}`, null);
  }
  
  find_register(resourceUrl: string, data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + resourceUrl, data);
  }
}
