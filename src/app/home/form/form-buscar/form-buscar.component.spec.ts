import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuscarComponent } from './form-buscar.component';

describe('FormBuscarComponent', () => {
  let component: FormBuscarComponent;
  let fixture: ComponentFixture<FormBuscarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuscarComponent]
    });
    fixture = TestBed.createComponent(FormBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
