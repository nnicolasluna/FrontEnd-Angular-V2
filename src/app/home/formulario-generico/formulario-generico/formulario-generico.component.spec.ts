import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGenericoComponent } from './formulario-generico.component';

describe('FormularioGenericoComponent', () => {
  let component: FormularioGenericoComponent;
  let fixture: ComponentFixture<FormularioGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioGenericoComponent]
    });
    fixture = TestBed.createComponent(FormularioGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
