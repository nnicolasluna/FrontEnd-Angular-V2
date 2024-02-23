import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoGenericoService {

  private formDataSubject: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(new FormGroup({}));
  formData$: Observable<FormGroup> = this.formDataSubject.asObservable();

  constructor() {}

  setFormGroup(formGroup: FormGroup) {
    this.formDataSubject.next(formGroup);
  }

  getFormGroup(): Observable<FormGroup> {
    return this.formData$;
  }
}
