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

  getDataAndSearch(subsistemas: string, menus: string, comandos: string): Observable<any> {
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


  /* permisos_editar: string = ''
  permisos_crear: string = ''
  permisos_borrar: string = ''
  comando_list!: any
  comando_menus(menu_uui: string): Observable<{ editar: string , crear: string , borrar: string}>{
    let editar: string='';
    let crear: string='';
    let borrar: string='';
    this.apiService.getOne('api/auth/user/permisos', menu_uui).subscribe(
      {
        next: (data) => {
          this.comando_list = data
          this.comando_list.forEach((item: any) => {
            switch (item.tipoOperacion) {
              case 'C':
                crear = item.linkMenu;
                break;
              case 'E':
                editar = item.linkMenu;
                break;
              case 'B':
                borrar = item.linkMenu;
                break;
              default:
                break;
            }
          });
        }
      }
    )
    return { editar, crear, borrar };
  }
  get_permisos_crear() {
    return this.permisos_crear
  }
  get_permisos_editar() {
    return this.permisos_editar
  }
  get_permisos_borrar() {
    return this.permisos_borrar
  } */



comando_menus(menu_uui: string): Observable<{ editar: string | null, crear: string | null, borrar: string | null }> {
  return this.apiService.getOne('api/auth/user/permisos', menu_uui).pipe(
    map((data: any) => {
      let editar: string | null = null;
      let crear: string | null = null;
      let borrar: string | null = null;

      data.forEach((item: any) => {
        switch (item.tipoOperacion) {
          case 'C':
            crear = item.linkMenu;
            break;
          case 'E':
            editar = item.linkMenu;
            break;
          case 'B':
            borrar = item.linkMenu;
            break;
          default:
            break;
        }
      });

      return { editar, crear, borrar };
    })
  );
}

}
