import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  private baseUrl = environment.apiBaseUrl;
  private disableSubject = new Subject<void>();
  disableComplete$ = this.disableSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAll(resourceUrl: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + resourceUrl).pipe(
      catchError((error) => {
        console.error(error);
        return of([])
      })
    );;
  }

  getAllpageable(resourceUrl: string, page: string, size: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + resourceUrl + '?page=' + page + '&size=' + size);
  }

  getOne(resourceUrl: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${resourceUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error)
        return of()
      })
    );
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

  find_register(resourceUrl: string, page: string, size: string, data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + resourceUrl + '?page=' + page + '&size=' + size, data);
  }
  auth_data(resourceUrl: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + resourceUrl);
  }

  set_permisos(data: any) {
    localStorage.setItem('Menu-Indice', data);
  }
  storedData:any
  get_permisos() {
    this.storedData = localStorage.getItem('Menu-Indice');
    return this.storedData;
  }
}
