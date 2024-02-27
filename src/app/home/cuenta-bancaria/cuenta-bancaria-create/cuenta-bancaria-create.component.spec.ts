import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaCreateComponent } from './cuenta-bancaria-create.component';

describe('CuentaBancariaCreateComponent', () => {
  let component: CuentaBancariaCreateComponent;
  let fixture: ComponentFixture<CuentaBancariaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaBancariaCreateComponent]
    });
    fixture = TestBed.createComponent(CuentaBancariaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
