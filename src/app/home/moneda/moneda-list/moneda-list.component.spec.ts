import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaListComponent } from './moneda-list.component';

describe('MonedaListComponent', () => {
  let component: MonedaListComponent;
  let fixture: ComponentFixture<MonedaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonedaListComponent]
    });
    fixture = TestBed.createComponent(MonedaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
