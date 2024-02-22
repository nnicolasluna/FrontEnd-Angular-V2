import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaEditComponent } from './moneda-edit.component';

describe('MonedaEditComponent', () => {
  let component: MonedaEditComponent;
  let fixture: ComponentFixture<MonedaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonedaEditComponent]
    });
    fixture = TestBed.createComponent(MonedaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
