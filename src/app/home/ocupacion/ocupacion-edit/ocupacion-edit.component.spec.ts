import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacionEditComponent } from './ocupacion-edit.component';

describe('OcupacionEditComponent', () => {
  let component: OcupacionEditComponent;
  let fixture: ComponentFixture<OcupacionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcupacionEditComponent]
    });
    fixture = TestBed.createComponent(OcupacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
