import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilEditComponent } from './estado-civil-edit.component';

describe('EstadoCivilEditComponent', () => {
  let component: EstadoCivilEditComponent;
  let fixture: ComponentFixture<EstadoCivilEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoCivilEditComponent]
    });
    fixture = TestBed.createComponent(EstadoCivilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
