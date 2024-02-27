import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaEditComponent } from './agencia-edit.component';

describe('AgenciaEditComponent', () => {
  let component: AgenciaEditComponent;
  let fixture: ComponentFixture<AgenciaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciaEditComponent]
    });
    fixture = TestBed.createComponent(AgenciaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
