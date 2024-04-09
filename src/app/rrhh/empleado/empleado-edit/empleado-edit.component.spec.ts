import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoEditComponent } from './empleado-edit.component';

describe('EmpleadoEditComponent', () => {
  let component: EmpleadoEditComponent;
  let fixture: ComponentFixture<EmpleadoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadoEditComponent]
    });
    fixture = TestBed.createComponent(EmpleadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
