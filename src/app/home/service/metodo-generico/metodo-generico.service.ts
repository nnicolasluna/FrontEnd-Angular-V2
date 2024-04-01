import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiService } from '../api-generico/api.service';
interface permisos {
  subsistemas: {
    nombre: string
    descripcion: string
    estado: boolean
    icono: string
    menus: {
      descripcion: string,
      icono: string,
      link: string,
      estado: boolean,
      nombre: string,
      comandos: {
        descripcion: string,
        link: string,
        estado: boolean,
        nombre: string,
      }[]
    }[];
  }
}
@Injectable({
  providedIn: 'root'
})


export class MetodoGenericoService {
  constructor(
    private apiService: ApiService<any>
  ) { }



  private formDataSubject: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(new FormGroup({}));
  formData$: Observable<FormGroup> = this.formDataSubject.asObservable();



  setFormGroup(formGroup: FormGroup) {
    this.formDataSubject.next(formGroup);
  }

  getFormGroup(): Observable<FormGroup> {
    return this.formData$;
  }
  getFormGroupData(): any {
    return this.formDataSubject.getValue().value; // Obtener los datos del formulario del BehaviorSubject
  }
  permisos: any;
/*   getDataAndSearch(subsistemas:string, menus:string):any {
    this.apiService.auth_data("api/auth/user").subscribe(
      {
        next: data => {
          this.permisos=data
          const subsistema =this.permisos.subsistemas.find((item:any)=> item.nombre===subsistemas)
          const menu = subsistema.menus.find((item:any)=> item.nombre===menus)

          return(menu)
        }
      }
    )

  } */
  getDataAndSearch(subsistemas: string, menus: string, comandos:string): Observable<any> {
    return new Observable(observer => {
      this.apiService.auth_data("api/auth/user").subscribe({
        next: data => {
          this.permisos = data;
          const subsistema = this.permisos.subsistemas.find((item: any) => item.nombre === subsistemas);
          if (subsistema) {
            const menu = subsistema.menus.find((item: any) => item.nombre === menus);
            const comando = menu.comandos.find((item: any) => item.nombre === comandos);
            if (menu) {
              observer.next(comando);
            } else {
              observer.error(`No se encontró el menú ${menus} en el subsistema ${subsistemas}`);
            }
          } else {
            observer.error(`No se encontró el subsistema ${subsistemas}`);
          }
          observer.complete();
        },
        error: err => {
          observer.error(err);
          observer.complete();
        }
      });
    });
  }

}
