import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaListComponent } from './agencia-list.component';

describe('AgenciaListComponent', () => {
  let component: AgenciaListComponent;
  let fixture: ComponentFixture<AgenciaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciaListComponent]
    });
    fixture = TestBed.createComponent(AgenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
