import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaCreateComponent } from './agencia-create.component';

describe('AgenciaCreateComponent', () => {
  let component: AgenciaCreateComponent;
  let fixture: ComponentFixture<AgenciaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciaCreateComponent]
    });
    fixture = TestBed.createComponent(AgenciaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
