import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaListComponent } from './cuenta-bancaria-list.component';

describe('CuentaBancariaListComponent', () => {
  let component: CuentaBancariaListComponent;
  let fixture: ComponentFixture<CuentaBancariaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaBancariaListComponent]
    });
    fixture = TestBed.createComponent(CuentaBancariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
