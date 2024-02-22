import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilListComponent } from './estado-civil-list.component';

describe('EstadoCivilListComponent', () => {
  let component: EstadoCivilListComponent;
  let fixture: ComponentFixture<EstadoCivilListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoCivilListComponent]
    });
    fixture = TestBed.createComponent(EstadoCivilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
