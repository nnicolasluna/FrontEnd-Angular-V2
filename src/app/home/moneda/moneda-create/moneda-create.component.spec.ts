import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaCreateComponent } from './moneda-create.component';

describe('MonedaCreateComponent', () => {
  let component: MonedaCreateComponent;
  let fixture: ComponentFixture<MonedaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonedaCreateComponent]
    });
    fixture = TestBed.createComponent(MonedaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
