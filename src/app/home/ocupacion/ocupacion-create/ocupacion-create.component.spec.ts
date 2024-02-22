import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacionCreateComponent } from './ocupacion-create.component';

describe('OcupacionCreateComponent', () => {
  let component: OcupacionCreateComponent;
  let fixture: ComponentFixture<OcupacionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcupacionCreateComponent]
    });
    fixture = TestBed.createComponent(OcupacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
