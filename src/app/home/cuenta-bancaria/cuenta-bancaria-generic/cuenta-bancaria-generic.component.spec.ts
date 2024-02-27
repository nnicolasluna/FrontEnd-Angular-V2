import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaGenericComponent } from './cuenta-bancaria-generic.component';

describe('CuentaBancariaGenericComponent', () => {
  let component: CuentaBancariaGenericComponent;
  let fixture: ComponentFixture<CuentaBancariaGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaBancariaGenericComponent]
    });
    fixture = TestBed.createComponent(CuentaBancariaGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
