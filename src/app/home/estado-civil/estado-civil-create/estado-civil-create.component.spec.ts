import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilCreateComponent } from './estado-civil-create.component';

describe('EstadoCivilCreateComponent', () => {
  let component: EstadoCivilCreateComponent;
  let fixture: ComponentFixture<EstadoCivilCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoCivilCreateComponent]
    });
    fixture = TestBed.createComponent(EstadoCivilCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
