import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentasBancariasGenericComponent } from './tipo-cuentas-bancarias-generic.component';

describe('TipoCuentasBancariasGenericComponent', () => {
  let component: TipoCuentasBancariasGenericComponent;
  let fixture: ComponentFixture<TipoCuentasBancariasGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCuentasBancariasGenericComponent]
    });
    fixture = TestBed.createComponent(TipoCuentasBancariasGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
