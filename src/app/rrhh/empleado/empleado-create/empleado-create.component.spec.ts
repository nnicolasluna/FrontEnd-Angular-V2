import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCreateComponent } from './empleado-create.component';

describe('EmpleadoCreateComponent', () => {
  let component: EmpleadoCreateComponent;
  let fixture: ComponentFixture<EmpleadoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadoCreateComponent]
    });
    fixture = TestBed.createComponent(EmpleadoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
