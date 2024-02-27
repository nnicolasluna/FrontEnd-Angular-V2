import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaGenericComponent } from './agencia-generic.component';

describe('AgenciaGenericComponent', () => {
  let component: AgenciaGenericComponent;
  let fixture: ComponentFixture<AgenciaGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciaGenericComponent]
    });
    fixture = TestBed.createComponent(AgenciaGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
