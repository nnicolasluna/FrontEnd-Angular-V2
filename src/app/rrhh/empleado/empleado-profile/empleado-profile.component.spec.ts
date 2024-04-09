import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoProfileComponent } from './empleado-profile.component';

describe('EmpleadoProfileComponent', () => {
  let component: EmpleadoProfileComponent;
  let fixture: ComponentFixture<EmpleadoProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadoProfileComponent]
    });
    fixture = TestBed.createComponent(EmpleadoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
